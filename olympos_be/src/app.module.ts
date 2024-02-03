import { MailerModule } from '@nestjs-modules/mailer';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GuestModule } from './guest/guest.module';
import { tokenCheckAdminMiddleware, tokenCheckMiddleware } from './middleware/tokencheck.middleware';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';


@Module({
  imports: [UserModule, AuthModule,
    MongooseModule.forRoot('mongodb+srv://node01:node01@cluster0.2drqhim.mongodb.net/?retryWrites=true&w=majority'),
    MailerModule.forRoot({
      transport: {
        port: 587,
        service: "gmail",
        auth: {
          user: "quliyevnamiq8@gmail.com",
          pass: "jjdeczqkscvbslrf"
        },
      }
    }),
    AdminModule,
    GuestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(tokenCheckMiddleware).forRoutes(UserController)
    consumer.apply(tokenCheckAdminMiddleware).forRoutes(AdminController)
  }
}
