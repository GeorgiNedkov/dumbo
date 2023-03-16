import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

export interface IVideo {
  type: string;
  msgs: {
    username?: string;
    msg: string;
    isMe?: boolean;
    ReadTimeFPS?: number;
    typeTimeFPS?: number;
    date?: string;
  };
}

export interface IVideoDocument extends IVideo, Document {
  toJSON(options?: DocumentToObjectOptions): IVideo;
}

export type IVideoModel = Model<IVideoDocument>;

const msg = new Schema({
  username: { type: String, required: false },
  msg: { type: String, required: true },
  isMe: { type: Boolean, required: false },
  ReadTimeFPS: { type: Number, required: false },
  typeTimeFPS: { type: Number, required: false },
  date: { type: String, required: false },
});

const schema = new Schema({
  type: { type: String, required: true },
  messages: { type: [msg], required: true },
});

const Video: IVideoModel = model<IVideoDocument, IVideoModel>('Video', schema);

export default Video;
