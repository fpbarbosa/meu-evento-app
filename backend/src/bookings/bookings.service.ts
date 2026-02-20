import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { ProductsRepository } from '../products/products.repository';
import { BookingsRepository } from './bookings.repository';
import { SuppliersRepository } from '../suppliers/suppliers.repository';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(
    private productsRepository: ProductsRepository,
    private bookingsRepository: BookingsRepository,
    private suppliersRepository: SuppliersRepository,
  ) {}

  //////////////////////////////////////////////////////
  // 🔹 CLIENTE - CRIAR RESERVA
  //////////////////////////////////////////////////////
  async create(userId: string, data: CreateBookingDto) {
    const product = await this.productsRepository.findById(data.productId);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const start = new Date(data.startDate);
    const end = new Date(data.endDate);

    if (end <= start) {
      throw new BadRequestException('Data final inválida');
    }

    const overlappingBookings =
      await this.bookingsRepository.findOverlappingBookings(
        data.productId,
        start,
        end,
      );

    const reservedQuantity = overlappingBookings.reduce(
      (sum, booking) => sum + booking.quantity,
      0,
    );

    const availableQuantity = product.quantity - reservedQuantity;

    if (data.quantity > availableQuantity) {
      throw new BadRequestException(
        `Quantidade indisponível. Disponível: ${availableQuantity}`,
      );
    }

    const diffTime = end.getTime() - start.getTime();
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      throw new BadRequestException('Período inválido');
    }

    const totalPrice =
      days * Number(product.price_per_day) * data.quantity;

    return this.bookingsRepository.create({
      user_id: userId,
      product_id: data.productId,
      quantity: data.quantity,
      start_date: start,
      end_date: end,
      total_price: totalPrice,
      status: 'PENDING',
    });
  }

  //////////////////////////////////////////////////////
  // 🔹 FORNECEDOR - LISTAR RESERVAS
  //////////////////////////////////////////////////////
  async listSupplierBookings(userId: string) {
    const supplier = await this.suppliersRepository.findByUserId(userId);

    if (!supplier) {
      throw new ForbiddenException('Fornecedor não autorizado');
    }

    return this.bookingsRepository.findBySupplierId(supplier.id);
  }

  //////////////////////////////////////////////////////
  // 🔹 FORNECEDOR - APROVAR RESERVA
  //////////////////////////////////////////////////////
  async approveBooking(bookingId: string, userId: string) {
    const supplier = await this.suppliersRepository.findByUserId(userId);

    if (!supplier) {
      throw new ForbiddenException('Fornecedor não autorizado');
    }

    const booking = await this.bookingsRepository.findById(bookingId);

    if (!booking) {
      throw new NotFoundException('Reserva não encontrada');
    }

    if (booking.product.supplier_id !== supplier.id) {
      throw new ForbiddenException(
        'Você não pode aprovar reservas de outro fornecedor',
      );
    }

    if (booking.status !== 'PENDING') {
      throw new BadRequestException('Reserva já processada');
    }

    return this.bookingsRepository.updateStatus(
      bookingId,
      'CONFIRMED',
    );
  }

  //////////////////////////////////////////////////////
  // 🔹 FORNECEDOR - CANCELAR RESERVA
  //////////////////////////////////////////////////////
  async cancelBooking(bookingId: string, userId: string) {
    const supplier = await this.suppliersRepository.findByUserId(userId);

    if (!supplier) {
      throw new ForbiddenException('Fornecedor não autorizado');
    }

    const booking = await this.bookingsRepository.findById(bookingId);

    if (!booking) {
      throw new NotFoundException('Reserva não encontrada');
    }

    if (booking.product.supplier_id !== supplier.id) {
      throw new ForbiddenException(
        'Você não pode cancelar reservas de outro fornecedor',
      );
    }

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Reserva já cancelada');
    }

    return this.bookingsRepository.updateStatus(
      bookingId,
      'CANCELLED',
    );
  }

  //////////////////////////////////////////////////////
  // 🔹 CLIENTE - CANCELAR COM MULTA AUTOMÁTICA
  //////////////////////////////////////////////////////
  async cancelByClient(bookingId: string, userId: string) {
    const booking = await this.bookingsRepository.findById(bookingId);

    if (!booking) {
      throw new NotFoundException('Reserva não encontrada');
    }

    if (booking.user_id !== userId) {
      throw new ForbiddenException(
        'Você não pode cancelar a reserva de outro usuário',
      );
    }

    if (booking.status === 'CANCELLED') {
      throw new BadRequestException('Reserva já cancelada');
    }

    if (booking.status === 'COMPLETED') {
      throw new BadRequestException(
        'Não é possível cancelar reserva concluída',
      );
    }

    const now = new Date();
    const startDate = new Date(booking.start_date);

    const diffHours =
      (startDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    let cancellationFee = 0;

    if (diffHours < 0) {
      // Evento já começou
      cancellationFee = Number(booking.total_price);
    } else if (diffHours <= 48) {
      // Menos de 48h → 30% de multa
      cancellationFee = Number(booking.total_price) * 0.3;
    } else {
      // Mais de 48h → sem multa
      cancellationFee = 0;
    }

    return this.bookingsRepository.updateWithCancellation(
      bookingId,
      cancellationFee,
    );
  }
}
