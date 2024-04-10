import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Logger middleware
 *
 * - Logs the request and response information
 * - Formats the logs to improve readability
 * - Uses the performance API to measure the request duration
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger: Logger = new Logger('RequestLogger');

  use(req: Request, res: Response, next: () => void) {
    const reqStartTimestamp = performance.now();
    const idDate = Date.now();
    setImmediate(() => {
      const reqInfoToLog: Record<string, any> = {
        id: idDate,
        headers: req.headers['x-api-key'],
        ip: req.ip,
        protocol: req.protocol,
        httpVersion: req.httpVersion,
        hostname: req.hostname,
        originalUrl: req.originalUrl,
        method: req.method,
      };
      if (req.body) {
        reqInfoToLog['body'] = req.body;
      }
      const reqLogString = `⬇️  REQUEST ${formatLogsToString(reqInfoToLog)}`;
      this.logger.debug(reqLogString);
    });

    res.on('finish', () => {
      return setTimeout(() => {
        const reqDuration =
          Math.floor(((performance.now() - reqStartTimestamp) * 100) / 1000) /
          100;
        const resInfoToLog = {
          id: idDate,
          statusCode: res.statusCode + '',
          duration: reqDuration + 's',
        };

        let statusEmoji = '✅';

        if (res.statusCode > 299) {
          statusEmoji = '❌';
        }

        const resLogString = `${statusEmoji} RESPONSE ${formatLogsToString(resInfoToLog)}`;
        this.logger.debug(resLogString);
      }, 0);
    });

    if (next) {
      next();
    }
  }
}

export const formatLogsToString = (varsToLog: Record<string, any>) => {
  return (
    '[ ' +
    Object.entries(varsToLog)
      .map(([key, value]) => `${key}: ${value}`)
      .join(' | ') +
    ' ]'
  );
};
