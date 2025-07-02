import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot(): string {
    return 'Server is running';
  }
  checkHealth(): string {
    return 'OK';
  }
}
