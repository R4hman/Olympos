import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { compare, hash } from 'bcrypt';
import mongoose, { Model } from 'mongoose';
import { MessageResponse } from 'src/admin/message.type';
import { Hotel } from 'src/hotel/hotel.schema';
import { tokenRequestType } from 'src/middleware/tokenRequestType';
import { CreateOrderDto } from 'src/order/order.dto';
import { Order } from 'src/order/order.schema';
import {
  createReviewDto,
  deleteReviewDto,
  updateReviewDto,
} from 'src/review/review.dto';
import { Review } from 'src/review/review.schema';
import { Tour } from 'src/tour/tour.schema';
import { createWhishListDto } from 'src/whishlist/createWhishList.dto';
import { Whishlist } from 'src/whishlist/whishlist.schema';
import { updateUserDto } from './dto/updateuser.dto';
import { User } from './schema/user.schema';
import cloudinary from 'src/cloudinary/cloudinary';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel: Model<User>,
    @InjectModel('whishlist') private whishListModel: Model<Whishlist>,
    @InjectModel('review') private reviewModel: Model<Review>,
    @InjectModel('hotel') private hotelModel: Model<Hotel>,
    @InjectModel('order') private orderModel: Model<Order>,
    @InjectModel('tour') private tourModel: Model<Tour>,
    @Inject(REQUEST) private readonly req: tokenRequestType,
  ) { }

  // get Profile
  async getProfile(): Promise<User> {
    const user = await this.userModel

      .findOne({ email: this.req.user.email })
      .populate([
        {
          path: 'user_orders',
          populate: [
            { path: 'tourId', select: ['name', 'photo'] },
            { path: 'hotelId', select: ['name', 'photos'] },
          ],
        },
      ])

      .select(['-password', '-role']);
    return user;
  }

  // update profile
  async updateProfile(
    UpdateUserDto: updateUserDto,
    file: Express.Multer.File,
  ): Promise<MessageResponse> {
    const userExist = await this.userModel.findOne({
      email: this.req.user.email,
    });
    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (file) {
      const data = await cloudinary.uploader.upload(file.path, {
        public_id: file.originalname,
      });
      await this.userModel.findOneAndUpdate(
        { email: this.req.user.email },
        { $set: { profile_photo: data.url } },
      );
      return { message: 'Changed profile photo', statusCode: 200 };
    }
    if (!UpdateUserDto.old_password) {
      await this.userModel.findOneAndUpdate(
        { email: this.req.user.email },
        { $set: UpdateUserDto },
        { new: true },
      );
      return { message: 'Changed profile information', statusCode: 200 };
    } else {
      const passRight = await compare(
        UpdateUserDto.old_password,
        userExist.password,
      );
      if (!passRight) {
        throw new HttpException('Password is wrong!', HttpStatus.UNAUTHORIZED);
      }
      const hashNewPass = await hash(UpdateUserDto.new_password, 10);
      await this.userModel.findOneAndUpdate(
        { email: this.req.user.email },
        { $set: { password: hashNewPass } },
        { new: true },
      );
      return {
        message: 'Your password has been successfully changed',
        statusCode: 200,
      };
    }
  }

  // hotel and tour add whishlist
  async addWhishList(
    CreateWhishListDto: createWhishListDto,
  ): Promise<Whishlist> {
    const { hotelId, tourId } = CreateWhishListDto;
    const whishlist = await this.whishListModel.create({
      userEmail: this.req.user.email,
      hotelId,
      tourId,
    });
    return await this.userModel.findOneAndUpdate(
      { email: whishlist.userEmail },
      { $push: { user_whishlist: whishlist._id } },
      { new: true },
    );
  }

  // hotel and tour delete whishlist
  async deleteWhishlist(_id: string): Promise<MessageResponse> {
    const hotel = await this.hotelModel.findById(_id);
    if (hotel) {
      const deletedWhishlist = await this.whishListModel.findOneAndDelete({
        hotelId: hotel._id,
      });
      await this.userModel.findOneAndUpdate(
        { email: deletedWhishlist.userEmail },
        { $pull: { user_whishlist: deletedWhishlist._id } },
      );
    } else {
      const tour = await this.tourModel.findById(_id);
      const deletedWhishlist = await this.whishListModel.findOneAndDelete({
        tourId: tour._id,
      });
      await this.userModel.findOneAndUpdate(
        { email: deletedWhishlist.userEmail },
        { $pull: { user_whishlist: deletedWhishlist._id } },
      );
    }
    return { message: 'Whish list deleted', statusCode: 200 };
  }

  // get all whishlist
  async getAllWhishList(): Promise<Whishlist[]> {
    return await this.whishListModel
      .find({ userEmail: this.req.user.email })
      .populate([{ path: 'hotelId' }, { path: 'tourId' }]);
  }

  // create hotel and tour Review
  async createReview(CreateReviewDto: createReviewDto) {
    const { hotelId, tourId, title, description, rating } = CreateReviewDto;
    const user = await this.userModel.findOne({ email: this.req.user.email });
    if (hotelId) {
      const newReviewHotel = await this.reviewModel.create({
        userId: user._id,
        hotelId,
        title,
        description,
        rating,
      });
      return this.hotelModel.findByIdAndUpdate(
        newReviewHotel.hotelId,
        { $push: { reviews: newReviewHotel._id } },
        { new: true },
      );
    }
    if (tourId) {
      const newReviewTour = await this.reviewModel.create({
        userId: user._id,
        tourId,
        title,
        description,
        rating,
      });
      return this.tourModel.findByIdAndUpdate(
        newReviewTour.tourId,
        { $push: { reviews: newReviewTour._id } },
        { new: true },
      );
    }
  }

  // update hotel and tour Review
  async updateReview(UpdateReviewDto: updateReviewDto) {
    const { hotelId, tourId, title, description, rating } = UpdateReviewDto;
    console.log(UpdateReviewDto);
    console.log(hotelId);
    console.log(tourId);

    if (hotelId) {
      return await this.reviewModel.findByIdAndUpdate(
        { _id: hotelId },
        { $set: { title, description, rating } },
        { new: true },
      );
    }

    if (tourId) {
      return await this.reviewModel.findByIdAndUpdate(
        { _id: tourId },
        { $set: { title, description, rating } },
        { new: true },
      );
    }
  }

  // delete hotel and tour Review
  async deleteReview(
    _id: string,
    DeleteReviewDto: deleteReviewDto,
  ): Promise<MessageResponse> {
    const deleteReview = await this.reviewModel.findOneAndDelete({
      _id: this.req.params._id,
    });
    const { hotelId } = DeleteReviewDto;
    if (hotelId) {
      await this.hotelModel.findOneAndUpdate(
        { _id: deleteReview.hotelId },
        { $pull: { reviews: deleteReview._id } },
      );
      return { message: 'Your review has been deleted', statusCode: 200 };
    }
    await this.tourModel.findOneAndUpdate(
      { _id: deleteReview.tourId },
      { $pull: { reviews: deleteReview._id } },
    );
    return { message: 'Your review has been deleted', statusCode: 200 };
  }

  // create reservation hotel
  async createReservationHotel(
    createOrderDto: CreateOrderDto,
  ): Promise<MessageResponse> {
    const { hotelId } = createOrderDto;
    const userExist = await this.userModel.findOne({
      email: this.req.user.email,
    });
    const orderExist = await this.orderModel.findOne({ userId: userExist._id, hotelId })
    console.log(orderExist);
    if (orderExist && orderExist.ordered === false) {
      throw new HttpException('You have already booked', HttpStatus.FORBIDDEN);
    } else {
      const reserv = await this.orderModel.create({
        userId: userExist._id,
        hotelId,
      });
      await this.userModel.findOneAndUpdate(
        { email: this.req.user.email },
        { $push: { user_orders: reserv._id } },
        { new: true },
      );
      return { message: 'Your selection has been reserved', statusCode: 201 };
    }
  }

  //delete reservation hotel and tour
  async deleteReservation(_id: string): Promise<MessageResponse> {
    const deleteOrderHotel = await this.orderModel.findOneAndDelete({
      hotelId: this.req.params._id,
    });
    if (!deleteOrderHotel) {
      const order = await this.orderModel.findOne({
        tourId: this.req.params._id,
      });
      if (order.ordered === false) {
        const deleteOrderTour = await this.orderModel.findOneAndDelete({
          tourId: this.req.params._id,
        });
        await this.userModel.findOneAndUpdate(
          { email: this.req.user.email },
          { $pull: { user_orders: deleteOrderTour._id } },
          { new: true },
        );
        return {
          message: 'Your tour reservation has been cancelled',
          statusCode: 200,
        };
      } else {
        return {
          message: 'Your confirmed order cannot be deleted.',
          statusCode: 403,
        };
      }
    }
    await this.userModel.findOneAndUpdate(
      { email: this.req.user.email },
      { $pull: { user_orders: deleteOrderHotel._id } },
      { new: true },
    );
    return {
      message: 'Your hotel reservation has been cancelled',
      statusCode: 200,
    };
  }

  // create reservation tour
  async createReservationTour(
    createOrderDto: CreateOrderDto,
  ): Promise<MessageResponse> {
    const { tourId, confirmed_person_count } = createOrderDto;
    const userExist = await this.userModel.findOne({
      email: this.req.user.email,
    });
    const orderExist = await this.orderModel.findOne({ userId: userExist._id, tourId })
    console.log(orderExist);
  
    if (orderExist && orderExist.ordered === false) {
      throw new HttpException('You have already booked', HttpStatus.FORBIDDEN);
    } else {
      const reserv = await this.orderModel.create({
        userId: userExist._id,
        tourId,
        confirmed_person_count,
      });
      await this.userModel.findOneAndUpdate(
        { email: this.req.user.email },
        { $push: { user_orders: reserv._id } },
        { new: true },
      );
      return { message: 'Your selection has been reserved', statusCode: 201 };
    }
  }

  //get All reserv
  async getAllReservation(): Promise<Order[]> {
    const user = await this.userModel.findOne({ email: this.req.user.email });
    return await this.orderModel
      .find({ userId: user._id })
      .select('-userId')
      .populate([{ path: 'hotelId' }, { path: 'tourId' }]);
  }
}
