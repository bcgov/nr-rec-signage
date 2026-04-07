import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from '../exceptions/custom.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof CustomException) {
      response.status(exception.status).json({ message: exception.message });
    } else {
        console.error('Unexpected error:', exception);
      response.status(500).json({ message: 'A critical error occurred. Please contact the administrator.' });
    }
  }
}
