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
exports.EdsService = void 0;
const common_1 = require("@nestjs/common");
const telegram_service_1 = require("../telegram/telegram.service");
const mailer_1 = require("@nestjs-modules/mailer");
const typeorm_1 = require("@nestjs/typeorm");
const eds_entity_1 = require("./eds.entity");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
let EdsService = class EdsService {
    constructor(telegramService, mailerService, edsRepository) {
        this.telegramService = telegramService;
        this.mailerService = mailerService;
        this.edsRepository = edsRepository;
    }
    async getAllEds() {
        return await this.edsRepository.find();
    }
    async addEds(createEdsDto) {
        const newEds = new eds_entity_1.EdsEntity();
        Object.assign(newEds, createEdsDto);
        return await this.edsRepository.save(newEds);
    }
    async updateEds(updateEdsDto, id) {
        const eds = await this.edsRepository.findOne(id);
        Object.assign(eds, updateEdsDto);
        return await this.edsRepository.save(eds);
    }
    async deleteEds(id) {
        return await this.edsRepository.delete(id);
    }
    async getFileById(id) {
        return await this.edsRepository.findOne({ id }, { select: ['fileData', 'fileName', 'fileType', 'fileSize'] });
    }
    async addFile(file, id) {
        const eds = await this.edsRepository.findOne(id);
        eds.fileData = file.buffer.toString('base64');
        eds.fileName = file.originalname;
        eds.fileType = file.mimetype;
        eds.fileSize = file.size;
        await this.edsRepository.save(eds);
    }
    async deleteFile(id) {
        const eds = await this.edsRepository.findOne(id);
        eds.fileData = null;
        eds.fileName = null;
        eds.fileType = null;
        eds.fileSize = null;
        await this.edsRepository.save(eds);
    }
    async cronEds30() {
        const result = await (0, typeorm_2.getRepository)(eds_entity_1.EdsEntity)
            .createQueryBuilder('eds')
            .where('TIMESTAMPDIFF(DAY, NOW(), `toDate`) < 30 AND TIMESTAMPDIFF(DAY, NOW(), `toDate`) > 13')
            .getMany();
        result.sort((a, b) => {
            const aDate = new Date(a.toDate);
            const bDate = new Date(b.toDate);
            return aDate.getTime() - bDate.getTime();
        });
        let emailRows = '';
        for (const element of result) {
            const time = new Date(element['toDate']);
            const dateNow = new Date();
            const interval = Math.ceil((time.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24));
            const formatTime = time.toLocaleDateString();
            const org = element['organization'];
            const cert = element['certificateSerial'];
            emailRows += `<tr><td>${org}</td><td>${cert}</td><td>${formatTime}</td><td>${interval} дней</td></tr>`;
            const tgMessage = '<b>' +
                `Заканчивается сертификат эцп! (осталось ${interval} дней)` +
                '</b>' +
                `\n Организация: ${org} \n Сер. номер: ${cert} \n Дата окончания: ${formatTime}`;
            await this.telegramService.sendMessage(tgMessage);
        }
        if (emailRows !== '') {
            const table = `<table border='1'><tr><th><b>Организация</b></th><th><b>Серийный номер</b></th><th><b>Дата окончания</b></th><th><b>Осталось дней</b></th></tr>${emailRows}</table>`;
            const message = `
            <html>
                <head>
                    <title>Заканчиваются сертификаты эцп</title>
                </head>
                <body>
                    ${table}
                </body>
            </html>`;
            this.mailerService.sendMail({
                to: 'd.kanaev@vyborstroi.ru, m.grachev@vyborstroi.ru',
                subject: 'Заканчивается срок действия ЭЦП (менее 30 дней)',
                html: message,
            });
        }
    }
    async cronEds14() {
        const result = await (0, typeorm_2.getRepository)(eds_entity_1.EdsEntity)
            .createQueryBuilder('eds')
            .where('TIMESTAMPDIFF(DAY, NOW(), `toDate`) < 14')
            .getMany();
        result.sort((a, b) => {
            const aDate = new Date(a.toDate);
            const bDate = new Date(b.toDate);
            return aDate.getTime() - bDate.getTime();
        });
        let emailRows = '';
        for (const element of result) {
            const time = new Date(element['toDate']);
            const dateNow = new Date();
            const interval = Math.ceil((time.getTime() - dateNow.getTime()) / (1000 * 60 * 60 * 24));
            const formatTime = time.toLocaleDateString();
            const org = element['organization'];
            const cert = element['certificateSerial'];
            emailRows += `<tr><td>${org}</td><td>${cert}</td><td>${formatTime}</td><td>${interval} дней</td></tr>`;
            const tgMessage = '<b>' +
                `Заканчивается сертификат эцп! (осталось ${interval} дней)` +
                '</b>' +
                `\n Организация: ${org} \n Сер. номер: ${cert} \n Дата окончания: ${formatTime}`;
            await this.telegramService.sendMessage(tgMessage);
        }
        if (emailRows !== '') {
            const table = `<table border='1'><tr><th><b>Организация</b></th><th><b>Серийный номер</b></th><th><b>Дата окончания</b></th><th><b>Осталось дней</b></th></tr>${emailRows}</table>`;
            const message = `
            <html>
                <head>
                    <title>Заканчиваются сертификаты эцп</title>
                </head>
                <body>
                    ${table}
                </body>
            </html>`;
            this.mailerService.sendMail({
                to: 'd.kanaev@vyborstroi.ru, m.grachev@vyborstroi.ru',
                subject: 'Заканчивается срок действия ЭЦП (менее 14 дней)',
                html: message,
            });
        }
    }
    async addOpenPartFile(file, id) {
        const eds = await this.edsRepository.findOne(id);
        eds.openPartFileData = file.buffer.toString('base64');
        eds.openPartFileName = file.originalname;
        eds.openPartFileType = file.mimetype;
        eds.openPartFileSize = file.size;
        await this.edsRepository.save(eds);
    }
    async deleteOpenPartFile(id) {
        const eds = await this.edsRepository.findOne(id);
        eds.openPartFileData = null;
        eds.openPartFileName = null;
        eds.openPartFileType = null;
        eds.openPartFileSize = null;
        await this.edsRepository.save(eds);
    }
    async getOpenPartFileById(id) {
        return await this.edsRepository.findOne({ id }, {
            select: [
                'openPartFileData',
                'openPartFileName',
                'openPartFileType',
                'openPartFileSize',
            ],
        });
    }
};
__decorate([
    (0, schedule_1.Cron)('1 10 * * 1,2,3,4,5'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EdsService.prototype, "cronEds30", null);
__decorate([
    (0, schedule_1.Cron)('0 10,17 * * 1,2,3,4,5'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EdsService.prototype, "cronEds14", null);
EdsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(eds_entity_1.EdsEntity)),
    __metadata("design:paramtypes", [telegram_service_1.TelegramService,
        mailer_1.MailerService,
        typeorm_2.Repository])
], EdsService);
exports.EdsService = EdsService;
//# sourceMappingURL=eds.service.js.map