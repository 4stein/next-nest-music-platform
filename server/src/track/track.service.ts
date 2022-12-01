
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Track, TrackDocument } from './schemas/track.schema';
import { FileService, Filetype } from './../file/file.service';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private fileService: FileService
    ) {}

  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath =  this.fileService.createFile(Filetype.AUDIO, audio)
    const picturePath =  this.fileService.createFile(Filetype.IMAGE, picture)
    const track = await this.trackModel.create({...dto, listens: 0, picture: picturePath, audio: audioPath});
    return track;
  }

  async getAll(count = 10, offset = 0): Promise<Track[]> {
    const tracks = await this.trackModel.find().skip(Number(offset)).limit(Number(count));
    return tracks;
  }

  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: {$regex: new RegExp(query, 'i')}
    });
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async deleteOne(id: mongoose.Types.ObjectId): Promise<mongoose.Types.ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }
  
  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment: any = await this.commentModel.create({...dto})
    track.comments.push(comment._id)
    await track.save();
    return comment;
  }

  
  async listen(id: mongoose.Types.ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    track.save();
  }

}
