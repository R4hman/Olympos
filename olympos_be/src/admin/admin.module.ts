import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { userModel } from 'src/user/schema/user.schema';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { hotelModel } from 'src/hotel/hotel.schema';
import { tourModel } from 'src/tour/tour.schema';
import { orderModel } from 'src/order/order.schema';
import { tourCategoryModel } from 'src/tourCategory/tourcategory.schema';
import { hotelSpecificModel } from 'src/hotel-specifics/hotelspecific.schema';
import { subscribeModel } from 'src/subscribe/model/subscribe.schema';
import { whishListModel } from 'src/whishlist/whishlist.schema';
import { reviewModel } from 'src/review/review.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: userModel }, { name: "hotel", schema: hotelModel },
  { name: "tour", schema: tourModel }, { name: "order", schema: orderModel }, { name: "user", schema: userModel },
  { name: "tourcategory", schema: tourCategoryModel }, { name: "hotelspecific", schema: hotelSpecificModel }, { name: "subscribe", schema: subscribeModel },
  { name: "whishlist", schema: whishListModel }, { name: "review", schema: reviewModel }])],
  providers: [AdminService],
  controllers: [AdminController]
})
export class AdminModule { }
