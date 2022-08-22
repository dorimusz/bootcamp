import { Injectable } from '@nestjs/common';

@Injectable()
export class RepositoryService {
  getHello(): string {
    return 'Hello World!';
  }
}
