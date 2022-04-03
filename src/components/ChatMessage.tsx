import { Message, SendStatusEnum } from "../models/message";
import styled from '@emotion/styled';
import Check from "../icons/Check";
import Cross from "../icons/Check";
import { getTime } from '../utils/date';

const ChatMessageContainer = styled.div((props: { me: boolean }) => ({
    display: 'flex',
    alignSelf: props.me ? 'end' : 'start',
    flexDirection: props.me ? 'row-reverse' : 'row',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem',
}))

const Avartar = styled.img`
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
`

const ChatBox = styled.div((props: { me: boolean; }) => {
    const direction = props.me ? 'right' : 'left';
    const inverseDirection = props.me ? 'left' : 'right';

    return `
    background: white;
    padding: 1rem;
    position: relative;
    margin-${direction}: 0.75rem;
    border-radius: 0.25rem;

    &::after {
        content: '';
        display: block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        ${direction}: -1rem;
        width: 0;
        height: 0;
        border-color: transparent;
        border-${inverseDirection}-color: white;
        border-style: solid;
        border-width: 0.5rem;
    }
`
})

const ChatTime = styled.div`
    font-size: 0.75rem;
`

const ChatSendStatus = styled.div`
    display: flex;
    align-items: center;
    font-size: 0.75rem;
    gap: 0.25rem;
`

type ChatMessageProps = {
    msg: Message;
    currentUserId: string;
}

function ChatMessage({ msg, currentUserId }: ChatMessageProps) {
    return (
        <ChatMessageContainer me={msg.userId === currentUserId}>
            <Avartar src={`assets/${msg.userId}.png`} />
            <ChatBox me={msg.userId === currentUserId}>{msg.text}</ChatBox>
            <ChatTime>{getTime(msg.datetime)}</ChatTime>
            {msg.sendStatus && msg.sendStatus !== SendStatusEnum.SENDING && (
                <ChatSendStatus>
                    {msg.sendStatus === SendStatusEnum.SENT ? <Check /> : <Cross />}
                    <span>{msg.sendStatus}</span>
                </ChatSendStatus>)}
        </ChatMessageContainer>
    )
}

export default ChatMessage;