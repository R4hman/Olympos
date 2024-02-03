import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post, UploadedFile, UseInterceptors, UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { MessageResponse } from 'src/admin/message.type';
import { CreateOrderDto } from 'src/order/order.dto';
import { Order } from 'src/order/order.schema';
import { createReviewDto, deleteReviewDto, updateReviewDto } from 'src/review/review.dto';
import { createWhishListDto } from 'src/whishlist/createWhishList.dto';
import { Whishlist } from 'src/whishlist/whishlist.schema';
import { updateUserDto } from './dto/updateuser.dto';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from 'src/cloudinary/multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(): Promise<User> {
    return await this.userService.getProfile();
  }

  @Patch('/profile/update')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('profile_photo', MulterOptions))
  async updateProfile(@Body() UpdateUserDto: updateUserDto, @UploadedFile() file: Express.Multer.File): Promise<MessageResponse> {
    return this.userService.updateProfile(UpdateUserDto, file);
  }

  @Post('/create-whishlist')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async addWhishList(
    @Body() CreateWhishListDto: createWhishListDto,
  ): Promise<Whishlist> {
    return await this.userService.addWhishList(CreateWhishListDto);
  }

  @Delete('/delete-whishlist/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteWhishlist(@Param('_id') _id: string) {
    return await this.userService.deleteWhishlist(_id)
  }

  @Get('/profile/whishlist')
  @HttpCode(HttpStatus.OK)
  async getAllWhishList(): Promise<Whishlist[]> {
    return this.userService.getAllWhishList();
  }

  @Post('/create-review')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createReview(@Body() CreateReviewDto: createReviewDto) {
    return this.userService.createReview(CreateReviewDto);
  }

  @Patch('/update-review')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateReview(@Body() UpdateReviewDto: updateReviewDto) {
    return await this.userService.updateReview(UpdateReviewDto);
  }

  @Delete('/delete-review/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteReview(@Param('_id') _id: string, @Body() DeleteReviewDto: deleteReviewDto) {
    return await this.userService.deleteReview(_id, DeleteReviewDto);
  }

  @Post('/hotel/create-reserv')
  @HttpCode(HttpStatus.OK)
  async createReservHotel(@Body() createOrderDto: CreateOrderDto) {
    return await this.userService.createReservationHotel(createOrderDto)
  }

  @Delete('/profile/myorders/delete-reserv/:_id')
  @HttpCode(HttpStatus.OK)
  async deleteReserv(@Param('_id') _id: string) {
    return await this.userService.deleteReservation(_id)
  }

  @Post('/tour/create-reserv')
  @HttpCode(HttpStatus.OK)
  async createReservTour(@Body() createOrderDto: CreateOrderDto) {
    return await this.userService.createReservationTour(createOrderDto)
  }

  @Get('/profile/myorders')
  @HttpCode(HttpStatus.OK)
  async getAllReservation(): Promise<Order[]> {
    return this.userService.getAllReservation()
  }

}



