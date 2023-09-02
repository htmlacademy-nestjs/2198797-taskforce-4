import { Body, Controller, Param, Post, UseFilters, UseGuards, UseInterceptors } from "@nestjs/common";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { HttpService } from "@nestjs/axios";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { ReviewPermisionInterseptor } from "./interseptors/review.permision.interceptor";
import { CreateReviewDto } from "./dto/crete-review.dto";
import { ApplicationServiceURL } from "./app.config";

@Controller('reviews')
@UseFilters(AxiosExceptionFilter)
export class ReviewController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @UseInterceptors(ReviewPermisionInterseptor)
  @Post('create/:id')
  public async create(@Body() dto: CreateReviewDto, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Reviews}/create/${id}`, dto);
    return data;
  }

}