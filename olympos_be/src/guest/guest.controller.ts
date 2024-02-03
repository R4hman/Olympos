import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Hotel } from 'src/hotel/hotel.schema';
import { Review } from 'src/review/review.schema';
import { CreateSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { GuestService } from './guest.service';
import { FilterDto, TourFilterDto } from './query.type';
import { HotelSpecific } from 'src/hotel-specifics/hotelspecific.schema';

@Controller()
export class GuestController {
  constructor(private readonly guestService: GuestService) {}

  @Get('/hotels')
  @HttpCode(HttpStatus.OK)
  async getAllHotels(): Promise<Hotel[]> {
    return await this.guestService.getAllHotels();
  }

  @Get('/hotels/single/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleHotel(@Param('_id') _id: string): Promise<Hotel> {
    return await this.guestService.getSingleHotel(_id);
  }

  @Get('/hotels/filter')
  @HttpCode(HttpStatus.OK)
  async getFilter(@Query() filterDto: FilterDto) {
    return await this.guestService.getFilter(filterDto);
  }

  @Get('/tours/filter')
  @HttpCode(HttpStatus.OK)
  async getTourFilter(@Query() tourFilterDto: TourFilterDto) {
    return await this.guestService.getTourFilter(tourFilterDto);
  }

  @Get('/tour')
  @HttpCode(HttpStatus.OK)
  async getAllTours() {
    return this.guestService.getAllTours();
  }

  @Get('/tour/:id')
  @HttpCode(HttpStatus.OK)
  async getSingleTour(@Param('id') id: string) {
    return this.guestService.getSingleTour(id);
  }

  @Get('/tourcategory')
  @HttpCode(HttpStatus.OK)
  async getAllTourCategory() {
    return await this.guestService.getAllTourCategory();
  }

  @Get('/tourcategory/:_id')
  @HttpCode(HttpStatus.OK)
  async getSingleTourCategory(@Param('_id') _id: string) {
    return await this.guestService.getSingleTourCategory(_id);
  }

  @Post('/create-subscribe')
  @HttpCode(HttpStatus.CREATED)
  async createSubscribe(
    @Body() createSubscribeDto: CreateSubscribeDto,
  ): Promise<Subscribe> {
    return await this.guestService.createSubscribe(createSubscribeDto);
  }

  @Get('/reviews')
  @HttpCode(HttpStatus.OK)
  async latestReviews(): Promise<Review[]> {
    return await this.guestService.latestReviews();
  }

  @Get('/specifics')
  @HttpCode(HttpStatus.OK)
  async getAllHotelSpecific(): Promise<HotelSpecific[]> {
    return await this.guestService.getAllHotelSpecific();
  }
}
