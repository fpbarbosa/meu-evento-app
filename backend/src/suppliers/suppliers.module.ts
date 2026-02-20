import { Module } from '@nestjs/common';
import { SuppliersController } from './suppliers.controller';
import { SuppliersService } from './suppliers.service';
import { SuppliersRepository } from './suppliers.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SuppliersController],
  providers: [SuppliersService, SuppliersRepository, PrismaService],
  exports: [SuppliersRepository],
})
export class SuppliersModule {}
