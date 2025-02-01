import { Module } from '@nestjs/common';
import { ProductController } from 'src/infrastructure/controllers/product.controller';
import { ProductService } from 'src/application/services/create-product.service';
import { LocalFileStorageAdapter } from 'src/infrastructure/adapters/file-storage.adapter';
import { PrismaProductRepository } from 'src/infrastructure/repositories/prisma-product.repository';
import { PrismaModule } from 'src/infrastructure/orm/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [
    ProductService,
    PrismaProductRepository,
    LocalFileStorageAdapter,
    { provide: 'ProductRepository', useClass: PrismaProductRepository },
    { provide: 'FileStorage', useClass: LocalFileStorageAdapter }
  ],
  exports: [
    ProductService,
    PrismaProductRepository,
    LocalFileStorageAdapter, 
    'ProductRepository', 
    'FileStorage' 
  ],
})
export class ProductModule {}
