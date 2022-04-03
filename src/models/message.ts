export enum SendStatusEnum {
    SENDING = 'sending',
    SENT = 'sent',
    ERROR = 'error',
}

export type Message = {
    messageId: string;
    userId: string;
    text: string;
    datetime: string;
    sendStatus?: SendStatusEnum;
}