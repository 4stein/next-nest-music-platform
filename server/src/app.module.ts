import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { FileModule } from './file/file.module';

import { TrackModule } from './track/track.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static')
    }),
    MongooseModule.forRoot('mongodb://mongodb:27017/music'), 
    TrackModule,
    FileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
