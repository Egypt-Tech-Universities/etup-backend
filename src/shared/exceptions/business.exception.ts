import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, status: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(
      {
        success: false,
        statusCode: status,
        error: 'Business Logic Error',
        message,
      },
      status,
    );
  }
}
