import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { whishListModel } from 'src/whishlist/whishlist.schema';
import { userModel } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { hotelModel } from 'src/hotel/hotel.schema';
import { tourModel } from 'src/tour/tour.schema';
import { reviewModel } from 'src/review/review.schema';
import { orderModel } from 'src/order/order.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'user', schema: userModel },
  { name: "whishlist", schema: whishListModel }, { name: "hotel", schema: hotelModel },
  { name: "tour", schema: tourModel }, { name: 'review', schema: reviewModel }, { name: 'hotel', schema: hotelModel },
  { name: "order", schema: orderModel }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
