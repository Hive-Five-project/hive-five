import { Apiary } from "./Apiary"

export interface Beehive {
  uid: string
  name: string
  bee: string //TODO: Change to Bee type when it exists
  age: number
  apiary: Apiary
  frames: number //TODO: Change to Frame type when it exists
  createdAt: string
  updatedAt: string
}
