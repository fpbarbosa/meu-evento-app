import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MercadoPagoService } from './mercadopago.service';
import { BookingsRepository } from '../bookings/bookings.repository';

@Controller('payments')
export class PaymentsController {
  constructor(
    private mercadoPagoService: MercadoPagoService,
    private bookingsRepository: BookingsRepository,
  ) {}

  //////////////////////////////////////////////////////
  // 🔹 CRIAR PAGAMENTO PARA RESERVA
  //////////////////////////////////////////////////////
  @UseGuards(AuthGuard('jwt'))
  @Post(':bookingId')
  async createPayment(@Param('bookingId') bookingId: string) {
    const booking = await this.bookingsRepository.findById(
      bookingId,
    );

    if (!booking) {
      throw new Error('Reserva não encontrada');
    }

    return this.mercadoPagoService.createPaymentPreference(
      booking,
    );
  }

  //////////////////////////////////////////////////////
  // 🔹 WEBHOOK DO MERCADO PAGO
  //////////////////////////////////////////////////////
  @Post('webhook')
  async webhook(@Body() body: any) {
    console.log('Webhook recebido:', body);

    // Aqui depois validaremos status do pagamento
    return { received: true };
  }
}
