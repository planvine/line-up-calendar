// API
export type MetaData = {
  page?: number
  pageNumber?: number
  perPage?: number
  totalPages?: number
}

export type APIErrorMessage = string

export interface APIError {
  _meta: {
    code: number
    message: APIErrorMessage
  }
}

export type APIResponse<Response = any> = {
  _meta: MetaData
  data: Response
}

// Entities
export interface Venue {
  id: number
  name: string
  lat: number
  lng: number
}
export interface Performance {
  id: number
  startDate: string
  startTime: string
}
export interface Image {
  url: string
  id: number
}
export interface Event {
  id: number
  title: string
  image: Image
  venue: Venue
  nextPerformance?: Performance
  description?: string
}
