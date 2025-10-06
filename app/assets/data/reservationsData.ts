type ReservationStatus = 'planned' | 'ended' | 'cancelled' | 'toApprove'

interface Reservation {
  id: number
  title: string
  startedAt: string
  endedAt: string
  status: ReservationStatus
  roomId: number
  participants: number
}

export const reservationsData: Reservation[] = [
  {
    id: 1,
    title: 'Spotkanie zespołu',
    startedAt: '2025-10-01T09:00:00',
    endedAt: '2025-10-01T10:00:00',
    status: 'planned',
    roomId: 1,
    participants: 21,
  },
  {
    id: 2,
    title: 'Warsztaty IT',
    startedAt: '2025-10-01T11:00:00',
    endedAt: '2025-10-01T13:00:00',
    status: 'planned',
    roomId: 2,
    participants: 15,
  },
  {
    id: 3,
    title: 'Szkolenie BHP',
    startedAt: '2025-10-02T09:00:00',
    endedAt: '2025-10-02T11:00:00',
    status: 'ended',
    roomId: 3,
    participants: 20,
  },
  {
    id: 4,
    title: 'Konferencja biznesowa',
    startedAt: '2025-10-02T12:00:00',
    endedAt: '2025-10-02T15:00:00',
    status: 'planned',
    roomId: 4,
    participants: 10,
  },
  {
    id: 5,
    title: 'Prezentacja produktu',
    startedAt: '2025-10-03T10:00:00',
    endedAt: '2025-10-03T12:00:00',
    status: 'cancelled',
    roomId: 5,
    participants: 30,
  },
  {
    id: 6,
    title: 'Warsztaty marketingowe',
    startedAt: '2025-10-03T13:00:00',
    endedAt: '2025-10-03T15:00:00',
    status: 'planned',
    roomId: 6,
    participants: 20,
  },
  {
    id: 7,
    title: 'Spotkanie HR',
    startedAt: '2025-10-04T09:00:00',
    endedAt: '2025-10-04T10:30:00',
    status: 'ended',
    roomId: 7,
    participants: 21,
  },
  {
    id: 8,
    title: 'Analiza danych',
    startedAt: '2025-10-04T11:00:00',
    endedAt: '2025-10-04T13:00:00',
    status: 'toApprove',
    roomId: 8,
    participants: 5,
  },
  {
    id: 9,
    title: 'Spotkanie sprzedażowe',
    startedAt: '2025-10-05T09:00:00',
    endedAt: '2025-10-05T11:00:00',
    status: 'toApprove',
    roomId: 9,
    participants: 20,
  },
  {
    id: 10,
    title: 'Konsultacje klienta',
    startedAt: '2025-10-05T13:00:00',
    endedAt: '2025-10-05T14:00:00',
    status: 'cancelled',
    roomId: 10,
    participants: 17,
  },
  {
    id: 11,
    title: 'Warsztaty UX',
    startedAt: '2025-10-06T09:00:00',
    endedAt: '2025-10-06T12:00:00',
    status: 'planned',
    roomId: 11,
    participants: 18,
  },
  {
    id: 12,
    title: 'Planowanie sprintu',
    startedAt: '2025-10-06T13:00:00',
    endedAt: '2025-10-06T15:00:00',
    status: 'ended',
    roomId: 12,
    participants: 22,
  },
  {
    id: 13,
    title: 'Strategia marketingowa',
    startedAt: '2025-10-07T10:00:00',
    endedAt: '2025-10-07T12:00:00',
    status: 'planned',
    roomId: 13,
    participants: 5,
  },
  {
    id: 14,
    title: 'Przegląd projektów',
    startedAt: '2025-10-07T13:00:00',
    endedAt: '2025-10-07T15:00:00',
    status: 'planned',
    roomId: 14,
    participants: 13,
  },
  {
    id: 15,
    title: 'Warsztaty końcowe',
    startedAt: '2025-10-08T09:00:00',
    endedAt: '2025-10-08T12:00:00',
    status: 'planned',
    roomId: 15,
    participants: 20,
  },
]
