import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { hotelModel } from 'src/hotel/hotel.schema';
import { tourModel } from 'src/tour/tour.schema';
import { tourCategoryModel } from 'src/tourCategory/tourcategory.schema';
import { GuestController } from './guest.controller';
import { GuestService } from './guest.service';
import { hotelSpecificModel } from 'src/hotel-specifics/hotelspecific.schema';
import { subscribeModel } from 'src/subscribe/model/subscribe.schema';
import { reviewModel } from 'src/review/review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      
      { name: 'hotel', schema: hotelModel },
      { name: 'tour', schema: tourModel },
      { name: 'tourcategory', schema: tourCategoryModel },
      { name: 'hotelspecific', schema: hotelSpecificModel },
      { name: 'subscribe', schema: subscribeModel },
      { name: 'review', schema: reviewModel }

    ]),
  ],
  controllers: [GuestController],
  providers: [GuestService],
})
export class GuestModule { }
