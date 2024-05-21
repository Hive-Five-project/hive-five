export interface UserForAdmin {
  uid: string
  email: string
  firstname: string
  lastname: string
  isAdmin: boolean
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}
