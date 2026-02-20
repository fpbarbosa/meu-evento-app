import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MercadoPagoService } from './mercadopago.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private mercadoPagoService: MercadoPagoService,
  ) {}

  async createPayment(bookingId: string, userId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { product: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking não encontrado');
    }

    if (booking.user_id !== userId) {
      throw new ForbiddenException('Você não pode pagar esta reserva');
    }

    if (booking.status !== 'CONFIRMED') {
      throw new ForbiddenException('Reserva ainda não confirmada');
    }

    const payment = await this.mercadoPagoService.createPreference(
      booking.product.name,
      Number(booking.total_price),
      bookingId,
    );

    await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        payment_id: payment.id,
        payment_status: 'pending',
      },
    });

    return {
      checkout_url: payment.init_point,
    };
  }

  async handleWebhook(body: any) {
    console.log('Webhook recebido:', body);
    return { received: true };
  }
}
