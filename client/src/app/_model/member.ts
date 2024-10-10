import { Photo } from "./photo"

export interface Member {
    id: number
    username: string
    age: number
    photoUrl: string
    knownAs: string
    creted: Date
    lastActive: Date
    gender: string
    introducation: any
    interests: string
    lookingFor: string
    city: string
    country: string
    photos: Photo[]
  }