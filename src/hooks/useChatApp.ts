import { useState } from "react";
import { CHANNELS } from "../constants/channels";
import { USERNAMES } from "../constants/usernames";

export default function useChatApp() {
    const [username, setUsername] = useState(USERNAMES[0]);
    const [channel, setChannel] = useState(CHANNELS[0]);

    function handleUsernameChanged(username: string) {
        setUsername(username);
    };

    function handleChannelChanged(channel: string) {
        setChannel(channel);
    };

    return {
        username,
        channel,
        handleUsernameChanged,
        handleChannelChanged,
    }
}