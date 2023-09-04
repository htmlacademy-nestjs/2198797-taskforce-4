import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskCity, User, UserRole } from '@project/shared/app-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class TaskUserModel extends Document implements User {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public firstname: string;

  @Prop({
    required: true,
  })
  public lastname: string;

  @Prop({
    required: true,
    enum: TaskCity,
    type: String,
  })
  public city: TaskCity

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Client,
  })
  public role: UserRole;

  @Prop({
    type: Array
  })
  public specialization: string[];

  @Prop({
    type: String
  })
  public userInformation: string;


}


export const TaskUserSchema = SchemaFactory.createForClass(TaskUserModel);
