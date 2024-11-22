import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LabelsService } from './labels.service';
import { UsersLabelsEntity } from './labels.entity';
import { CreateUsersLabelsDto } from './dto/create.labels.dto';
import { UpdateUsersLabelsDto } from './dto/update.labels.dto';
import { DeleteResult } from 'typeorm';
import { ShowcaseLabelsDto } from './dto/showcase.labels.dto';

@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Get()
  async getList(): Promise<UsersLabelsEntity[]> {
    return await this.labelsService.getList();
  }

  @Get('status')
  async getStatus(): Promise<boolean> {
    return await this.labelsService.getStatus();
  }

  @Get('showcase')
  async getShowcaseData(): Promise<ShowcaseLabelsDto[]> {
    //Promise<ShowcaseLabelsDto[]>
    return await this.labelsService.getShowcaseData();
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

  @Post('savechanges')
  async saveChanges(): Promise<void> {
    return await this.labelsService.createJobTrigger();
  }

  @Delete('delete/:id')
  async deleteLabels(@Param('id') id: number): Promise<DeleteResult> {
    return await this.labelsService.deleteLabels(id);
  }
}
