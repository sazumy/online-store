import {
  Controller,
  Get,
  Render,
  Req,
  Redirect,
  Param,
  Body,
  Post,
  Res,
} from '@nestjs/common';
import { ProductsService } from '../models/products.service';
import { OrdersService } from '../models/orders.service';
import { UsersService } from '../models/users.service';
import { Product } from '../models/product.entity';
import { Order } from '../models/order.entity';
import { Item } from '../models/item.entity';
@Controller('/cart')
export class CartController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    private readonly ordersService: OrdersService,
  ) {}

  @Get('/')
  @Render('cart/index')
  async index(@Req() reqest) {
    let total = 0;
    let productsInCart: Product[] = null;
    const productsInSession = reqest.session.products;

    if (productsInSession) {
      productsInCart = await this.productsService.findByIds(
        Object.keys(productsInSession),
      );
      total = Product.sumPricesByQuantities(productsInCart, productsInSession);
    }

    const viewData = [];
    viewData['title'] = 'Cart - Online Store';
    viewData['subTitle'] = 'Shopping Cart';
    viewData['total'] = total;
    viewData['productsInCart'] = productsInCart;
    return { viewData };
  }

  @Post('/add/:id')
  @Redirect('/cart')
  add(@Param('id') id: number, @Body() body, @Req() request) {
    let productsInSession = request.session.products;

    if (!productsInSession) {
      productsInSession = {};
    }

    productsInSession[id] = body.quantity;
    request.session.products = productsInSession;
  }

  @Get('/delete')
  @Redirect('/cart')
  delete(@Req() request) {
    request.session.products = null;
  }

  @Get('/purchase')
  async purchase(@Req() request, @Res() response) {
    // NOTE: ユーザーがログインしているか、商品がカートに入っているかどうか確認
    if (!request.session.user) {
      return response.redirect('/auth/login');
    } else if (!request.session.products) {
      return response.redirect('/cart');
    } else {
      const user = await this.usersService.findOne(request.session.user.id);
      // NOTE: セッションの商品情報からカートの商品情報を取得
      const productsInSession = request.session.products;
      const productsInCart = await this.productsService.findByIds(
        Object.keys(productsInSession),
      );

      // NOTE: total価格を算出
      let total = 0;
      const items: Item[] = [];
      for (let i = 0; i < productsInCart.length; i++) {
        const quantity = productsInSession[productsInCart[i].getId()];
        const item = new Item();

        item.setQuantity(quantity);
        item.setPrice(productsInCart[i].getPrice());
        item.setProduct(productsInCart[i]);
        items.push(item);

        total += quantity * productsInCart[i].getPrice();
      }

      // NOTE: 注文情報を作成
      const newOrder = new Order();
      newOrder.setTotal(total);
      newOrder.setItems(items);
      newOrder.setUser(user);

      // NOTE: 注文情報を保存＆ユーザーの残高を更新
      const order = await this.ordersService.createOrUpdate(newOrder);
      const newBalance = user.getBalance() - total;
      await this.usersService.updateBalance(user.getId(), newBalance);

      const viewData = [];
      viewData['title'] = 'Purchase - Online Store';
      viewData['subTitle'] = 'Purchase Status';
      viewData['orderId'] = order.getId();
      return response.render('cart/purchase', { viewData });
    }
  }
}
