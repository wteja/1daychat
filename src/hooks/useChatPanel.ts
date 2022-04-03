import { useEffect, useState } from "react";
import { chatApi } from "../api/chat-api";
import { Message, SendStatusEnum } from "../models/message";

type UseChatPanelProps = {
    channel: string;
    username: string;
}

export default function useChatPanel({
    channel,
    username,
}: UseChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([]);

    async function reloadMessages() {
        const messages = await chatApi.fetchLatestMessages(channel);
        if (messages) {
            setMessages(messages);
        }
    }

    async function fetchMoreMessages(old: boolean) {
        if (old) {
            const lastMessageId = messages.length ? messages[messages.length - 1].messageId : "";
            const moreMessages = await chatApi.fetchMoreMessages(channel, lastMessageId, true);
            setMessages([...messages, ...moreMessages]);
        } else {
            const firstMessageId = messages.length ? messages[0].messageId : "";
            const moreMessages = await chatApi.fetchMoreMessages(channel, firstMessageId, false);
            setMessages([...moreMessages, ...messages]);
        }
    }

    async function postMessage(text: string) {
        const pendingMessage: Message = {
            messageId: "",
            userId: username,
            text,
            datetime: new Date().toJSON(),
            sendStatus: SendStatusEnum.SENDING,
        }
        const newMessageArray = [pendingMessage, ...messages];
        setMessages(newMessageArray);

        try {
            const newMessage = await chatApi.postMessage(channel, username, text);
            if (newMessage) {
                newMessageArray[0].messageId = newMessage.messageId;
                newMessageArray[0].datetime = newMessage.datetime;
                newMessageArray[0].sendStatus = SendStatusEnum.SENT;
            }
        } catch (error) {
            newMessageArray[0].sendStatus = SendStatusEnum.ERROR;
        }
        setMessages([...newMessageArray]);
    }

    useEffect(() => {
        if (!!channel && !!username) {
            reloadMessages();
        }
    }, [channel, username]);

    return {
        messages,
        fetchMoreMessages,
        postMessage,
    }
}