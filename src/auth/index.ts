import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [],
  providers: [
    AuthService
  ]
})
export default class AuthModule {}

