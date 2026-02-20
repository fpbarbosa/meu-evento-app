import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { BookingsModule } from './bookings/bookings.module';
import { PaymentsModule } from './payments/payments.module';
import { SuppliersModule } from './suppliers/suppliers.module';

@Module({
  imports: [
    AuthModule,
    SuppliersModule,   // ✅ adicionamos aqui
    ProductsModule,
    BookingsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
