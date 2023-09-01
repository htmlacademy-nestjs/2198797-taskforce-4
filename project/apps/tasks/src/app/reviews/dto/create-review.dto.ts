import { Transform } from "class-transformer";
import { IsInt, Max, Min } from 'class-validator';


export class CreateReviewDto {
  public message: string;

  @Max(5)
  @Min(1)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public grade: number;

}
