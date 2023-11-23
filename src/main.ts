import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ErrorResponse } from './common/responses/error.response';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new ErrorResponse(HttpStatus.BAD_REQUEST, result);
      },
      stopAtFirstError: true,
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
