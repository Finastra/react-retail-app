import { ProxyModuleOptions, ProxyModuleOptionsFactory } from '@finastra/nestjs-proxy';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// Documentation for the proxy module can be founde here:
// https://github.com/Finastra/finastra-nodejs-libs/blob/develop/libs/proxy/README.md

@Injectable()
export class ProxyConfigService implements ProxyModuleOptionsFactory {
  readonly logger = new Logger(ProxyConfigService.name);

  constructor(private configService: ConfigService) {}

  createModuleConfig(): ProxyModuleOptions {
    const FFDC = this.configService.get('FFDC');

    const services = [
      {
        id: 'ACCOUNT_INFORMATION_US',
        url: `${FFDC}/retail-us/me/account/v1`,
        config: {}
      },
      {
        id: 'CONSUMER_PROFILE',
        url: `${FFDC}/retail-us/me/v1`,
        config: {}
      },
      {
        id: 'PERSON_TO_PERSON',
        url: `${FFDC}/retail-us/me/p2p/v1`,
        config: {}
      }
    ];

    this.logger.log(services);

    return {
      services,
      allowedCookies: [],
    };
  }
}