import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
  return this.prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      category: data.category,
      quantity: data.quantity,
      supplier_id: data.supplier_id,

      // 🔥 mapeamento correto
      price_per_day: data.pricePerDay,
    },
  });
}

  findAll() {
    return this.prisma.product.findMany({
      where: { deleted_at: null },
    });
  }

  findById(id: string) {
    return this.prisma.product.findFirst({
      where: { id, deleted_at: null },
    });
  }

  update(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  softDelete(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
  }
}
