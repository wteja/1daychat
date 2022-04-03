import styled from "@emotion/styled";
import { useCallback } from "react";
import { CHANNELS } from "../constants/channels";

const StyledListItem = styled.li((props: { active: boolean; }) => ({
    padding: `1rem`,
    backgroundColor: props.active ? 'white' : 'transparent',
    cursor: 'pointer',
    borderRadius: '0.25rem',
    borderWidth: '1px ',
    borderStyle: 'solid',
    borderColor: props.active ? 'black' : 'transparent',
    marginTop: '0.5rem',
}))

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