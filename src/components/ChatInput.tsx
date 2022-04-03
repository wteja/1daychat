import styled from "@emotion/styled"
import { FormEvent, KeyboardEvent, useEffect, useRef } from "react"

const ChatInputContainer = styled.div`
    width: 100%;
`

const ChatTextArea = styled.textarea`
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
    height: 5rem;
    outline: none;
    resize: none;
    border-radius: 0.25rem;
`

const PostButton = styled.button`
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    background-color: teal;
    color: white;
    border: 1px solid teal;
    border-radius: 0.25rem;
    cursor: pointer;
`

const InputNote = styled.div`
    font-size: 0.75rem;
    margin-top: 0.5rem;
`

type ChatInputProps = {
    onSubmitNewMessage: (text: string) => void;
}

function ChatInput({ onSubmitNewMessage }: ChatInputProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    function captureMessage() {
        if (inputRef.current) {
            const text = (inputRef.current.value || "").trim();
            if (text) {
                onSubmitNewMessage(text);
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

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef.current]);
    
    return (
        <ChatInputContainer>
            <form onSubmit={handleOnSubmit} ref={formRef}>
                <ChatTextArea ref={inputRef} onKeyDown={handleKeyDown} />
                <PostButton type="submit">Post Message</PostButton>
                <InputNote>Press Shift + Enter for quickly post message</InputNote>
            </form>
        </ChatInputContainer>
    )
}

export default ChatInput;