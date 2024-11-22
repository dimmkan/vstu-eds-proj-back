import { ITelegramOptions } from '../telegram/telegram.interface';

export const getTelegramConfig = (): ITelegramOptions => {
  return {
    token: process.env.TELEGRAM_TOKEN,
    chatId: '-541340962',
  };
};
