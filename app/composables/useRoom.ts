import type { IRoomCard, IRoomDetails, IRoomCreateRequest, IRoomUpdateRequest } from '~/interfaces/RoomsIntefaces'
import { RoomService } from '~/services/RoomService'
import { useAuth } from '~/composables/useAuth'

export const useRoom = () => {
  const { token } = useAuth()

  const rooms = useState<IRoomCard[]>('rooms', () => [])
  const room = useState<IRoomDetails | null>('room', () => null)
  const loading = useState<boolean>('rooms-loading', () => false)
  const error = useState<string | null>('rooms-error', () => null)

  // Create a getter function to ensure we always have the latest token
  const getRoomService = () => new RoomService(token.value)

  const fetchRooms = async (withBookings: boolean = false, status?: 'available' | 'occupied' | 'maintenance') => {
    loading.value = true
    error.value = null
    try {
      rooms.value = await getRoomService().getRooms(withBookings, status)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu sal'
    }
    finally {
      loading.value = false
    }
  }

  const fetchRoom = async (roomId: string, withBookings: boolean = false) => {
    loading.value = true
    error.value = null
    try {
      room.value = await getRoomService().getRoom(roomId, withBookings)
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy pobieraniu szczegółów sali'
    }
    finally {
      loading.value = false
    }
  }

  const createRoom = async (newRoom: IRoomCreateRequest) => {
    loading.value = true
    error.value = null
    try {
      const createdRoom = await getRoomService().createRoom(newRoom)
      rooms.value.push(createdRoom as IRoomCard)
      return createdRoom
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy tworzeniu sali'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const updateRoom = async (roomId: string, updatedRoom: IRoomUpdateRequest) => {
    loading.value = true
    error.value = null
    try {
      const result = await getRoomService().updateRoom(roomId, updatedRoom)
      const index = rooms.value.findIndex(r => r.roomId === roomId)
      if (index !== -1) {
        rooms.value[index] = result as IRoomCard
      }
      if (room.value && room.value.roomId === roomId) {
        room.value = result
      }
      return result
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy aktualizacji sali'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const deleteRoom = async (roomId: string) => {
    loading.value = true
    error.value = null
    try {
      await getRoomService().deleteRoom(roomId)
      rooms.value = rooms.value.filter(r => r.roomId !== roomId)
      if (room.value && room.value.roomId === roomId) {
        room.value = null
      }
    }
    catch (err) {
      error.value = err instanceof Error ? err.message : 'Błąd przy usuwaniu sali'
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  return {
    // State
    rooms,
    room,
    loading,
    error,

    // Methods
    fetchRooms,
    fetchRoom,
    createRoom,
    updateRoom,
    deleteRoom,
    clearError,
  }
}
