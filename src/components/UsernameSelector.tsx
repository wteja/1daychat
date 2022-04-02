import styled from "@emotion/styled";
import { ChangeEvent, useCallback } from "react";
import { USERNAMES } from "../constants/usernames";

const StyledUsernameSelector = styled.div`
    margin-bottom: 2rem;
`

const StyledSelect = styled.select`
    padding: 0.85rem;
    width: 100%;
    font-size: 1rem;
    outline: 'none';
    border-radius: 0.25rem;
`

interface IUsernameSelectorProps {
    selectedUsername: string;
    onUsernameChanged: (username: string) => void;
}

export default function UsernameSelector({ selectedUsername, onUsernameChanged }: IUsernameSelectorProps) {
    const handleUsernameChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const username = e.target.value;
        onUsernameChanged(username);
    }, []);

    return (
        <StyledUsernameSelector>
            <StyledSelect onChange={handleUsernameChange} defaultValue={selectedUsername}>
                {USERNAMES.map(username => (
                    <option key={username} value={username}>{username}</option>
                ))}
            </StyledSelect>
        </StyledUsernameSelector>
    )
}