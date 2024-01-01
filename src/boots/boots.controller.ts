import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { BootsService } from './boots.service';
import { EditNameDto } from './dtos/editName.dto';

@Controller('boots')
export class BootsController {
  constructor(private bootsService: BootsService) {}

  @Get()
  getAll() {
    return this.bootsService.getAll();
  }

  @Get('/dimension')
  getByDimension(@Query('dimension', ParseIntPipe) dimension: number) {
    return this.bootsService.getByDimension(dimension);
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.bootsService.getOne(id);
  }

  @Patch(':id')
  editName(@Param('id', ParseIntPipe) id: number, @Body() body: EditNameDto) {
    return this.bootsService.editName(id, body);
  }
}
