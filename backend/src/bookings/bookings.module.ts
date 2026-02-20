import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { BookingsRepository } from './bookings.repository';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsRepository } from '../products/products.repository';
import { SuppliersRepository } from '../suppliers/suppliers.repository';

@Module({
  controllers: [BookingsController],
  providers: [
    BookingsService,
    BookingsRepository,
    PrismaService,
    ProductsRepository,
    SuppliersRepository,
  ],
})
export class BookingsModule {}
