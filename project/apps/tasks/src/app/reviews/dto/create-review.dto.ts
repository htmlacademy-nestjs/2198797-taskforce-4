import { Transform } from "class-transformer";
import { IsInt, IsString, Length, Max, Min } from 'class-validator';


export class CreateReviewDto {

  @IsString()
  @Length(3, 50)
  public message: string;

  @Max(5)
  @Min(1)
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  public grade: number;

}
