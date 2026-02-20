import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { PrismaService } from '../prisma/prisma.service';
import { SuppliersRepository } from '../suppliers/suppliers.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductsRepository,
    SuppliersRepository, // 🔥 ADICIONADO
    PrismaService,
  ],
})
export class ProductsModule {}
