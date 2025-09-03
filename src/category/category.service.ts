import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryModel.create(createCategoryDto);
    return category;
  }
  async findAllCategories() {
    const categories = await this.categoryModel.find();
    return categories;
  }
  async findCategoryById(id: string) {
    const category = await this.categoryModel.findById(id);
    return category;
  }
  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
    return category;
  }
  async deleteCategory(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id);
    return category;
  }

  async changeCategoryStatus(id: string, isActive: boolean) {
    const category = await this.categoryModel.findByIdAndUpdate(id, { isActive });
    return category;
  }
}
