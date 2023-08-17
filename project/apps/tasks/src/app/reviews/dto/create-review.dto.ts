import { Transform } from "class-transformer";
import { IsInt } from 'class-validator';


export class CreateReviewDto {
  public message: string;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public grade: number;

  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public taskId: number;
}
