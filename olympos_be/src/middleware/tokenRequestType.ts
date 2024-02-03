import { Request } from 'express'
import { User } from 'src/user/schema/user.schema'

export interface tokenRequestType extends Request {
  user: User
}