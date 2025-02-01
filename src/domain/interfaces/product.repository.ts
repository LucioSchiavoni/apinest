
import { Product } from "../entities/product.entity";
export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';


export interface ProductRepository {
save(product:Product): Promise<Product>;
findByTitle(title:string): Promise<Product | null>;
findAllProducts(): Promise<Product[]>;
findProductById(id:string): Promise<Product | null>;
}