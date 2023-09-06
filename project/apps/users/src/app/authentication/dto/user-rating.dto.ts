import { IsInt, IsString } from "class-validator";

export class UserRatingDto {

  @IsString()
  public userId: string;

  @IsInt()
  public rating: number;

}
