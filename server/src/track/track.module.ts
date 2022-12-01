import { MongooseModule } from '@nestjs/mongoose';
import { TrackController } from './track.controller';
import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { Track, TrackSchema } from './schemas/track.schema';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Track.name, schema: TrackSchema}]),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema}])
  ],
  controllers: [TrackController],
  providers: [
    TrackService, 
    FileService
  ],
})
export class TrackModule {}
