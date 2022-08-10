import { LoggerModule } from '@finastra/nestjs-logger';
import { ProxyModule } from '@finastra/nestjs-proxy';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OidcModule } from '@finastra/nestjs-oidc';
import { ServeStaticModule } from '@nestjs/serve-static';
import { OidcConfigService } from '../configs/oidc-config.service';
import { ProxyConfigService } from '../configs/proxy-config.service';
import { appFolder, ServeStaticConfigService } from '../configs/serve-static-config.service';
import { HealthModule } from './health/health.module';
import { StaticMiddleware } from './setup-static';

@Module({
  imports: [
    OidcModule.forRootAsync({
      imports: [ConfigModule],
      useClass: OidcConfigService,
    }), 
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
   ServeStaticModule.forRootAsync({
      useClass: ServeStaticConfigService,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/static',
      rootPath: appFolder,
    }),
    ProxyModule.forRootAsync({
      useClass: ProxyConfigService,
      imports: [ConfigModule],
    }),
    HealthModule,
    LoggerModule,
  ],
})
export class AppModule {
  
}