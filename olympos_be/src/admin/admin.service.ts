import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from 'src/cloudinary/cloudinary';
import { createHotelSpecificDto } from 'src/hotel-specifics/hotelspecific.dto';
import { HotelSpecific } from 'src/hotel-specifics/hotelspecific.schema';
import { createHotelDto } from 'src/hotel/createhotel.dto';
import { Hotel } from 'src/hotel/hotel.schema';
import { updateHotelDto } from 'src/hotel/updatehotel.dto';
import { tokenRequestType } from 'src/middleware/tokenRequestType';
import { Order } from 'src/order/order.schema';
import { Review } from 'src/review/review.schema';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { createTourDto } from 'src/tour/createtour.dto';
import { Tour } from 'src/tour/tour.schema';
import { updateTourDto } from 'src/tour/updatetour.dto';
import { createTourCategoryDto } from 'src/tourCategory/createtourcategory.dto';
import { tourCategory } from 'src/tourCategory/tourcategory.schema';
import { updateTourCategoryDto } from 'src/tourCategory/updatetourcategory.dto';
import { User } from 'src/user/schema/user.schema';
import { Whishlist } from 'src/whishlist/whishlist.schema';
import { MessageResponse } from './message.type';
import { notificationSubscribesDto } from './subscribe_notification';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('hotel') private hotelModel: Model<Hotel>,
    @InjectModel('tour') private tourModel: Model<Tour>,
    @InjectModel('order') private orderModel: Model<Order>,
    @InjectModel('user') private userModel: Model<User>,
    @InjectModel('tourcategory') private tourCategoryModel: Model<tourCategory>,
    @InjectModel('hotelspecific')
    private hotelSpecificModel: Model<HotelSpecific>,
    private mailerService: MailerService,
    @Inject(REQUEST) private readonly req: tokenRequestType,
    @InjectModel('subscribe') private subScribeModel: Model<Subscribe>,
    @InjectModel('whishlist') private whishlistModel: Model<Whishlist>,
    @InjectModel('review') private reviewModel: Model<Review>,
  ) {}

  // create hotel
  async createHotel(
    CreateHotelDto: createHotelDto,
    files: Express.Multer.File[],
  ): Promise<Hotel> {
    const hotelExist = await this.hotelModel.findOne({
      name: CreateHotelDto.name,
    });
    if (hotelExist) {
      throw new HttpException(
        'The hotel has already been created',
        HttpStatus.CONFLICT,
      );
    }
    const fileUrls = [];
    for (let i = 0; i < files.length; i++) {
      const fileUrl = await cloudinary.uploader.upload(files[i].path, {
        public_id: files[i].originalname,
      });
      fileUrls.push(fileUrl.url);
    }
    // hotel specifics
    const selected_specifics = [];
    selected_specifics.push(CreateHotelDto.specifics);
    const specifics = selected_specifics.join().split(',');
    return await this.hotelModel.create({
      ...CreateHotelDto,
      specifics,
      photos: fileUrls,
    });
  }

  // delete hotel
  async deleteHotel(id: string): Promise<MessageResponse> {
    const hotelExist = await this.hotelModel.findById(id);
    if (!hotelExist) {
      throw new HttpException(
        'The hotel you want to delete is not in the database',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      await this.hotelModel.findByIdAndDelete(id);
      return {
        message: 'The hotel has been successfully deleted from the database',
        statusCode: 200,
      };
    }
  }

  // update hotel
  async updateHotel(
    id: string,
    UpdateHotelDto: updateHotelDto,
    files: Express.Multer.File[],
  ): Promise<MessageResponse> {
    const hotelExist = await this.hotelModel.findById(id);
    if (!hotelExist) {
      throw new HttpException(
        'The changed hotel data is not in the database',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (files && files[0] && files[0].path) {
      const fileUrls = [];
      for (let i = 0; i < files.length; i++) {
        const fileUrl = await cloudinary.uploader.upload(files[i].path, {
          public_id: files[i].originalname,
        });
        fileUrls.push(fileUrl.url);
      }
      const selected_specifics = [];
      selected_specifics.push(UpdateHotelDto.specifics);
      const specifics = selected_specifics.join().split(',');
      await this.hotelModel.findByIdAndUpdate(
        id,
        { $set: { ...UpdateHotelDto, specifics, photos: fileUrls } },
        { new: true },
      );
    } else {
      const selected_specifics = [];
      selected_specifics.push(UpdateHotelDto.specifics);
      const specifics = selected_specifics.join().split(',');
      await this.hotelModel.findByIdAndUpdate(
        id,
        { $set: { ...UpdateHotelDto, specifics } },
        { new: true },
      );
    }
    return {
      message: 'The hotel information has been updated',
      statusCode: 200,
    };
  }

  // get All hotels
  async getAllHotels(): Promise<Hotel[]> {
    return await this.hotelModel.find();
  }

  // get single hotel
  async getSingleHotel(_id: string): Promise<Hotel> {
    return await this.hotelModel
      .findOne({ _id })
      .populate([{ path: 'reviews', select: 'description' }]);
  }

  // create tour
  async createTour(
    CreateTourDto: createTourDto,
    file: Express.Multer.File,
  ): Promise<Tour> {
    const tourExist = await this.tourModel.findOne({
      name: CreateTourDto.name,
    });
    if (tourExist) {
      throw new HttpException(
        'The tour is already created',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const data = await cloudinary.uploader.upload(file.path, {
        public_id: file.originalname,
      });
      return await this.tourModel.create({ ...CreateTourDto, photo: data.url });
    }
  }

  // update tour
  async updateTour(
    id: string,
    UpdateTourDto: updateTourDto,
    file: Express.Multer.File,
  ): Promise<MessageResponse> {
    const tourExist = await this.tourModel.findById(id);
    if (!tourExist) {
      throw new HttpException(
        'The tour to be changed is not available in the database',
        HttpStatus.NOT_FOUND,
      );
    }
    if (file && file.path) {
      const data = await cloudinary.uploader.upload(file.path, {
        public_id: file.originalname,
      });
      return await this.tourModel.findByIdAndUpdate(
        id,
        { $set: { ...UpdateTourDto, photo: data.url } },
        { new: true },
      );
    } else {
      await this.tourModel.findByIdAndUpdate(
        id,
        { $set: { ...UpdateTourDto } },
        { new: true },
      );
    }
    return {
      message: 'The tour has been updated successfully',
      statusCode: 200,
    };
  }

  // delete tour
  async deleteTour(id: string): Promise<MessageResponse> {
    await this.tourModel.findByIdAndDelete(id);
    return {
      message: 'Information about the tour was deleted.',
      statusCode: 200,
    };
  }

  // get All tour
  async getAllTours(): Promise<Tour[]> {
    return await this.tourModel
      .find()
      .populate({ path: 'category', select: 'name' });
  }

  //get single tour
  async getSingleTour(id: string): Promise<Tour> {
    return await this.tourModel.findById(id);
  }

  // get All orders
  // user name,hotel name
  async getAllOrders(): Promise<Order[]> {
    return await this.orderModel.find().populate([
      { path: 'userId', select: ['first_name', 'last_name', 'phone_number'] },
      { path: 'tourId', select: ['name', 'tour_date'] },
      { path: 'hotelId', select: 'name' },
    ]);
  }

  // order confirmation
  async orderConfirmation(_id: string): Promise<MessageResponse> {
    const order = await this.orderModel.findById(_id);
    if (order.ordered === true) {
      return { message: 'Order already confirmed', statusCode: 409 };
    }
    const confirmed_order = await this.orderModel.findByIdAndUpdate(
      _id,
      { $set: { ordered: true } },
      { new: true },
    );
    const tour = await this.tourModel.findOne({ _id: confirmed_order.tourId });
    tour.confirmed_person_count =
      tour.confirmed_person_count + confirmed_order.confirmed_person_count;
    if (tour.confirmed_person_count <= tour.person_count) {
      await this.tourModel.findByIdAndUpdate(
        tour._id,
        { $set: { confirmed_person_count: tour.confirmed_person_count } },
        { new: true },
      );
      return { message: 'Order confirmed', statusCode: 200 };
    } else {
      await this.orderModel.findByIdAndUpdate(
        _id,
        { $set: { ordered: false } },
        { new: true },
      );
      return {
        message: 'The order exceeds the specified number of places.',
        statusCode: 400,
      };
    }
  }

  // update order confirmation - ok
  async updateOrderConfirmation(
    _id: string,
    confirmed_person_count: number,
  ): Promise<MessageResponse> {
    const order = await this.orderModel.findById(_id); // deyisen sifaris
    const confirmed_tour = await this.tourModel.findById(order.tourId); // deyisilen turu tapir
    let sum_confirmed_person_count = 0;
    if (order.ordered === false) {
      sum_confirmed_person_count =
        confirmed_tour.confirmed_person_count + confirmed_person_count;
    } else {
      sum_confirmed_person_count =
        confirmed_tour.confirmed_person_count -
        order.confirmed_person_count +
        confirmed_person_count;
    }

    if (sum_confirmed_person_count > confirmed_tour.person_count) {
      return {
        message: 'No more than the limit can be reserved ',
        statusCode: 400,
      };
    } else if (confirmed_person_count < 0) {
      return { message: 'The number entered is negative', statusCode: 400 };
    } else {
      const confirmed_order = await this.orderModel.findByIdAndUpdate(
        _id,
        { $set: { confirmed_person_count } },
        { new: true },
      );
      if (order.ordered === true) {
        await this.tourModel.findOneAndUpdate(
          { _id: confirmed_order.tourId },
          { $set: { confirmed_person_count: sum_confirmed_person_count } },
          { new: true },
        );
      }
      return { message: 'Order quantity has been changed', statusCode: 200 };
    }
  }

  //adminin tesdiq edilmeyen sifarisin legv etmesi(user-in sifarislerim bolmesindende silinir)
  async orderCancellation(_id: string): Promise<MessageResponse> {
    const order = await this.orderModel.findByIdAndDelete(_id);
    if (order.ordered === true) {
      const tour = await this.tourModel.findById({ _id: order.tourId });
      tour.confirmed_person_count =
        tour.confirmed_person_count - order.confirmed_person_count;
      await this.tourModel.findByIdAndUpdate(
        { _id: order.tourId },
        { $set: { confirmed_person_count: tour.confirmed_person_count } },
      );
      await this.userModel.findOneAndUpdate(
        { _id: order.userId },
        { $pull: { user_orders: order.tourId } },
      );
    } else {
      await this.userModel.findOneAndUpdate(
        { _id: order.userId },
        { $pull: { user_orders: order.tourId } },
      );
    }
    return { message: 'Order cancelled', statusCode: 200 };
  }

  // create tour category
  async createTourCategory(
    CreateTourCategoryDto: createTourCategoryDto,
  ): Promise<MessageResponse> {
    const tourCategoryExist = await this.tourCategoryModel.findOne({
      name: CreateTourCategoryDto.name,
    });
    if (tourCategoryExist) {
      throw new HttpException(
        'The category already exists',
        HttpStatus.CONFLICT,
      );
    } else {
      await this.tourCategoryModel.create(CreateTourCategoryDto);
      return { message: 'Tour category created', statusCode: 201 };
    }
  }

  // update tour category
  async updateTourCategory(
    _id: string,
    UpdateTourCategoryDto: updateTourCategoryDto,
  ): Promise<MessageResponse> {
    await this.tourCategoryModel.findByIdAndUpdate(
      _id,
      { $set: { name: UpdateTourCategoryDto.name } },
      { new: true },
    );
    return { message: 'The tour category was changed', statusCode: 200 };
  }

  // get all tour category
  async getAllTourCategory(): Promise<tourCategory[]> {
    return await this.tourCategoryModel.find();
  }

  // get single tour category
  async getSingleTourCategory(_id: string): Promise<tourCategory> {
    return await this.tourCategoryModel.findById(_id);
  }

  async createHotelSpecific(
    CreateHotelSpecificDto: createHotelSpecificDto,
  ): Promise<HotelSpecific> {
    return await this.hotelSpecificModel.create(CreateHotelSpecificDto);
  }

  async getAllHotelSpecific(): Promise<HotelSpecific[]> {
    return await this.hotelSpecificModel.find().select('-id');
  }

  // get all users
  async getAllUsers(): Promise<User[]> {
    return await this.userModel.find().select('-password');
  }

  // Notification to all emails

  async notificationEmails(
    NotificationSubscribesDto: notificationSubscribesDto,
  ) {
    const admin = await this.userModel.findOne({ email: this.req.user.email });
    const allSubscribeEmails = await this.subScribeModel.find();

    for (let i = 0; i < allSubscribeEmails.length; i++) {
      this.mailerService.sendMail({
        from: `${admin.email}`,
        to: `${allSubscribeEmails[i].email}`,
        subject: `${NotificationSubscribesDto.subject}`,

        text: `${NotificationSubscribesDto.text}`,
      });
      return 'New notification sent to all email addresses';
    }
  }
  // user delete
  async userDelete(_id: string): Promise<MessageResponse> {
    const userExist = await this.userModel.findById(_id);
    if (!userExist) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    } else {
      await this.orderModel.findOneAndDelete({ userId: userExist.id });
      await this.whishlistModel.findOneAndDelete({
        userEmail: userExist.email,
      });
      await this.userModel.findByIdAndDelete(_id);
      return {
        message:
          'User profile, orders and favorites have been deleted from the database.',
        statusCode: 200,
      };
    }
  }

  // review delete -
  async userReviewDelete(_id: string): Promise<MessageResponse> {
    const review = await this.reviewModel.findById(_id);
    if (!review) {
      throw new HttpException('Review not found', HttpStatus.NOT_FOUND);
    }
    const tour = await this.tourModel.findOne({ _id: review.tourId });
    if (tour) {
      const deleteReview = await this.reviewModel.findByIdAndDelete(_id);
      await this.tourModel.findOneAndUpdate(
        { _id: tour._id },
        { $pull: { reviews: deleteReview._id } },
      );
    }
    const hotel = await this.hotelModel.findOne({ _id: review.hotelId });
    if (hotel) {
      const deleteReview = await this.reviewModel.findByIdAndDelete(_id);
      await this.hotelModel.findOneAndUpdate(
        { _id: hotel._id },
        { $pull: { reviews: deleteReview._id } },
      );
    }
    return { message: 'User review deleted', statusCode: 200 };
  }

  // review get all - hansi tura ve ya hotel-e kim hansi reyi yazib data bele gelecek -admin ucun
  async getAllReview(): Promise<Review[]> {
    return await this.reviewModel.find().populate([
      { path: 'tourId', select: 'name' },
      { path: 'hotelId', select: 'name' },
      { path: 'userId', select: ['first_name', 'last_name'] },
    ]);
  }
}
