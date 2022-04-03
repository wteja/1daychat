import styled from "@emotion/styled";
import { useCallback } from "react";
import { CHANNELS } from "../constants/channels";

const StyledListItem = styled.li<{ active: boolean; }>`
    padding: 1rem;
    background-color: ${props => props.active ? 'white' : 'transparent'};
    cursor: pointer;
    border-radius: 0.25rem;
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.active ? 'black' : 'transparent'};
    margin-top: 0.5rem;
`

type ChannelSelectorProps = {
    selectedChannel: string;
    onChannelChanged: (channel: string) => void;
}

export default function ChannelSelector({ onChannelChanged, selectedChannel }: ChannelSelectorProps) {
    const handleClickChannel = useCallback((channel: string) => {
        onChannelChanged(channel);
    }, []);

    return (
        <ul>
            {CHANNELS.map(channel => (
                <StyledListItem key={channel} active={selectedChannel === channel} onClick={() => handleClickChannel(channel)}>{channel}</StyledListItem>
            ))}
        </ul>
    )
}