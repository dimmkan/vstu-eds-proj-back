import { Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ITelegramOptions } from './telegram.interface';
import { getTelegramConfig } from '../config/telegram.config';

@Injectable()
export class TelegramService {
  bot: Telegraf;
  options: ITelegramOptions;

  constructor() {
    this.options = getTelegramConfig();
    this.bot = new Telegraf(this.options.token);
  }

  async sendMessage(message: string, chatId: string = this.options.chatId) {
    await this.bot.telegram.sendMessage(chatId, message, {
      parse_mode: 'HTML',
    });
  }
}
