import { Injectable } from '@nestjs/common';
import { UsersLabelsEntity } from './labels.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUsersLabelsDto } from './dto/create.labels.dto';
import { UpdateUsersLabelsDto } from './dto/update.labels.dto';
import * as fs from 'fs';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(UsersLabelsEntity)
    private readonly usersLabelsRepository: Repository<UsersLabelsEntity>,
  ) {}

  async getList(): Promise<UsersLabelsEntity[]> {
    return await this.usersLabelsRepository.find();
  }

  async addLabels(
    newLabelsDto: CreateUsersLabelsDto,
  ): Promise<UsersLabelsEntity> {
    const newLabels = new UsersLabelsEntity();
    Object.assign(newLabels, newLabelsDto);
    const result = await this.usersLabelsRepository.save(newLabels);
    fs.writeFileSync('.job_trigger', '');
    return result;
  }

  async updateLabels(
    updatedLabels: UpdateUsersLabelsDto,
  ): Promise<UsersLabelsEntity> {
    const labels = await this.usersLabelsRepository.findOne(updatedLabels.id);
    Object.assign(labels, updatedLabels);
    const result = await this.usersLabelsRepository.save(labels);
    fs.writeFileSync('.job_trigger', '');
    return result;
  }

  async deleteLabels(id: number): Promise<DeleteResult> {
    return await this.usersLabelsRepository.delete(id);
  }

  getStatus(): boolean {
    return fs.existsSync('.job_trigger');
  }
}
