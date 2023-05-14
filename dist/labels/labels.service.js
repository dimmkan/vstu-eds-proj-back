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
let LabelsService = class LabelsService {
    constructor(usersLabelsRepository) {
        this.usersLabelsRepository = usersLabelsRepository;
    }
    async getList() {
        return await this.usersLabelsRepository.find();
    }
    async addLabels(newLabelsDto) {
        const newLabels = new labels_entity_1.UsersLabelsEntity();
        Object.assign(newLabels, newLabelsDto);
        return await this.usersLabelsRepository.save(newLabels);
    }
    async updateLabels(updatedLabels) {
        const labels = await this.usersLabelsRepository.findOne(updatedLabels.id);
        Object.assign(labels, updatedLabels);
        return await this.usersLabelsRepository.save(labels);
    }
    async deleteLabels(id) {
        return await this.usersLabelsRepository.delete(id);
    }
};
LabelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(labels_entity_1.UsersLabelsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LabelsService);
exports.LabelsService = LabelsService;
//# sourceMappingURL=labels.service.js.map