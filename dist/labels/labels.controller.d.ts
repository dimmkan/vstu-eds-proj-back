import { LabelsService } from './labels.service';
import { UsersLabelsEntity } from './labels.entity';
import { CreateUsersLabelsDto } from './dto/create.labels.dto';
import { UpdateUsersLabelsDto } from './dto/update.labels.dto';
import { DeleteResult } from 'typeorm';
export declare class LabelsController {
    private readonly labelsService;
    constructor(labelsService: LabelsService);
    getList(): Promise<UsersLabelsEntity[]>;
    getStatus(): Promise<boolean>;
    addLabels(newLabels: CreateUsersLabelsDto): Promise<UsersLabelsEntity>;
    updateLabels(updatedLabels: UpdateUsersLabelsDto): Promise<UsersLabelsEntity>;
    saveChanges(): Promise<void>;
    deleteLabels(id: number): Promise<DeleteResult>;
}
