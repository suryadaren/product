import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';
import { ErrorResponse } from './common/responses/error.response';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { transports, format } from 'winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const log = new Logger();

  app.setGlobalPrefix('api/v1');

  // validator
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        log.error('The request body is incorrect', result);
        return new ErrorResponse(HttpStatus.BAD_REQUEST, result);
      },
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
    }),
  );

  // open api
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('Api Product to get detail about product')
    .setVersion('1.0')
    .addTag('products')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // logger
  const logger = WinstonModule.createLogger({
    transports: [
      new transports.DailyRotateFile({
        filename: `logs/%DATE%.log`,
        format: format.combine(format.timestamp(), format.json()),
        zippedArchive: true,
        datePattern: 'YYYY-MM-DD',
        maxFiles: '15d',
        maxSize: '1m',
      }),

      new transports.Console({
        format: format.combine(format.timestamp(), format.json()),
      }),
    ],
    // other options
  });

  app.useLogger(logger);

  await app.listen(3000);
}
bootstrap();
