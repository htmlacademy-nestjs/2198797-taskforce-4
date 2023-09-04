import { Body, Controller, Get, Post, UseFilters, UseGuards} from "@nestjs/common";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { CheckAuthGuard } from "./guards/check-auth.guard";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { ApplicationServiceURL } from "./app.config";
import { HttpService } from "@nestjs/axios";
import { ClientGuard } from "./guards/client.guard";

@Controller('categories')
@UseFilters(AxiosExceptionFilter)
export class CategoriesController {

  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGuard, ClientGuard)
  @Post('create')
  public async create(@Body() dto: CreateCategoryDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Categories}/create`, dto);
    return data;
  }

  @Get('/')
  public async getCategories() {
    const { data } = await this.httpService.axiosRef.get(`${ApplicationServiceURL.Categories}`);
    return data;
  }
} 
