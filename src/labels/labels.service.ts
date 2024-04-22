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
    return result;
  }

  async updateLabels(
    updatedLabels: UpdateUsersLabelsDto,
  ): Promise<UsersLabelsEntity> {
    const labels = await this.usersLabelsRepository.findOne(updatedLabels.id);
    Object.assign(labels, updatedLabels);
    const result = await this.usersLabelsRepository.save(labels);
    return result;
  }

  async deleteLabels(id: number): Promise<DeleteResult> {
    return await this.usersLabelsRepository.delete(id);
  }

  async createJobTrigger(): Promise<void> {
    await this.usersLabelsRepository
      .createQueryBuilder()
      .update(UsersLabelsEntity)
      .set({
        flag: 0,
      })
      .execute();
    fs.writeFileSync('../trigger/.job_trigger', '');
  }

  async getStatus(): Promise<boolean> {
    const result = await this.usersLabelsRepository.find({
      where: { flag: 1 },
    });
    return result.length ? true : false;
  }
}
