import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { MessageResponse } from 'src/admin/message.type';
import { tokenRequestType } from 'src/middleware/tokenRequestType';
import { createUserDto } from 'src/user/dto/createuser.dto';
import { recoveryPasswordDto } from 'src/user/dto/recoveryPassword.dto';
import { User } from 'src/user/schema/user.schema';
import { Verify } from 'src/verify/verify_code.schema';
import { userSignInResponse, userSignUpResponse, userTokenResponse, verifyTokenResponse } from './auth.types';


@Injectable()
export class AuthService {
  constructor(private mailerService: MailerService,
    @InjectModel('verify') private readonly verifyModel: Model<Verify>,
    @InjectModel('user') private readonly userModel: Model<User>,
    @Inject(REQUEST) private readonly req: tokenRequestType
  ) { }


  async signUp(CreateUserDto: createUserDto): Promise<userSignUpResponse> {
    if (CreateUserDto.password !== CreateUserDto.repeat_password) {
      throw new HttpException('Passwords are different', HttpStatus.UNAUTHORIZED)
    } else {
      const hashPass = await hash(CreateUserDto.password, 10)
      await this.userModel.create({ ...CreateUserDto, password: hashPass })
      return { message: "New user created" }
    }
  }

  async signIn(userSignin: userSignInResponse): Promise<userTokenResponse> {

    const user = await this.userModel.findOne({ email: userSignin.email })
    if (!user) {
      throw new NotFoundException()
    }
    const passRight = await compare(userSignin.password, user.password)
    if (!passRight) {
      throw new UnauthorizedException()
    }
    const token = sign({_id: user._id, email: user.email, role: user.role }, "jwt_olympos_2023", { expiresIn: '1h' })
    return { token, message: "You are successfully logged in", role: user.role, profile_photo: user.profile_photo }
  }


  async forgetPass(email: string): Promise<MessageResponse> {

    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }
    const verify_code = Math.floor(Math.random() * 1000000)
    this.verifyModel.create({ verify_code, userEmail: user.email })
    this.mailerService.sendMail({
      from: "quliyevnamiq8@gmail.com",
      to: `${email}`,
      subject: " Verify code",
      html: `Verify code : ${verify_code}`
    })
    return { message: 'A verification code has been sent to your email', statusCode: 200 }
  }


  async verifyCode(verify_code: number): Promise<verifyTokenResponse> {
    const check_confirmation = await this.verifyModel.findOne({ verify_code })
    if (!check_confirmation) {
      throw new HttpException('Verification code is incorrect', HttpStatus.UNAUTHORIZED)
    }
    const token = sign({ email: check_confirmation.userEmail }, 'jwt_olympos_2023', { expiresIn: "5m" })
    return { token, message: "Verification code is correct" }
  }

  // token :string goturmur ---?
  async recoveryPassword(token: string, RecoveryPasswordDto: recoveryPasswordDto) {

    if (!this.req.params.token) {
      throw new HttpException("Token is invalid", HttpStatus.NOT_FOUND)
    }
    verify(this.req.params.token, 'jwt_olympos_2023', async (err, forget: User): Promise<User> => {
      if (err) {
        throw new HttpException('Token is wrong', HttpStatus.UNAUTHORIZED)
      }
      if (RecoveryPasswordDto.password !== RecoveryPasswordDto.repeat_password) {
        throw new HttpException('Passwords are different', HttpStatus.UNAUTHORIZED)
      } else {
        const hashPass = await hash(RecoveryPasswordDto.password, 10)
        const updatePass = await this.userModel.findOneAndUpdate({ email: forget.email }, { $set: { password: hashPass } }, { new: true })
        return updatePass
      }
    })
  }
}


