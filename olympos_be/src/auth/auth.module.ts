import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { hotelModel } from 'src/hotel/hotel.schema';
import { orderModel } from 'src/order/order.schema';
import { reviewModel } from 'src/review/review.schema';
import { tourModel } from 'src/tour/tour.schema';
import { userModel } from 'src/user/schema/user.schema';
import { UserController } from 'src/user/user.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { VerifyModel } from 'src/verify/verify_code.schema';
import { whishListModel } from 'src/whishlist/whishlist.schema';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { tourCategoryModel } from 'src/tourCategory/tourcategory.schema';
import { hotelSpecificModel } from 'src/hotel-specifics/hotelspecific.schema';
import { subscribeModel } from 'src/subscribe/model/subscribe.schema';

@Module({
  imports: [UserModule, MongooseModule.forFeature([{ name: 'user', schema: userModel },
  { name: "verify", schema: VerifyModel }, { name: "whishlist", schema: whishListModel },
  { name: "review", schema: reviewModel }, { name: 'hotel', schema: hotelModel }, { name: "order", schema: orderModel },
  { name: "tour", schema: tourModel }, { name: "order", schema: orderModel}, { name: "tourcategory", schema: tourCategoryModel },{ name: "hotelspecific", schema: hotelSpecificModel },{ name: "subscribe", schema: subscribeModel }])],
  controllers: [AuthController, UserController],
  providers: [AuthService, UserService]
})
export class AuthModule { }
