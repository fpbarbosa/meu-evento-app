import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsRepository {
  constructor(private prisma: PrismaService) {}

  //////////////////////////////////////////////////////
  // 🔹 CRIAR RESERVA
  //////////////////////////////////////////////////////
  create(data: any) {
    return this.prisma.booking.create({ data });
  }

  //////////////////////////////////////////////////////
  // 🔹 BUSCAR RESERVA POR ID
  //////////////////////////////////////////////////////
  findById(id: string) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: {
        product: true,
        user: true,
      },
    });
  }

  //////////////////////////////////////////////////////
  // 🔹 ATUALIZAR STATUS
  //////////////////////////////////////////////////////
  updateStatus(
    id: string,
    status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED',
  ) {
    return this.prisma.booking.update({
      where: { id },
      data: { status },
    });
  }

  //////////////////////////////////////////////////////
  // 🔥 NOVO - CANCELAMENTO COM MULTA
  //////////////////////////////////////////////////////
  updateWithCancellation(id: string, fee: number) {
    return this.prisma.booking.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        cancellation_fee: fee,
        cancelled_at: new Date(),
      },
    });
  }

  //////////////////////////////////////////////////////
  // 🔹 LISTAR RESERVAS DO FORNECEDOR
  //////////////////////////////////////////////////////
  findBySupplierId(supplierId: string) {
    return this.prisma.booking.findMany({
      where: {
        product: {
          supplier_id: supplierId,
        },
      },
      include: {
        product: true,
        user: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  //////////////////////////////////////////////////////
  // 🔹 VERIFICAR CONFLITO DE DATAS
  //////////////////////////////////////////////////////
  findOverlappingBookings(productId: string, start: Date, end: Date) {
    return this.prisma.booking.findMany({
      where: {
        product_id: productId,
        status: { in: ['PENDING', 'CONFIRMED'] },
        start_date: { lte: end },
        end_date: { gte: start },
      },
    });
  }
}
