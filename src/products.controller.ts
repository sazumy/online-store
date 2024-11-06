import { Controller, Get, Render, Param, Res } from '@nestjs/common';
import { ProductsService } from './models/products.service';

// NOTE: ('/products')の部分は、このコントローラー配下にある全てのルートは/productsで始まるという指示
@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/')
  @Render('products/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Products - Online Store';
    viewData['subtitle'] = 'List of Products';
    viewData['products'] = await this.productsService.findAll();
    return { viewData: viewData };
  }

  @Get('/:id')
  @Render('products/show')
  async show(@Param() params, @Res() response) {
    const product = await this.productsService.findOne(params.id);
    if (!product) {
      return response.redirect('/products');
    }
    const viewData = [];
    viewData['title'] = product.getName() + ' - Online Store';
    viewData['subtitle'] = product.getName() + ' - Product Information';
    viewData['product'] = product;
    return response.render('products/show', { viewData: viewData });
  }
}
