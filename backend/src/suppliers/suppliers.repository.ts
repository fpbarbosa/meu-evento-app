import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SuppliersRepository {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.supplier.create({ data });
  }

  findByUserId(userId: string) {
    return this.prisma.supplier.findUnique({
      where: { user_id: userId },
    });
  }

  findAll() {
    return this.prisma.supplier.findMany();
  }
}
