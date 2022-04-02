import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import { CHANNELS } from "../constants/channels";
import { USERNAMES } from "../constants/usernames";
import { GET_LATEST_MESSAGES } from "../graphql/queries";
import { Message } from "../models/message";

export default function useChatApp() {
    const [username, setUsername] = useState(USERNAMES[0]);
    const [channel, setChannel] = useState(CHANNELS[0]);

    const handleUsernameChanged = useCallback((username: string) => {
        setUsername(username);
    }, []);

    const handleChannelChanged = useCallback((channel: string) => {
        setChannel(channel);
    }, []);

    return {
        username,
        channel,
        handleUsernameChanged,
        handleChannelChanged,
    }
}