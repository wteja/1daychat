import { useCallback, useState } from "react";
import { CHANNELS } from "../enum/channels";
import { USERNAMES } from "../enum/usernames";

export default function useChatApp() {
    const [username, setUsername] = useState(USERNAMES[0]);
    const [channel, setChannel] = useState(CHANNELS[0])

    const handleUsernameChanged = useCallback((username: string) => {
        setUsername(username);
    }, []);

    const handleChannelChanged = useCallback((channel: string) => {
        setChannel(channel);
    }, []);

    const postMessage = useCallback((message: string) => {
        console.log(`Username: ${username}`);
        console.log(`Channel: ${channel}`);
        console.log(`Message: ${message}`);
    }, []);

    const fetchLatestMessages = useCallback(() => {
        return [];
    }, []);

    const fetchMoreMessages = useCallback((channelId: string, messageId) => {
        return [];
    }, []);

    return {
        username,
        channel,
        handleUsernameChanged,
        handleChannelChanged,
        postMessage,
    }
}