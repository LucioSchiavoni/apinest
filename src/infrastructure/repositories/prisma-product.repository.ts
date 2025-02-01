import { Injectable } from "@nestjs/common";
import { ProductRepository } from "src/domain/interfaces/product.repository";
import { PrismaService } from "../orm/prisma.service";
import { Product } from "src/domain/entities/product.entity";


@Injectable()
export class PrismaProductRepository implements ProductRepository {
    constructor(private readonly prisma: PrismaService) {}

    async save(product: Product): Promise<Product> {
        const create = await this.prisma.product.create({
            data:{
                name: product.name,
                price: product.price,
                description: product.description,
                image: product.image,
                type:product.type
            }
        })
        return new Product(
            create.id.toString(),
            create.name,
            create.price,
            create.description,
            create.image,
            create.type,
            
        )
    }

    async findAllProducts(): Promise<Product[]> {
        const data = await this.prisma.product.findMany();
        return data.map(product => new Product(
            product.id.toString(),
            product.name,
            product.description,
            product.price,
            product.image,
            product.type
        ))
    }

    async findProductById(id: string): Promise<Product | null> {
        const product = await this.prisma.product.findFirst({ where: { id: parseInt(id) } });
        return product
            ? new Product(
                product.id.toString(),
                product.name,
                product.price,
                product.description,
                product.image,
                product.type
            )
            : null;
    }

    async findByTitle(title: string): Promise<Product | null> {
        const product = await this.prisma.product.findFirst({ where: { name: title } });
        return product
            ? new Product(
                product.id.toString(),
                product.name,
                product.price,
                product.description,
                product.image,
                product.type
            )
            : null;
    }   

}