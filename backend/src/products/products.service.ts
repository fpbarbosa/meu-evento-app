import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { SuppliersRepository } from '../suppliers/suppliers.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    private repo: ProductsRepository,
    private suppliersRepository: SuppliersRepository,
  ) {}

  // 🔐 Criação segura vinculada ao supplier logado
  async create(userId: string, data: CreateProductDto) {
    const supplier = await this.suppliersRepository.findByUserId(userId);

    if (!supplier) {
      throw new ForbiddenException(
        'Fornecedor não autorizado ou não aprovado',
      );
    }

    return this.repo.create({
      ...data,
      supplier_id: supplier.id,
    });
  }

  async findAll() {
    return this.repo.findAll();
  }

  async findOne(id: string) {
    const product = await this.repo.findById(id);

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async update(id: string, userId: string, data: UpdateProductDto) {
    const product = await this.findOne(id);

    const supplier = await this.suppliersRepository.findByUserId(userId);

    if (!supplier || product.supplier_id !== supplier.id) {
      throw new ForbiddenException(
        'Você não tem permissão para alterar este produto',
      );
    }

    return this.repo.update(id, data);
  }

  async remove(id: string, userId: string) {
    const product = await this.findOne(id);

    const supplier = await this.suppliersRepository.findByUserId(userId);

    if (!supplier || product.supplier_id !== supplier.id) {
      throw new ForbiddenException(
        'Você não tem permissão para remover este produto',
      );
    }

    return this.repo.softDelete(id);
  }
}
