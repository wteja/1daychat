import styled from "@emotion/styled"
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { chatApi } from "../api/chat-api"
import { Message, SendStatusEnum } from "../models/message"

const ChatContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

const ChatMessagesContainer = styled.div`
    width: 100%;
    flex: 1 1 auto;
    overflow-y: scroll;
`

const ChatMessageBox = styled.div`
    display: flex;
`

const ChatInputContainer = styled.div`
    width: 100%;
`

const ChatInput = styled.textarea`
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    height: 5rem;
    outline: none;
    resize: none;
    border-radius: 0.25rem;
`

const PostButton = styled.button`
    padding: 1rem;
    margin-top: 0.5rem;
`

const InputNote = styled.div`
    font-size: 0.75rem;
    margin-top: 0.5rem;
`

type IChatPanelProps = {
    channel: string;
    username: string;
}

export default function ChatPanel({ channel, username }: IChatPanelProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    function captureMessage() {
        if (inputRef.current) {
            const text = (inputRef.current.value || "").trim();
            if (text) {
                postMessage(text);
            }
            inputRef.current.value = "";
            inputRef.current.focus();
        }
    }

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        captureMessage();
    }

    function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
        if (formRef.current && e.shiftKey && e.key === "Enter") {
            captureMessage();
            e.preventDefault();
        }
    }

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
            datetime: new Date(),
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
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef.current]);

    useEffect(() => {
        if (!!channel && !!username) {
            reloadMessages();
        }
    }, [channel, username])

    return (
        <ChatContainer>
            <ChatMessagesContainer>
                {messages.map(msg => (
                    <ChatMessageBox>{msg.text}</ChatMessageBox>
                ))}
            </ChatMessagesContainer>
            <ChatInputContainer>
                <form onSubmit={handleOnSubmit} ref={formRef}>
                    <ChatInput ref={inputRef} onKeyDown={handleKeyDown} disabled={isLoading} />
                    <PostButton type="submit" disabled={isLoading}>Post Message</PostButton>
                    <InputNote>Press Shift + Enter for quickly post message</InputNote>
                </form>
            </ChatInputContainer>
        </ChatContainer>
    )
}