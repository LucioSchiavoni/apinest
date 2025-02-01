import { Controller, Post, UseInterceptors, UploadedFile, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from 'src/application/services/create-product.service';
import { Product } from 'src/domain/entities/product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image')) 
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: Product, 
  ) {
    return this.productService.createProduct(createProductDto, file);
  }
}
