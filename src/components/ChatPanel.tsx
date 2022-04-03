import styled from "@emotion/styled"
import { useEffect, useRef, useState } from "react"
import { chatApi } from "../api/chat-api"
import { Message, SendStatusEnum } from "../models/message"
import ChatInput from "./ChatInput"
import ChatMessage from "./ChatMessage"
import ArrowUp from '../icons/ArrowUp'
import ArrowDown from '../icons/ArrowDown'
import { css } from "@emotion/react"

const ChatContainer = styled.div`
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    padding: 1rem;
`

const ChatMessagesContainer = styled.div`
    height: 300px;
    flex: 1 1 auto;
    overflow-y: scroll;
    display: flex;
    flex-direction: column-reverse;
    width: 100%;
    padding-right: 1rem;

    @media screen and (min-width: 992px) {
        height: 0;
    }
`

const ReadMoreButton = styled.button`
    padding: 0.5rem 1rem;
    margin: 0.5rem 0;
    background-color: teal;
    color: white;
    border: 1px solid teal;
    border-radius: 0.25rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.25rem;
`

const NoMessageText = styled.div`
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
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
    }, [channel, username])

    return (
        <ChatContainer>
            <div>
                <ReadMoreButton onClick={() => fetchMoreMessages(true)}>
                    <span>Read More</span>
                    <ArrowUp />
                </ReadMoreButton>
            </div>
            <ChatMessagesContainer>
                {messages.length > 0 ? (
                    <>
                        {messages.map(msg => <ChatMessage key={msg.messageId} currentUserId={username} msg={msg} />)}
                    </>
                ) : (
                    <NoMessageText>There is no any messages here, let start the discussion!</NoMessageText>
                )}
            </ChatMessagesContainer>
            <div>
                <ReadMoreButton onClick={() => fetchMoreMessages(false)}>
                    <span>Read More</span>
                    <ArrowDown />
                </ReadMoreButton>
            </div>
            <ChatInput onSubmitNewMessage={text => postMessage(text)} />
        </ChatContainer>
    )
}