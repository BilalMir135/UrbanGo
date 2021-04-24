import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, versionKey: false })
class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true, unique: true })
  uniqueName: string;

  @Prop({ default: [] })
  subCategories: SubCategory[];
}

@Schema({ versionKey: false })
class SubCategory {
  @Prop({ required: true })
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
