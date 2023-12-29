import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { UnauthorizedInterceptor } from './common/erros/interceptors/unauthorized.interceptor';
import { NotFoundErrorInterceptor } from './common/erros/interceptors/notfounderror.interceptor';
import { BadRequestInterceptor } from './common/erros/interceptors/badrequest.interceptor';

import { ConflictInterceptor } from './common/erros/interceptors/conflict.interceptor';
import { DatabaseInterceptor } from './common/erros/interceptors/database.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }); // Enable CORS

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ConflictInterceptor());
  app.useGlobalInterceptors(new DatabaseInterceptor());
  app.useGlobalInterceptors(new UnauthorizedInterceptor());
  app.useGlobalInterceptors(new NotFoundErrorInterceptor());
  app.useGlobalInterceptors(new BadRequestInterceptor());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
