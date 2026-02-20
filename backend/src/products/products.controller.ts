import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('products')
export class ProductsController {
  constructor(private service: ProductsService) {}

  // 🔐 Criar produto (somente supplier autenticado)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @CurrentUser() user: { userId: string; role: string },
    @Body() data: CreateProductDto,
  ) {
    return this.service.create(user.userId, data);
  }

  // 🌎 Listar produtos (público)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  // 🔎 Buscar produto por ID (público)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // 🔐 Atualizar produto (somente dono)
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string; role: string },
    @Body() data: UpdateProductDto,
  ) {
    return this.service.update(id, user.userId, data);
  }

  // 🔐 Remover produto (somente dono)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string; role: string },
  ) {
    return this.service.remove(id, user.userId);
  }
}
