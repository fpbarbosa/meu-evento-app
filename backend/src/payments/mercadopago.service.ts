import { Injectable } from '@nestjs/common';
import MercadoPagoConfig, { Preference } from 'mercadopago';

@Injectable()
export class MercadoPagoService {
  private client: MercadoPagoConfig;

  constructor() {
    this.client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN!,
    });
  }

  async createPaymentPreference(booking: any) {
    const preference = new Preference(this.client);

    const response = await preference.create({
      body: {
        items: [
          {
            id: booking.id,
            title: `Reserva - ${booking.product.name}`,
            quantity: 1,
            unit_price: Number(booking.total_price),
          },
        ],

        back_urls: {
          success:
            'https://peppiest-disbelievingly-lucien.ngrok-free.dev/payments/success',
          failure:
            'https://peppiest-disbelievingly-lucien.ngrok-free.dev/payments/failure',
          pending:
            'https://peppiest-disbelievingly-lucien.ngrok-free.dev/payments/pending',
        },

        auto_return: 'approved',

        notification_url:
          'https://peppiest-disbelievingly-lucien.ngrok-free.dev/payments/webhook',

        external_reference: booking.id,
      },
    });

    return response;
  }
}
