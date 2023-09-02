import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoryDto {
  @ApiProperty({
		description: 'Category name',
		example: 'Dogs'
	})
  @IsString()
  public title: string;
}