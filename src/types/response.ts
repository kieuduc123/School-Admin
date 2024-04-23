import moment from 'moment'

export interface IResponse<T> {
  data: T
  message: string
  status: number
  total?: number
  meta?: {
    nextToken: string
  }
}

export interface StudentData {
  reduce: any
  id: string
  firstName: string
  lastName: string
  address: string
  birthday: Date
  gender: string
  status: string
  studentCode: string
}
export interface StudentFormValues {
  gender: boolean
  firstName: string
  lastName: string
  birthday: moment.Moment
  address: string
  status: number
  studentCode: string
}
