import styled from "@emotion/styled";
import ChannelSelector from "./ChannelSelector";
import UsernameSelector from "./UsernameSelector";

const StyledSidebar = styled.aside`
    padding: 0 1rem 1rem;
    width: 100%;
    overflow-y: scroll;
    box-sizing: border-box;

    @media screen and (min-width: 992px) {
        width: 28%;
    }
`

const SelectorTopic = styled.div`
    margin: 1rem 0;
`

interface ISidebarProps {
    onUsernameChanged: (username: string) => void;
    onChannelChanged: (channel: string) => void;
    selectedUsername: string;
    selectedChannel: string;
}

export default function Sidebar({ onUsernameChanged, onChannelChanged, selectedChannel, selectedUsername }: ISidebarProps) {
    return (
        <StyledSidebar>
            <SelectorTopic>1. Choose your username</SelectorTopic>
            <UsernameSelector selectedUsername={selectedUsername} onUsernameChanged={onUsernameChanged} />

            <SelectorTopic>2. Choose your channel</SelectorTopic>
            <ChannelSelector selectedChannel={selectedChannel} onChannelChanged={onChannelChanged} />
        </StyledSidebar>
    )
}