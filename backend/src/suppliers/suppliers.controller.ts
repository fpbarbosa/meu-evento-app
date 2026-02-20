import {
  Controller,
  Post,
  Get,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private service: SuppliersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @CurrentUser() user: { userId: string; role: string },
    @Body() body: { description: string },
  ) {
    return this.service.create(user.userId, body.description);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
