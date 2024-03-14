import { UserInfo } from 'src/utils/userInfo.decorator';

import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from './dto/login.dto';
import { SignupDto } from "./dto/signup.dto"
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    const user = await this.userService.signup(signupDto.email, signupDto.password, signupDto.nickname);

    return {message : "회원가입이 성공했습니다"};
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const login = await this.userService.login(loginDto.email, loginDto.password);
    res.cookie("authorization", `Bearer ${login.access_token}`);
    res.send("로그인이 완료되었습니다")
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('userinfo')
  checkUser(@Req() req: any) {
    const userinfo = req.user;
    return this.userService.checkUser(userinfo);
  }
}