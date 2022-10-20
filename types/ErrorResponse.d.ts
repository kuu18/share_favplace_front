import HttpStatusCode from './httpStatus'
export interface ErrorResponse {
  message: string
  messages: Array<string>
  httpStatus: HttpStatusCode
  timestamp: Date
}
