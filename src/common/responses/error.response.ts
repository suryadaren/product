import { HttpException } from '@nestjs/common';

export class ErrorResponse extends HttpException {
  constructor(code: number, message: any) {
    super({ meta: { code, message } }, code);
  }
}
