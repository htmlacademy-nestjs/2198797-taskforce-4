import { Body, Controller, Get, Param, Post, Query, UseFilters, UseGuards } from "@nestjs/common";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { HttpService } from "@nestjs/axios";
import { User } from "./decorators/user-decorator";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { ApplicationServiceURL } from "./app.config";
import { TokenPayload } from "@project/shared/app-types";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { CommentQuery } from "./query/comment.query";
import querystring from 'node:querystring';



@Controller('comments')
@UseFilters(AxiosExceptionFilter)
export class CommentController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard)
  @Post('create')
  public async create(@Body() dto: CreateCommentDto, @User() req: TokenPayload) {
    dto["userId"] = req.sub;
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Comments}/create`, dto);
    return data;
  }

  @Get(':id')
  public async getComment(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}/${id}`);
    return data;
  }

  @Get('/')
  public async getComments(@Query() query: CommentQuery) {
    const queryStr = querystring.stringify({...query});
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Comments}?${queryStr}`);
    return data;
  }
}