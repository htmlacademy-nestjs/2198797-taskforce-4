import { Body, Controller, Param, Post, UseFilters, UseGuards } from "@nestjs/common";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { HttpService } from "@nestjs/axios";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { PermissionGuard } from "./guards/permission.guard";
import { CreateReviewDto } from "./dto/create-review.dto";
import { ApplicationServiceURL } from "./app.config";

@Controller('reviews')
@UseFilters(AxiosExceptionFilter)
export class ReviewController {

  constructor(
    private readonly httpService: HttpService,
  ) { }

  @UseGuards(CheckAuthGuard, PermissionGuard)
  @Post('create/:id')
  public async create(@Body() dto: CreateReviewDto, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Reviews}/create/${id}`, dto);
    return data;
  }

}