import { Module } from '@nestjs/common';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersLabelsEntity } from './labels.entity';
import { EdsEntity } from 'src/eds/eds.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersLabelsEntity, EdsEntity])],
  controllers: [LabelsController],
  providers: [LabelsService],
})
export class LabelsModule {}
