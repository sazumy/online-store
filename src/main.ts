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
    const flashErrors: string[] = req.session.flashErrors;
    if (flashErrors) {
      // この2行のコードは、全体としてエラーメッセージは一度だけ表示され、次のリクエストでは表示されないようにしている
      res.locals.flashErrors = flashErrors; // res.localは現在のリクエストに対して一時的なデータを保持するために使用される
      req.session.flashErrors = null; // req.sessionは、セッションデータを保持するために使用されます。
    }
    next(); // 次のミドルウェア関数に制御を渡す。next()を呼び出さないと、リクエストはそこで止まり、次のミドルウェアやルートハンドラーに進むことができない。
  });

  app.use('/admin', function (req, res, next) {
    if (req.session.user && req.session.user.role === 'admin') {
      next();
    } else {
      res.redirect('/');
    }
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
