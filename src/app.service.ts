import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(requestUrl: string | undefined, requestIp: string): string {
    return (
      'Server running. Request URL:' +
      (requestUrl || 'unknown') +
      ', Request IP ' +
      requestIp
    );
  }
}
