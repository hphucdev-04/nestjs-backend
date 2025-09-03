import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
  collection: 'categories',
})
export class Category {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop()
  image?: string;


  @Prop({ default: true })
  isActive: boolean;
}
export const CategorySchema = SchemaFactory.createForClass(Category);