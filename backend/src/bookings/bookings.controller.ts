import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private service: BookingsService) {}

  //////////////////////////////////////////////////////
  // 🔹 CLIENTE - Criar reserva
  //////////////////////////////////////////////////////
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @CurrentUser() user: { userId: string; role: string },
    @Body() data: CreateBookingDto,
  ) {
    return this.service.create(user.userId, data);
  }

  //////////////////////////////////////////////////////
  // 🔹 FORNECEDOR - Listar reservas dos seus produtos
  //////////////////////////////////////////////////////
  @UseGuards(AuthGuard('jwt'))
  @Get('supplier')
  listSupplierBookings(
    @CurrentUser() user: { userId: string; role: string },
  ) {
    return this.service.listSupplierBookings(user.userId);
  }

  //////////////////////////////////////////////////////
  // 🔹 FORNECEDOR - Aprovar reserva
  //////////////////////////////////////////////////////
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/approve')
  approve(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string; role: string },
  ) {
    return this.service.approveBooking(id, user.userId);
  }

  //////////////////////////////////////////////////////
  // 🔹 FORNECEDOR - Cancelar reserva
  //////////////////////////////////////////////////////
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id/cancel')
  cancel(
    @Param('id') id: string,
    @CurrentUser() user: { userId: string; role: string },
  ) {
    return this.service.cancelBooking(id, user.userId);
  }
}
