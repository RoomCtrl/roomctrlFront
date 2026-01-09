import type { IRoomCard, IRoomDetails, IRoomCreateRequest } from '~/interfaces/RoomsIntefaces'
import { RoomService } from '~/services/RoomService'
import { useAuth } from '~/composables/useAuth'

export const useRoom = () => {
  const { token } = useAuth()

  const rooms = useState<IRoomCard[]>('rooms', () => [])
  const room = useState<IRoomDetails | null>('room', () => null)
  const loading = useState<boolean>('rooms-loading', () => false)
  const error = useState<string | null>('rooms-error', () => null)
  const favoriteRoomIds = useState<Set<string>>('favorite-room-ids', () => new Set())

  const getRoomService = () => new RoomService(token.value)

  const formatError = (err: any): string => {
    const errorData = err.data

    if (errorData.violations && Array.isArray(errorData.violations)) {
      return errorData.violations.map((v: any) => `${v.field}: ${v.message}`).join(', ')
    }

    if (errorData.message) {
      return errorData.message
    }

    return err.message || 'An unknown error occurred.'
  }

  const fetchRooms = async (withBookings: boolean = false, status?: 'available' | 'out_of_use') => {
    loading.value = true
    error.value = null
    try {
      const fetchedRooms = await getRoomService().getRooms(withBookings, status)
      rooms.value = fetchedRooms.map(r => ({
        ...r,
        isFavorite: favoriteRoomIds.value.has(r.roomId),
      }))
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const fetchRoom = async (roomId: string) => {
    loading.value = true
    error.value = null
    try {
      const fetchedRoom = await getRoomService().getRoom(roomId)
      room.value = {
        ...fetchedRoom,
        isFavorite: favoriteRoomIds.value.has(fetchedRoom.roomId),
      }
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const createRoom = async (newRoom: IRoomCreateRequest) => {
    loading.value = true
    error.value = null
    try {
      await getRoomService().createRoom(newRoom)
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      await fetchRooms()
      loading.value = false
    }
  }

  const updateRoom = async (roomId: string, updatedRoom: IRoomUpdateRequest) => {
    loading.value = true
    error.value = null
    try {
      await getRoomService().updateRoom(roomId, updatedRoom)
      await fetchRooms()
    }
    catch (err) {
      error.value = formatError(err)
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
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const fetchFavoriteRooms = async (withBookings: boolean = false) => {
    loading.value = true
    error.value = null
    try {
      const favoriteRooms = await getRoomService().getFavoriteRooms(withBookings)
      favoriteRoomIds.value = new Set(favoriteRooms.map(r => r.roomId))
      rooms.value = favoriteRooms.map(r => ({ ...r, isFavorite: true }))
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const toggleFavorite = async (roomId: string) => {
    loading.value = true
    error.value = null
    try {
      await getRoomService().toggleFavorite(roomId)

      const newFavoriteIds = new Set(favoriteRoomIds.value)
      if (newFavoriteIds.has(roomId)) {
        newFavoriteIds.delete(roomId)
      }
      else {
        newFavoriteIds.add(roomId)
      }
      favoriteRoomIds.value = newFavoriteIds

      if (room.value && room.value.roomId === roomId) {
        room.value.isFavorite = !room.value.isFavorite
      }

      const roomIndex = rooms.value.findIndex(r => r.roomId === roomId)
      if (roomIndex !== -1) {
        rooms.value[roomIndex].isFavorite = !rooms.value[roomIndex].isFavorite
      }
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }

  const loadFavoriteIds = async () => {
    try {
      const favoriteRooms = await getRoomService().getFavoriteRooms(false)
      favoriteRoomIds.value = new Set(favoriteRooms.map(r => r.roomId))
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
  }

  const uploadImage = async (roomId: string, image: File) => {
    loading.value = true
    error.value = null
    try {
      const result = await getRoomService().uploadImage(roomId, image)
      return result
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const getRoomImagesURL = async (roomId: string) => {
    return await getRoomService().getRoomImagesURL(roomId)
  }

  const getRoomImage = async (roomId: string, imageIndex: number) => {
    return await getRoomService().getRoomImage(roomId, imageIndex)
  }

  const deleteRoomImages = async (roomId: string) => {
    loading.value = true
    error.value = null
    try {
      await getRoomService().deleteRoomImages(roomId)
      rooms.value = rooms.value.filter(r => r.roomId !== roomId)
      if (room.value && room.value.roomId === roomId) {
        room.value = null
      }
    }
    catch (err) {
      error.value = formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  const deleteSingleRoomImage = async (roomId: string, imageIndex: number) => {
    loading.value = true
    error.value = null
    try {
      await getRoomService().deleteSingleRoomImage(roomId, imageIndex)
      rooms.value = rooms.value.filter(r => r.roomId !== roomId)
      if (room.value && room.value.roomId === roomId) {
        room.value = null
      }
    }
    catch (err) {
      formatError(err)
      throw err
    }
    finally {
      loading.value = false
    }
  }

  return {
    rooms,
    room,
    loading,
    error,

    fetchRooms,
    fetchRoom,
    fetchFavoriteRooms,
    toggleFavorite,
    createRoom,
    updateRoom,
    deleteRoom,
    deleteRoomImages,
    deleteSingleRoomImage,
    clearError,
    loadFavoriteIds,
    uploadImage,
    getRoomImagesURL,
    getRoomImage,
  }
}
