import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// NOTE: TypeORMのRepositoryクラスは, entity（今回はproduct）に対するCRUD操作を提供する
import { Repository } from 'typeorm';
import { Product } from './product.entity';

// NOTE: @Injectable() デコレータを使うことで、このクラスが依存性注入（DI）システムに登録され、他のクラスで注入（インジェクト）できるようになります。
// NestJSではサービスクラスのような依存性を持つものをProviderとして登録し、それを他のクラスで使うためにDIしています。
@Injectable()
export class ProductsService {
  constructor(
    // NOTE: @InjectRepository() デコレータは、TypeORMのリポジトリを特定のエンティティ（ここでは Product）に関連付けた形で注入する役割を持ちます。
    // これにより、リポジトリを直接操作してデータベースのCRUD操作が行えるようになります。
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.productsRepository.findOne(id);
  }

  // async create(product: Product): Promise<Product> {
  //   return this.productsRepository.save(product);
  // }

  // async update(id: string, product: Product): Promise<Product> {
  //   await this.productsRepository.update(id, product);
  //   return this.productsRepository.findOne(id);
  // }

  // async remove(id: string): Promise<void> {
  //   await this.productsRepository.delete(id);
  // }
}
