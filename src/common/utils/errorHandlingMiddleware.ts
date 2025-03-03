import { isFulfilled, isRejectedWithValue, Middleware, type MiddlewareAPI } from "@reduxjs/toolkit"
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { ResultCode } from "common/enums"
import { setAppError } from "../../app/appSlice"

const isErrorWithMessage = (error: unknown): error is { message: string } => {
  return typeof error === "object" && error != null && "message" in error && typeof (error as any).message === "string"
}

export const rtkQueryErrorLogger: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  let error = "Some error occurred"

  if (isRejectedWithValue(action)) {
    const payload = action.payload as FetchBaseQueryError
    if ("status" in payload) {
      switch (payload.status) {
        case "FETCH_ERROR":
        case "PARSING_ERROR":
        case "CUSTOM_ERROR":
          error = (payload as { error: string }).error
          break
        case 403:
          error = "403 Forbidden Error. Check API-KEY"
          break
        case 400:
        case 500:
          if (isErrorWithMessage(payload.data)) {
            error = payload.data.message
          } else {
            error = JSON.stringify(payload.data)
          }
          break
        default:
          error = JSON.stringify(payload)
          break
      }
      api.dispatch(setAppError({ error }))
    }
  }
  if (isFulfilled(action)) {
    const data = action.payload as any
    if ((data as { resultCode: ResultCode }).resultCode === ResultCode.Error) {
      const messages = (data as { messages?: string[] }).messages
      error = messages?.length ? messages[0] : error
      api.dispatch(setAppError({ error }))
    }
  }
  return next(action)
}
