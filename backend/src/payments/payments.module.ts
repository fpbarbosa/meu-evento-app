import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { MercadoPagoService } from './mercadopago.service';
import { BookingsRepository } from '../bookings/bookings.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    MercadoPagoService,
    BookingsRepository,
    PrismaService,
  ],
  exports: [MercadoPagoService],
})
export class PaymentsModule {}
