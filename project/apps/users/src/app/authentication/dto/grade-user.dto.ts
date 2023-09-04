import { IsInt, Max, Min } from 'class-validator';


export class GradeDto {
  @IsInt()
  @Max(5)
  @Min(1)
  public grade: number;
}