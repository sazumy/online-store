import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './models/products.service';
import { Product } from './models/product.entity';

@Module({
  // NOTE: TypeOrmModule.forRoot()に何も引数を渡さない場合、ormconfig.jsonを読み込むとテキストには書いてあったが、実際にはエラーになったので直接書いている
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'online_store',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // NOTE: この設定により、ProductsServiceクラス内でproductsRepositoryを使ってProductエンティティに対するCRUD操作を行うことができます。
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [AppController, ProductsController],
  // NOTE: providersにProductsServiceを追加することでアプリ全体でProductsServiceを使えるようにしている
  providers: [ProductsService],
})
export class AppModule {}
