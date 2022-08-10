import { LOGIN_SESSION_COOKIE } from '@finastra/nestjs-oidc';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class StaticMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: Function) {

    if (req.isAuthenticated()) {
      return next();
    }

    res.cookie(LOGIN_SESSION_COOKIE, 'logging in', {
      maxAge: 15 * 1000 * 60,
    });

    const channelType = req.params.channelType;
    const tenantId = req.params.tenantId;
    const prefix = `/${tenantId}/${channelType}`;

    res.redirect(`${prefix}/login?redirect_url=${req.url.replace(prefix, '')}`);

  }

}