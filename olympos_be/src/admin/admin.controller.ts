import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from 'src/cloudinary/multer';
import { createHotelSpecificDto } from 'src/hotel-specifics/hotelspecific.dto';
import { HotelSpecific } from 'src/hotel-specifics/hotelspecific.schema';
import { createHotelDto } from 'src/hotel/createhotel.dto';
import { Hotel } from 'src/hotel/hotel.schema';
import { updateHotelDto } from 'src/hotel/updatehotel.dto';
import { UpdateOrderDto } from 'src/order/order.dto';
import { Order } from 'src/order/order.schema';
import { Review } from 'src/review/review.schema';
import { createTourDto } from 'src/tour/createtour.dto';
import { Tour } from 'src/tour/tour.schema';
import { updateTourDto } from 'src/tour/updatetour.dto';
import { createTourCategoryDto } from 'src/tourCategory/createtourcategory.dto';
import { updateTourCategoryDto } from 'src/tourCategory/updatetourcategory.dto';
import { User } from 'src/user/schema/user.schema';
import { AdminService } from './admin.service';
import { MessageResponse } from './message.type';
import { notificationSubscribesDto } from './subscribe_notification';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/hotel/create')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptions))
  async createHotel(
    @Body() CreateHotelDto: createHotelDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Hotel> {
    return await this.adminService.createHotel(CreateHotelDto, files);
  }

  @Delete('/hotel/delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteHotel(@Param('id') id: string) {
    return await this.adminService.deleteHotel(id);
  }

  @Patch('/hotel/update/:id')
  @UsePipes(new ValidationPipe())
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FilesInterceptor('photos', 10, MulterOptions))
  async updateHotel(
    @Param('id') id: string,
    @Body() UpdateHotelDto: updateHotelDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return await this.adminService.updateHotel(id, UpdateHotelDto, files);
  }

  @Get('/hotel')
  @HttpCode(HttpStatus.OK)
  async getAllHotels(): Promise<Hotel[]> {
    return await this.adminService.getAllHotels();
  }

  @Get('/hotel/single/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleHotel(@Param('_id') _id: string): Promise<Hotel> {
    return await this.adminService.getSingleHotel(_id);
  }

  @Post('/tour/create')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptions))
  async createTour(
    @Body() CreateTourDto: createTourDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Tour> {
    return await this.adminService.createTour(CreateTourDto, file);
  }

  @Patch('/tour/update/:id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @UseInterceptors(FileInterceptor('photo', MulterOptions))
  async updateTour(
    @Param('id') id: string,
    @Body() UpdateTourDto: updateTourDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.adminService.updateTour(id, UpdateTourDto, file);
  }

  @Delete('/tour/delete/:id')
  @HttpCode(HttpStatus.OK)
  async deleteTour(@Param('id') id: string) {
    return this.adminService.deleteTour(id);
  }

  @Get('/tour')
  @HttpCode(HttpStatus.OK)
  async getAllTours() {
    return this.adminService.getAllTours();
  }

  @Get('/tour/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleTour(@Param('id') id: string) {
    return this.adminService.getSingleTour(id);
  }

  @Get('/orders')
  @HttpCode(HttpStatus.OK)
  async getAllorders(): Promise<Order[]> {
    return this.adminService.getAllOrders();
  }

  @Post('/orders/confirmation')
  @HttpCode(HttpStatus.CREATED)
  async orderConfirmation(@Body() _id: string): Promise<MessageResponse> {
    return await this.adminService.orderConfirmation(_id);
  }

  @Patch('/orders/confirmation/:_id')
  @HttpCode(HttpStatus.OK)
  async updateOrderConfirmation(
    @Param('_id') _id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<MessageResponse> {
    return this.adminService.updateOrderConfirmation(
      _id,
      updateOrderDto.confirmed_person_count,
    );
  }

  @Delete('/orders/confirmation/:_id')
  @HttpCode(HttpStatus.OK)
  async orderCancellation(@Param('_id') _id: string) {
    return this.adminService.orderCancellation(_id);
  }

  @Post('/tourcategory/create')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createTourCategory(
    @Body() CreateTourCategoryDto: createTourCategoryDto,
  ) {
    return this.adminService.createTourCategory(CreateTourCategoryDto);
  }

  @Patch('/tourcategory/update/:_id')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async updateTourCategory(
    @Param('_id') _id: string,
    @Body() UpdateTourCategoryDto: updateTourCategoryDto,
  ) {
    return this.adminService.updateTourCategory(_id, UpdateTourCategoryDto);
  }

  @Get('/tourcategory')
  @HttpCode(HttpStatus.OK)
  async getAllTourCategory() {
    return await this.adminService.getAllTourCategory();
  }

  @Get('/tourcategory/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleTourCategory(@Param('_id') _id: string) {
    return await this.adminService.getSingleTourCategory(_id);
  }

  @Post('/hotel-specifics')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  async createHotelSpecific(
    @Body() CreateHotelSpecificDto: createHotelSpecificDto,
  ): Promise<HotelSpecific> {
    return await this.adminService.createHotelSpecific(CreateHotelSpecificDto);
  }

  @Get('/hotel-specifics')
  @HttpCode(HttpStatus.OK)
  async getAllHotelSpecific(): Promise<HotelSpecific[]> {
    return await this.adminService.getAllHotelSpecific();
  }

  @Get('/users')
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<User[]> {
    return await this.adminService.getAllUsers();
  }

  @Post('/notification-email')
  @HttpCode(HttpStatus.CREATED)
 
  async notificationEmails(@Body() NotificationSubscribesDto: notificationSubscribesDto) {
    return await this.adminService.notificationEmails(NotificationSubscribesDto)

  }

  @Delete('/users/:_id')
  @HttpCode(HttpStatus.OK)
  async userDelete(@Param('_id') _id: string): Promise<MessageResponse> {
    return await this.adminService.userDelete(_id);
  }

  @Delete('/reviews/:_id')
  @HttpCode(HttpStatus.OK)
  async userReviewDelete(@Param('_id') _id: string): Promise<MessageResponse> {
    return await this.adminService.userReviewDelete(_id);
  }

  @Get('/reviews')
  @HttpCode(HttpStatus.OK)
  async getAllReview(): Promise<Review[]> {
    return await this.adminService.getAllReview();
  }
}
