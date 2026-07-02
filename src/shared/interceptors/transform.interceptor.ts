import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Record<string, any>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Record<string, any>> {
    return next.handle().pipe(
      map((response) => {
        if (response && typeof response === 'object' && 'meta' in response) {
          return {
            success: true,
            data: (response as any).data ?? null,
            meta: (response as any).meta,
          };
        }
        return {
          success: true,
          data: response ?? null,
        };
      }),
    );
  }
}
