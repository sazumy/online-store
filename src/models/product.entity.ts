import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity() 以下に書かれたクラスがRDBMのテーブルにマッピングされる
@Entity()
export class Product {
  // @PrimaryGeneratedColumn() は主キーを自動生成するためのデコレータ。auto-incrementの値を生成する
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;
}
