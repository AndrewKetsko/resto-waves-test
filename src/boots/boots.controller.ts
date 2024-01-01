import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Req,
} from '@nestjs/common';
import { BootsService } from './boots.service';
import { EditNameDto } from './dtos/editName.dto';
import { Request } from 'express';

@Controller('boots')
export class BootsController {
  constructor(private bootsService: BootsService) {}

  @Get()
  getAll() {
    return this.bootsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.bootsService.getOne(id);
  }

  @Get()
  getByDimension(@Query('dimension') dimension: string, @Req() req: Request) {
    console.log(req);
    return this.bootsService.getByDimension(dimension);
  }

  @Patch(':id')
  editName(@Param('id', ParseIntPipe) id: number, @Body() body: EditNameDto) {
    return this.bootsService.editName(id, body);
  }
}
