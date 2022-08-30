import { Module, Global } from '@nestjs/common';
import { ApiResponseService } from '../utils/apiResponse.service';
import { RequestMiddleware } from 'src/middlewares/request.middleware';

@Global()
@Module({
  providers: [ApiResponseService, RequestMiddleware],
  exports: [ApiResponseService],
})
export class ApiResponseModule {}
