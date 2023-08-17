import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from '@project/shared/app-types';
import { CategoryRepository } from './category.repository';
import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    private readonly blogCategoryRepository: CategoryRepository
  ) { }

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const categoryEntity = new CategoryEntity(dto);
    return this.blogCategoryRepository.create(categoryEntity);
  }

  async deleteCategory(id: number): Promise<void> {
    this.blogCategoryRepository.destroy(id);
  }

  async getCategory(id: number): Promise<Category> {
    return this.blogCategoryRepository.findById(id);
  }

  async getCategories(): Promise<Category[]> {
    return this.blogCategoryRepository.find();
  }

  async updateCategory(id: number, dto: UpdateCategoryDto): Promise<Category> {
    return this.blogCategoryRepository.update(id, new CategoryEntity(dto));
  }
}
