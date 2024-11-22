import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @OneToMany(() => Order, (order) => order.items)
  order: Order;

  @OneToMany(() => Product, (product) => product.items)
  product: Product;

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getQuantity() {
    return this.quantity;
  }

  setQuantity(quantity: number) {
    this.quantity = quantity;
  }

  getPrice() {
    return this.price;
  }

  setPrice(price: number) {
    this.price = price;
  }

  getOrder() {
    return this.order;
  }

  setOrder(order: Order) {
    this.order = order;
  }

  getProduct() {
    return this.product;
  }

  setProduct(product: Product) {
    this.product = product;
  }
}
