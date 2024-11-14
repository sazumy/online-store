import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import * as hbsUtils from 'hbs-utils';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  hbs.registerPartials(join(__dirname, '..', 'views/layouts'));
  hbsUtils(hbs).registerWatchedPartials(join(__dirname, '..', 'views/layouts'));
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: 'nest-book', // ユーザーのブラウザに保存されるセッションIDの暗号化に使用するキー
      resave: false, // リクエスト中にセッションが保存されなかった場合にもセッションが保存されるようにするオプション
      saveUninitialized: false, // 初期化されていないセッションを保存するかどうかを決定するオプション
    }),
  );
  app.use(function (req, res, next) {
    res.locals.session = req.session;
    next(); // 次のミドルウェア関数に制御を渡す。next()を呼び出さないと、リクエストはそこで止まり、次のミドルウェアやルートハンドラーに進むことができない。
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
