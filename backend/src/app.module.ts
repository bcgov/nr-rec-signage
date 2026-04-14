import { MiddlewareConsumer, Module } from "@nestjs/common";
import { HTTPLoggerMiddleware } from "./common/middleware/req.res.logger";
import { AuthMiddleware } from "./common/middleware/auth.middleware";
import { PrismaService } from "./prisma/prisma.service";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { MetricsController } from "./metrics.controller";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./health.controller";
import { CacheModule } from '@nestjs/cache-manager';
import { CategoriesModule } from "./categories/categories.module";
import { SignsModule } from "./signs/signs.module";
import { PictogramsModule } from "./pictograms/pictograms.module";
import { DropdownValuesModule } from "./dropdown-values/dropdown-values.module";
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env', '../.env'] }),
    TerminusModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 60 * 1000, // 60 seconds default TTL
      max: 100, // maximum number of items in cache
    }),
    CategoriesModule,
    SignsModule,
    PictogramsModule,
    UploadsModule,
    DropdownValuesModule,
  ],
  controllers: [AppController, MetricsController, HealthController],
  providers: [AppService, PrismaService, AuthMiddleware],
})
export class AppModule {
  // let's add a middleware on all routes
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HTTPLoggerMiddleware, AuthMiddleware)
      .exclude('metrics', 'health')
      .forRoutes('*');
  }
}
