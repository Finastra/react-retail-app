/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/api/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const nestjs_logger_1 = __webpack_require__("@finastra/nestjs-logger");
const nestjs_proxy_1 = __webpack_require__("@finastra/nestjs-proxy");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
const nestjs_oidc_1 = __webpack_require__("@finastra/nestjs-oidc");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const oidc_config_service_1 = __webpack_require__("./apps/api/src/configs/oidc-config.service.ts");
const proxy_config_service_1 = __webpack_require__("./apps/api/src/configs/proxy-config.service.ts");
const serve_static_config_service_1 = __webpack_require__("./apps/api/src/configs/serve-static-config.service.ts");
const health_module_1 = __webpack_require__("./apps/api/src/app/health/health.module.ts");
const setup_static_1 = __webpack_require__("./apps/api/src/app/setup-static.ts");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(setup_static_1.StaticMiddleware)
            .exclude({ path: '/health', method: common_1.RequestMethod.ALL }, { path: '/login/callback', method: common_1.RequestMethod.ALL }, { path: '/login', method: common_1.RequestMethod.ALL })
            .forRoutes({
            path: '/',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_oidc_1.OidcModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useClass: oidc_config_service_1.OidcConfigService,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                ignoreEnvFile: "development" === 'production',
            }),
            serve_static_1.ServeStaticModule.forRootAsync({
                useClass: serve_static_config_service_1.ServeStaticConfigService,
            }),
            serve_static_1.ServeStaticModule.forRoot({
                serveRoot: '/static',
                rootPath: serve_static_config_service_1.appFolder,
            }),
            nestjs_proxy_1.ProxyModule.forRootAsync({
                useClass: proxy_config_service_1.ProxyConfigService,
                imports: [config_1.ConfigModule],
            }),
            health_module_1.HealthModule,
            nestjs_logger_1.LoggerModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/api/src/app/health/health.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthController = void 0;
const tslib_1 = __webpack_require__("tslib");
const nestjs_oidc_1 = __webpack_require__("@finastra/nestjs-oidc");
const common_1 = __webpack_require__("@nestjs/common");
const terminus_1 = __webpack_require__("@nestjs/terminus");
let HealthController = class HealthController {
    constructor() { }
    //constructor(private health: HealthCheckService, private mongoose: MongooseHealthIndicator) {}
    healthCheck() {
        return true;
        //return this.health.check([async () => this.mongoose.pingCheck('mongoose')]);
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, nestjs_oidc_1.Public)(),
    (0, terminus_1.HealthCheck)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], HealthController.prototype, "healthCheck", null);
HealthController = tslib_1.__decorate([
    (0, common_1.Controller)('health'),
    tslib_1.__metadata("design:paramtypes", [])
], HealthController);
exports.HealthController = HealthController;


/***/ }),

/***/ "./apps/api/src/app/health/health.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HealthModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const terminus_1 = __webpack_require__("@nestjs/terminus");
const health_controller_1 = __webpack_require__("./apps/api/src/app/health/health.controller.ts");
let HealthModule = class HealthModule {
};
HealthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [terminus_1.TerminusModule],
        controllers: [health_controller_1.HealthController],
    })
], HealthModule);
exports.HealthModule = HealthModule;


/***/ }),

/***/ "./apps/api/src/app/setup-static.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StaticMiddleware = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
let StaticMiddleware = class StaticMiddleware {
    use(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        /* res.cookie(LOGIN_SESSION_COOKIE, 'logging in', {
   
         maxAge: 15 * 1000 * 60,
   
       }); */
        res.redirect(`/login`);
    }
};
StaticMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)()
], StaticMiddleware);
exports.StaticMiddleware = StaticMiddleware;


/***/ }),

/***/ "./apps/api/src/configs/oidc-config.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var OidcConfigService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcConfigService = void 0;
const tslib_1 = __webpack_require__("tslib");
const nestjs_oidc_1 = __webpack_require__("@finastra/nestjs-oidc");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
let OidcConfigService = OidcConfigService_1 = class OidcConfigService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(OidcConfigService_1.name);
    }
    createModuleConfig() {
        const issuer = this.configService.get('OIDC_ISSUER');
        const client_id = this.configService.get('OIDC_CLIENT_ID');
        const origin = this.configService.get('OIDC_ORIGIN');
        this.logger.log(`
issuer        : ${issuer}
client_id     : ${client_id}
origin        : ${origin}`);
        return {
            issuer: this.configService.get('OIDC_ISSUER'),
            clientMetadata: {
                client_id: this.configService.get('OIDC_CLIENT_ID'),
                client_secret: this.configService.get('OIDC_CLIENT_SECRET'),
            },
            authParams: {
                scope: this.configService.get('OIDC_SCOPE'),
                resource: this.configService.get('OIDC_RESOURCE'),
                nonce: 'true',
            },
            origin,
            userInfoMethod: nestjs_oidc_1.UserInfoMethod.token,
            defaultHttpOptions: {
                timeout: 20000,
            }
        };
    }
};
OidcConfigService = OidcConfigService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], OidcConfigService);
exports.OidcConfigService = OidcConfigService;


/***/ }),

/***/ "./apps/api/src/configs/proxy-config.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ProxyConfigService_1, _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProxyConfigService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
// Documentation for the proxy module can be founde here:
// https://github.com/Finastra/finastra-nodejs-libs/blob/develop/libs/proxy/README.md
let ProxyConfigService = ProxyConfigService_1 = class ProxyConfigService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(ProxyConfigService_1.name);
    }
    createModuleConfig() {
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
};
ProxyConfigService = ProxyConfigService_1 = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ProxyConfigService);
exports.ProxyConfigService = ProxyConfigService;


/***/ }),

/***/ "./apps/api/src/configs/serve-static-config.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ServeStaticConfigService = exports.appFolder = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const path_1 = __webpack_require__("path");
exports.appFolder = (0, path_1.join)(__dirname, '../../..', 'dist/apps/retail-app');
let ServeStaticConfigService = class ServeStaticConfigService {
    constructor() { }
    createLoggerOptions() {
        return [
            {
                rootPath: exports.appFolder,
            },
        ];
    }
};
ServeStaticConfigService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], ServeStaticConfigService);
exports.ServeStaticConfigService = ServeStaticConfigService;


/***/ }),

/***/ "@finastra/nestjs-logger":
/***/ ((module) => {

module.exports = require("@finastra/nestjs-logger");

/***/ }),

/***/ "@finastra/nestjs-oidc":
/***/ ((module) => {

module.exports = require("@finastra/nestjs-oidc");

/***/ }),

/***/ "@finastra/nestjs-proxy":
/***/ ((module) => {

module.exports = require("@finastra/nestjs-proxy");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/terminus":
/***/ ((module) => {

module.exports = require("@nestjs/terminus");

/***/ }),

/***/ "compression":
/***/ ((module) => {

module.exports = require("compression");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const nestjs_logger_1 = __webpack_require__("@finastra/nestjs-logger");
const nestjs_oidc_1 = __webpack_require__("@finastra/nestjs-oidc");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const compression = __webpack_require__("compression");
const app_module_1 = __webpack_require__("./apps/api/src/app/app.module.ts");
function bootstrap() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const omsLogger = new nestjs_logger_1.OMSLogger();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            logger: omsLogger,
        });
        app.useLogger(omsLogger);
        app.useGlobalInterceptors(new nestjs_logger_1.HttpLoggingInterceptor());
        app.use(compression());
        app.useGlobalGuards(app.get(nestjs_oidc_1.TokenGuard));
        (0, nestjs_oidc_1.setupSession)(app, 'react-retail-app');
        const port = process.env.PORT || 3000;
        yield app.listen(port, () => {
            common_1.Logger.log('Listening at http://localhost:' + port, 'main');
        });
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map