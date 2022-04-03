import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { chatApi } from "../api/chat-api"
import { Message, SendStatusEnum } from "../models/message"
import ChatInput from "./ChatInput"
import ChatMessage from "./ChatMessage"

const ChatContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

const ChatMessagesContainer = styled.div`
    height: 0;
    flex: 1 1 auto;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 1rem;
    padding-right: 1rem;
`

type ChatPanelProps = {
    channel: string;
    username: string;
}

export default function ChatPanel({ channel, username }: ChatPanelProps) {
    const [messages, setMessages] = useState<Message[]>([]);

    async function reloadMessages() {
        const messages = await chatApi.fetchLatestMessages(channel);
        if (messages) {
            setMessages(messages);
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
    }, [channel, username])

    return (
        <ChatContainer>
            <ChatMessagesContainer>
                {messages.map(msg => <ChatMessage key={msg.messageId} currentUserId={username} msg={msg} />)}
            </ChatMessagesContainer>
            <ChatInput onSubmitNewMessage={text => postMessage(text)} />
        </ChatContainer>
    )
}