import styled from "@emotion/styled"
import ChatInput from "./ChatInput"
import ChatMessage from "./ChatMessage"
import ArrowUp from '../icons/ArrowUp'
import ArrowDown from '../icons/ArrowDown'
import useChatPanel from "../hooks/useChatPanel"

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
    const {
        messages,
        fetchMoreMessages,
        postMessage,
    } = useChatPanel({ channel, username });

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