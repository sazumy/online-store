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

  getId(): number {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string) {
    this.description = description;
  }

  getImage(): string {
    return this.image;
  }

  setImage(image: string) {
    this.image = image;
  }

  getPrice(): number {
    return this.price;
  }

  setPrice(price: number) {
    this.price = price;
  }
}
