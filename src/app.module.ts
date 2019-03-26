import { Module } from '@nestjs/common';

import UserManager from './modules/user.manager';
import AuthModule from './auth';

@Module({
  imports: [UserManager, AuthModule],
  controllers: [],
  providers: [],
  exports:[]
})
export class AppModule {}
