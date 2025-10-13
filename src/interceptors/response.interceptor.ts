import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data)=>{
        return{
          success : true,
          timestamp : new Date().toISOString(),
          path: context.switchToHttp().getRequest().url,
          data
         }
      })
    );
  }
}
