import { Controller, Get, Res } from '@nestjs/common';

@Controller('home')
export class HomeController {
  @Get()
  getHome(@Res() res) {
    res.sendFile('index.html', { root: 'public' });
  }
}
