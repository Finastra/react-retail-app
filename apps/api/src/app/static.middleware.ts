import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class StaticMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: Function) {
    if (req.isAuthenticated()) {
      return next();
    }

    /* res.cookie(LOGIN_SESSION_COOKIE, 'logging in', {
      maxAge: 15 * 1000 * 60,
    }); */

    res.redirect(`/login`);
  }
}
