import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/domain/interfaces/product.repository';
import { FileStorage } from 'src/domain/interfaces/file.storage.interface';
import { Product } from 'src/domain/entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository') private readonly productRepository: ProductRepository,
    @Inject('FileStorage') private readonly fileStorage: FileStorage
  ) {}

  async createProduct(dto: Product, image: Express.Multer.File) {
    const imageUrl = await this.fileStorage.uploadFile(image); 
    return await this.productRepository.save({...dto, image: imageUrl});
  }
}
