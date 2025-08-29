export interface Attendance {
    id? : number
    userId: string
    date: Date
    checkIn: Date
    checkOut: Date
    status: string
    note: string
    
  }