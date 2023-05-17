import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { UsersLabelsEntity } from './labels.entity';
import { CreateUsersLabelsDto } from './dto/create.labels.dto';
import { UpdateUsersLabelsDto } from './dto/update.labels.dto';
import { DeleteResult } from 'typeorm';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get()
  async getList(): Promise<UsersLabelsEntity[]> {
    return await this.labelsService.getList();
  }

  @Get('status')
  getStatus(): boolean {
    return this.labelsService.getStatus();
  }

  @Post('add')
  async addLabels(
    @Body() newLabels: CreateUsersLabelsDto,
  ): Promise<UsersLabelsEntity> {
    return await this.labelsService.addLabels(newLabels);
  }

  @Post('update')
  async updateLabels(
    @Body() updatedLabels: UpdateUsersLabelsDto,
  ): Promise<UsersLabelsEntity> {
    return await this.labelsService.updateLabels(updatedLabels);
  }

  @Delete('delete/:id')
  async deleteLabels(@Param('id') id: number): Promise<DeleteResult> {
    return await this.labelsService.deleteLabels(id);
  }
}
