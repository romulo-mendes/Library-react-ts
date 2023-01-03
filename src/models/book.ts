type Status = {
    isActive: boolean
    description: string
}

export type rentHistory = {
    studentName: string
    class: string
    withdrawalDate: Date
    deliveryDate: Date
}

export type Book = {
    id: string
    tittle: string
    author: string
    genre: string
    status: Status
    image: string
    systemEntryDate: Date
    synopsis: string
    rentHistory: rentHistory[]
}
