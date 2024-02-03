import { Body, Controller, HttpCode, HttpStatus, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { createUserDto } from 'src/user/dto/createuser.dto';
import { recoveryPasswordDto } from 'src/user/dto/recoveryPassword.dto';
import { AuthService } from './auth.service';
import { forgetPassResponse, userSignInResponse, verifyCodeResponse } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) { }

  @Post('/sign-up')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async signUp(@Body() CreateUserDto: createUserDto) {
    return this.AuthService.signUp(CreateUserDto)
  }

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async signIn(@Body() userSignin: userSignInResponse) {
    return this.AuthService.signIn(userSignin)
  }

  @Post('/forgetPass')
  @HttpCode(HttpStatus.OK)
  async forgetPass(@Body() forget: forgetPassResponse) {
    return this.AuthService.forgetPass(forget.email)
  }

  @Post('/verify_code')
  async verifyCode(@Body() verifyCodeResponse: verifyCodeResponse) {
    return this.AuthService.verifyCode(verifyCodeResponse.verify_code)
  }

  @Patch('/recovery/:token')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async recoveryPass(@Param('token') token: string, @Body() RecoveryPasswordDto: recoveryPasswordDto) {
    return this.AuthService.recoveryPassword(token, RecoveryPasswordDto)
  }

}
