import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  NotFoundException,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { NotFoundError } from '../types/NotFoundError';

@Injectable()
export class NotFoundErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof NotFoundError) {
          throw new NotFoundException({
            message: error.message,
            timestamp: new Date().toISOString(),
          });
        } else throw error;
      }),
    );
  }
}
