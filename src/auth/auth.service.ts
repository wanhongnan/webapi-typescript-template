import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Req } from '@nestjs/common';

/*************************************************************************
 * 注意：使用bearer会使得
 * optimization: {
    minimize: false
  }
  选项不能设置为true,设置为true对代码进行混淆后，无法使用
 * *************************
在 Controller 上使用
        @Controller('user')
        @UseGuards(AuthGuard("bearer"))     //使用OAuth 2.0 验证
        export default class {
          @Get("test")
          test(@Req() req){return req.user;}    //在这里可以使用req.user的信息,req.user 就是validate返回的信息
        }
 *************************************************************************/
@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  constructor() {super();}

  async validate(token: string) {
    //const user = await this.authService.validateUser(token);
    /*
    if (!user) {
      throw new UnauthorizedException();
    }*/
    var ret = {userId:11, userName:"south dsfadf"  };
    return ret;
  }
}
