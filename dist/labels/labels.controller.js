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
exports.LabelsController = void 0;
const common_1 = require("@nestjs/common");
const labels_service_1 = require("./labels.service");
const create_labels_dto_1 = require("./dto/create.labels.dto");
const update_labels_dto_1 = require("./dto/update.labels.dto");
let LabelsController = class LabelsController {
    constructor(labelsService) {
        this.labelsService = labelsService;
    }
    async getList() {
        return await this.labelsService.getList();
    }
    getStatus() {
        return this.labelsService.getStatus();
    }
    async addLabels(newLabels) {
        return await this.labelsService.addLabels(newLabels);
    }
    async updateLabels(updatedLabels) {
        return await this.labelsService.updateLabels(updatedLabels);
    }
    async deleteLabels(id) {
        return await this.labelsService.deleteLabels(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "getList", null);
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], LabelsController.prototype, "getStatus", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_labels_dto_1.CreateUsersLabelsDto]),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "addLabels", null);
__decorate([
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_labels_dto_1.UpdateUsersLabelsDto]),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "updateLabels", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], LabelsController.prototype, "deleteLabels", null);
LabelsController = __decorate([
    (0, common_1.Controller)('labels'),
    __metadata("design:paramtypes", [labels_service_1.LabelsService])
], LabelsController);
exports.LabelsController = LabelsController;
//# sourceMappingURL=labels.controller.js.map