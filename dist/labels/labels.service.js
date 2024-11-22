"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelsService = void 0;
const common_1 = require("@nestjs/common");
const labels_entity_1 = require("./labels.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const fs = require("fs");
const eds_entity_1 = require("../eds/eds.entity");
let LabelsService = class LabelsService {
    constructor(usersLabelsRepository, edsRepository) {
        this.usersLabelsRepository = usersLabelsRepository;
        this.edsRepository = edsRepository;
    }
    async getList() {
        return await this.usersLabelsRepository.find();
    }
    async addLabels(newLabelsDto) {
        const newLabels = new labels_entity_1.UsersLabelsEntity();
        Object.assign(newLabels, newLabelsDto);
        const result = await this.usersLabelsRepository.save(newLabels);
        return result;
    }
    async updateLabels(updatedLabels) {
        const labels = await this.usersLabelsRepository.findOne(updatedLabels.id);
        Object.assign(labels, updatedLabels);
        const result = await this.usersLabelsRepository.save(labels);
        return result;
    }
    async deleteLabels(id) {
        return await this.usersLabelsRepository.delete(id);
    }
    async createJobTrigger() {
        await this.usersLabelsRepository
            .createQueryBuilder()
            .update(labels_entity_1.UsersLabelsEntity)
            .set({
            flag: 0,
        })
            .execute();
        fs.writeFileSync('./trigger/.job_trigger', '');
    }
    async getStatus() {
        const result = await this.usersLabelsRepository.find({
            where: { flag: 1 },
        });
        return result.length ? true : false;
    }
    async getShowcaseData() {
        for (let i = 0; i < 1000000000; i++) {
        }
        const labels = await this.usersLabelsRepository.find();
        const result = await Promise.all(labels.map(async (item) => {
            return {
                key: item.id.toString(),
                data: {
                    user_name: item.user_name,
                    comp_name: item.comp_name,
                    org_name: '-',
                },
                children: await Promise.all(item.ids_array.map(async (id, idx) => {
                    const res = await this.edsRepository.findOne({ id }, { select: ['organization'] });
                    return {
                        key: `${item.id}-${idx}`,
                        data: {
                            user_name: item.user_name,
                            comp_name: item.comp_name,
                            org_name: res.organization,
                        },
                    };
                })),
            };
        }));
        return result;
    }
};
LabelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(labels_entity_1.UsersLabelsEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(eds_entity_1.EdsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LabelsService);
exports.LabelsService = LabelsService;
//# sourceMappingURL=labels.service.js.map