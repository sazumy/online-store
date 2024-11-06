import { Controller, Get, Render } from '@nestjs/common';

@Controller('/admin')
export class AdminController {
  @Get('/')
  @Render('admin/index')
  async index() {
    const viewData = [];
    viewData['title'] = 'Admin Page - Admin - Online Store';
    return { viewData: viewData };
  }
}
