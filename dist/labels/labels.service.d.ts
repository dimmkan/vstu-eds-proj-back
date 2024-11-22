import { UsersLabelsEntity } from './labels.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateUsersLabelsDto } from './dto/create.labels.dto';
import { UpdateUsersLabelsDto } from './dto/update.labels.dto';
import { ShowcaseLabelsDto } from './dto/showcase.labels.dto';
import { EdsEntity } from 'src/eds/eds.entity';
export declare class LabelsService {
    private readonly usersLabelsRepository;
    private readonly edsRepository;
    constructor(usersLabelsRepository: Repository<UsersLabelsEntity>, edsRepository: Repository<EdsEntity>);
    getList(): Promise<UsersLabelsEntity[]>;
    addLabels(newLabelsDto: CreateUsersLabelsDto): Promise<UsersLabelsEntity>;
    updateLabels(updatedLabels: UpdateUsersLabelsDto): Promise<UsersLabelsEntity>;
    deleteLabels(id: number): Promise<DeleteResult>;
    createJobTrigger(): Promise<void>;
    getStatus(): Promise<boolean>;
    getShowcaseData(): Promise<ShowcaseLabelsDto[]>;
}
