import {ITelegramOptions} from "../telegram/telegram.interface";

export const getTelegramConfig = (): ITelegramOptions => {
    return {
      token:'Telegram token here',
      chatId: '-541340962'
    };
}