import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ versionKey: false })
class SubCategory {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  uniqueName: string;
}

const SubCategorySchema = SchemaFactory.createForClass(SubCategory);

@Schema({ timestamps: true, versionKey: false })
class Category {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  icon: string;

  @Prop({ required: true, unique: true })
  uniqueName: string;

  @Prop({
    type: [SubCategorySchema],
    default: [],
  })
  subCategories: SubCategory[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
