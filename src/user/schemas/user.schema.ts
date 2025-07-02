import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({ required: true, trim: true })
  firstname: string;

  @Prop({ required: true, trim: true })
  lastname: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ required: true, trim: true })
  email: string;

  @Prop({ default: false })
  isActive?: boolean;

  @Prop({
    required: true,
    enum: ['cashier', 'waiter', 'admin'],
    default: 'waiter',
  })
  role?: string;

  @Prop({ default: '' })
  emailVerificationCode?: string;

  @Prop({ default: '' })
  emailVerificationExpires?: Date;

  @Prop({ default: '' })
  resetPasswordCode?: string;

  @Prop({ default: '' })
  resetPasswordExpires?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ isActive: 1 });
