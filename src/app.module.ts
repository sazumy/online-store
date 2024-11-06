import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [AppController, ProductsController],
})
export class AppModule {}
