import { Controller, Get, Render } from '@nestjs/common';

// NOTE: ('/products')の部分は、このコントローラー配下にある全てのルートは/productsで始まるという指示
@Controller('/products')
export class ProductsController {
  // NOTE: staticで定義することで、ProductsController.productsのようにClass名.変数名でアクセスできる
  static products = [
    {
      id: '1',
      name: 'TV',
      description: 'Best tv',
      image: 'game.png',
      price: '1000',
    },
    {
      id: '2',
      name: 'iPhone',
      description: 'Best iPhone',
      image: 'safe.png',
      price: '999',
    },
    {
      id: '3',
      name: 'Chromecast',
      description: 'Best Chromecast',
      image: 'submarine.png',
      price: '30',
    },
    {
      id: '4',
      name: 'Glasses',
      description: 'Best Glasses',
      image: 'game.png',
      price: '100',
    },
  ];

  @Get('/')
  @Render('products/index')
  index() {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of Products';
    viewData['products'] = ProductsController.products;
    return { viewData: viewData };
  }
}
