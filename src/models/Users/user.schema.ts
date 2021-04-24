import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { userTypes } from './user.constant';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, enum: userTypes, default: 'customer' })
  type: string;

  @Prop()
  image: string;

  @Prop({ default: false })
  blocked: boolean;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
