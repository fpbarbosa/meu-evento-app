import { Injectable, ForbiddenException } from '@nestjs/common';
import { SuppliersRepository } from './suppliers.repository';

@Injectable()
export class SuppliersService {
  constructor(private repo: SuppliersRepository) {}

  async create(userId: string, description: string) {
    const exists = await this.repo.findByUserId(userId);

    if (exists) {
      throw new ForbiddenException('Supplier já existe');
    }

    return this.repo.create({
      user_id: userId,
      description,
      rating: 0,
      status: 'APPROVED',
    });
  }

  findAll() {
    return this.repo.findAll();
  }
}
