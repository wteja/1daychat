import Head from 'next/head';
import { useCallback, useEffect } from 'react';
import useChatApp from '../hooks/useChatApp';
import AppContainer from './AppContainer';
import AppLayout from './AppLayout';
import AppTitle from './AppTitle';
import ChatPanel from './ChatPanel';
import Sidebar from './Sidebar';

function ChatApp() {
    const {
        username,
        channel,
        handleUsernameChanged,
        handleChannelChanged,
    } = useChatApp();

    return (
        <AppContainer>
            <Head>
                <title>{process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>
            <AppTitle>{process.env.NEXT_PUBLIC_APP_NAME}</AppTitle>
            <p>All messages will be deleted at every 00:00 UTC</p>
            <AppLayout>
                <Sidebar
                    selectedUsername={username}
                    selectedChannel={channel}
                    onUsernameChanged={handleUsernameChanged}
                    onChannelChanged={handleChannelChanged}
                />
                <ChatPanel channel={channel} username={username} />
            </AppLayout>
        </AppContainer>
    )
}

export default ChatApp;