import { CategoryService } from "./category.service";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { fillObject } from "@project/util/util-core";
import { CategoryRdo } from "./rdo/category.rdo";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) { }
  @Get('/:id')
  async show(@Param('id') id: string) {
    const categoryId = parseInt(id, 10);
    const existCategory = await this.categoryService.getCategory(categoryId);
    return fillObject(CategoryRdo, existCategory);
  }

  @Get('/')
  async index() {
    const categories = await this.categoryService.getCategories();
    return fillObject(CategoryRdo, categories);
  }

  @Post('/')
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.createCategory(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: string) {
    const categoryId = parseInt(id, 10);
    this.categoryService.deleteCategory(categoryId);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    const categoryId = parseInt(id, 10);
    const updatedCategory = await this.categoryService.updateCategory(categoryId, dto)
    return fillObject(CategoryRdo, updatedCategory);
  }
}
