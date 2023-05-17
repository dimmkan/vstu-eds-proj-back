import { UsersLabelsEntity } from './labels.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUsersLabelsDto } from './dto/create.labels.dto';
import { UpdateUsersLabelsDto } from './dto/update.labels.dto';
export declare class LabelsService {
    private readonly usersLabelsRepository;
    constructor(usersLabelsRepository: Repository<UsersLabelsEntity>);
    getList(): Promise<UsersLabelsEntity[]>;
    addLabels(newLabelsDto: CreateUsersLabelsDto): Promise<UsersLabelsEntity>;
    updateLabels(updatedLabels: UpdateUsersLabelsDto): Promise<UsersLabelsEntity>;
    deleteLabels(id: number): Promise<DeleteResult>;
    getStatus(): boolean;
}
