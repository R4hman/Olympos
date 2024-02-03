import { HttpException, HttpStatus, NestMiddleware } from '@nestjs/common'
import { NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { User } from 'src/user/schema/user.schema'
import { tokenRequestType } from './tokenRequestType'

export class tokenCheckMiddleware implements NestMiddleware {
  use(req: tokenRequestType, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new HttpException('No authorization Token', HttpStatus.NOT_FOUND)
    }
    verify(token, 'jwt_olympos_2023', (err, user: User) => {
      if (err) {
        throw new HttpException('Invalid Authorization Token', HttpStatus.FORBIDDEN)
      } else if (user.role !== "user") {
        throw new HttpException("You are not a user", HttpStatus.FORBIDDEN)
      } else {
        req.user = user
        next()
      }
    })
  }
}

// admin Middleware
export class tokenCheckAdminMiddleware implements NestMiddleware {
  use(req: tokenRequestType, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      throw new HttpException('No authorization Token', HttpStatus.NOT_FOUND)
    }
    verify(token, 'jwt_olympos_2023', (err, user: User) => {
      if (err) {
        throw new HttpException('Invalid Authorization Token', HttpStatus.FORBIDDEN)
      } else if (user.role !== "admin") {
        throw new HttpException("You are not a admin", HttpStatus.FORBIDDEN)
      } else {
        req.user = user
        next()
      }
    })
  }
}
