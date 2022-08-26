import { Module, Global } from '@nestjs/common';
import { ApiResponseService } from '../utils/apiResponse.service';

@Global()
@Module({ providers: [ApiResponseService], exports: [ApiResponseService] })
export class ApiResponseModule {}
