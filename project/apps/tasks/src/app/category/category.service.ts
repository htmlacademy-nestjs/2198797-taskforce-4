import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@project/shared/app-types';
import { CategoryRepository } from './category.repository';
import { ConflictException, Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CATEGORY_ALREADY_EXISTS } from './category.constants';

@Injectable()
export class CategoryService {
  constructor(
    private readonly taskCategoryRepository: CategoryRepository
  ) { }

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const existTask = await this.taskCategoryRepository.findByTitle(dto.title);

    if (existTask) {
      throw new ConflictException(CATEGORY_ALREADY_EXISTS);
    }
    const categoryEntity = new CategoryEntity(dto);
    return await this.taskCategoryRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.taskCategoryRepository.destroy(id);
  }

  async getCategory(id: number): Promise<Category> {
    return await this.taskCategoryRepository.findById(id);
  }

  async getCategories(): Promise<Category[]> {
    return await this.taskCategoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    return await this.taskCategoryRepository.update(id, new CategoryEntity(dto));
  }
}
