import { ResultCode } from "common/enums"

export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<D = {}> = {
  resultCode: ResultCode
  messages: string[]
  fieldsErrors: FieldError[]
  data: D
}
