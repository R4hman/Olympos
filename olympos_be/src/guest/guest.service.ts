import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HotelSpecific } from 'src/hotel-specifics/hotelspecific.schema';
import { Hotel } from 'src/hotel/hotel.schema';
import { Review } from 'src/review/review.schema';
import { CreateSubscribeDto } from 'src/subscribe/dto/subscribe.dto';
import { Subscribe } from 'src/subscribe/model/subscribe.schema';
import { Tour } from 'src/tour/tour.schema';
import { tourCategory } from 'src/tourCategory/tourcategory.schema';
import { FilterDto, TourFilterDto } from './query.type';

@Injectable()
export class GuestService {
  constructor(
    @InjectModel('hotel') private readonly hotelModel: Model<Hotel>,
    @InjectModel('tour') private readonly tourModel: Model<Tour>,
    @InjectModel('tourcategory')
    private readonly tourCategoryModel: Model<tourCategory>,
    @InjectModel('hotelspecific')
    private readonly hotelSpecificsModel: Model<HotelSpecific>,
    @InjectModel('subscribe') private readonly subscribeModel: Model<Subscribe>,
    @InjectModel('review') private readonly reviewModel: Model<Review>,
  ) { }

  // get All hotels
  async getAllHotels(): Promise<Hotel[]> {
    return await this.hotelModel.find().populate([
      {
        path: 'reviews',
        select: ['description', 'rating'],
        populate: {
          path: 'userId',
          select: ['first_name', 'last_name', 'profile_photo'],
        },
      },
    ]);
  }

  // get single hotel
  async getSingleHotel(_id: string): Promise<Hotel> {
    return await this.hotelModel.findOne({ _id }).populate([
      {
        path: 'reviews',
        select: ['description', 'rating', 'title'],
        populate: {
          path: 'userId',
          select: ['first_name', 'last_name', 'profile_photo'],
        },
      },
    ]);
  }

  // filter hotel
  async getFilter(filterDto: FilterDto): Promise<Hotel[]> {
    const {
      country,
      city,
      minPrice,
      maxPrice,
      start_date,
      end_date,
      specifics,
    } = filterDto;
    const filter: any = {};
    if (country) filter.country = country;
    if (city) filter.city = city;
    if (minPrice && maxPrice) filter.price = { $gte: minPrice, $lte: maxPrice };
    if (start_date) filter.start_date = { $gte: start_date };
    if (end_date) filter.end_date = { $lte: end_date };
    if (start_date && end_date) {
      filter.start_date = { $gte: start_date, $lte: end_date };
      filter.end_date = { $gte: start_date, $lte: end_date };
    }
    if (specifics) {
      const specificsFilter = specifics.split(',');
      filter.specifics = { $all: specificsFilter };
    }
    return await this.hotelModel.find(filter);
  }

  // filter tour
  async getTourFilter(tourFilterDto: TourFilterDto): Promise<Tour[]> {
    const {
      name,
      category,
      minPrice,
      maxPrice,
      tour_day,
      start_date,
      end_date,
    } = tourFilterDto;
    const filter = [];
    if (name) filter.push({ $match: { name } });
    if (category) {
      filter.push({
        $lookup: {
          from: 'tourcategories',
          localField: 'category',
          foreignField: '_id',
          as: 'categoryData',
        },
      });
      filter.push({ $match: { 'categoryData.name': category } });
    }
    if (minPrice && maxPrice)
      filter.push({
        $match: { price: { $gte: Number(minPrice), $lte: Number(maxPrice) } },
      });
    if (tour_day) filter.push({ $match: { tour_day: Number(tour_day) } });
    if (start_date)
      filter.push({
        $match: {
          tour_date: { $gte: new Date(start_date) },
        },
      });
    if (start_date && end_date)
      filter.push({
        $match: {
          tour_date: { $gte: new Date(start_date), $lte: new Date(end_date) },
        },
      });
    if (filter.length === 0) {
      return await this.tourModel
        .find()
        .populate({ path: 'category', select: 'name' });
    }
    const aggregatedData = await this.tourModel.aggregate(filter);
    const populatedData = await this.tourModel.populate(aggregatedData, {
      path: 'reviews',
    });
    return populatedData;
  }

  // get All tour
  async getAllTours(): Promise<Tour[]> {
    return await this.tourModel.find().populate([
      {
        path: 'reviews',
        select: ['description', 'rating'],
        populate: {
          path: 'userId',
          select: ['first_name', 'last_name', 'profile_photo'],
        },
      },
    ]);
  }

  //get single tour
  async getSingleTour(id: string): Promise<Tour> {
    return await this.tourModel.findById(id).populate([
      {
        path: 'reviews',
        select: ['description', 'rating', 'title'],
        populate: {
          path: 'userId',
          select: ['first_name', 'last_name', 'profile_photo'],
        },
      },
    ]);
  }

  // get all tour category
  async getAllTourCategory(): Promise<tourCategory[]> {
    return await this.tourCategoryModel.find();
  }

  // get single tour category
  async getSingleTourCategory(_id: string): Promise<tourCategory> {
    return await this.tourCategoryModel.findById(_id);
  }

  // get all hotel specifics
  async getAllHotelSpecific(): Promise<HotelSpecific[]> {
    return await this.hotelSpecificsModel.find().select('-id');
  }

  // create subscribe
  async createSubscribe(
    createSubscribeDto: CreateSubscribeDto,
  ): Promise<Subscribe> {
    const subscribeExist = await this.subscribeModel.findOne({
      email: createSubscribeDto.email,
    });
    if (subscribeExist) {
      throw new HttpException('Email is already there', HttpStatus.CONFLICT);
    }
    return await this.subscribeModel.create(createSubscribeDto);
  }

  // review get all - hansi tura kim hansi reyi yazib ve turun sekili data bele gelecek - hami ucun(guest ,user, admin)
  async latestReviews(): Promise<Review[]> {
    const reviews = await this.reviewModel.find().populate([
      { path: 'userId', select: ['first_name', 'last_name'] },
      { path: 'tourId', select: ['name', 'photo'] },
      { path: 'hotelId', select: ['name', 'photos'] },
    ]);
    return reviews.slice(reviews.length - 5, reviews.length);
  }
}
