import { AxiosResponse } from 'axios'

type IError = AxiosResponse<{
  statusCode: number
  message: string
  error: string
}>

const ERROR_PLACEHOLDER = 'something_went_wrong'

export class ResponseError<Error extends string> {
  public response: IError
  public message: Error

  constructor(response, message) {
    this.response = response
    this.message = message || ERROR_PLACEHOLDER
  }
}
