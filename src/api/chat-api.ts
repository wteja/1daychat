import { apiClient } from ".";
import { POST_MESSAGE } from "../graphql/mutations";
import { GET_LATEST_MESSAGES, GET_MORE_MESSAGES } from "../graphql/queries";
import { Message } from "../models/message";

export const chatApi = {
    async fetchLatestMessages(channelId: string) {
        const result = await apiClient.query<{ MessagesFetchLatest: Message[]; }>({
            query: GET_LATEST_MESSAGES,
            variables: {
                channelId,
            },
            fetchPolicy: 'network-only'
        });
        return result.data.MessagesFetchLatest;
    },

    async getMoreMessages(channelId: string, messageId: string, old: boolean) {
        const result = await apiClient.query<{ MessagesFetchMore: Message[]; }>({
            query: GET_MORE_MESSAGES,
            variables: {
                channelId,
                messageId,
                old,
            },
            fetchPolicy: 'network-only'
        });
        return result.data.MessagesFetchMore;
    },

    async postMessage(channelId: string, userId: string, text: string) {
        const result = await apiClient.mutate<{ MessagePost: Message; }>({
            mutation: POST_MESSAGE,
            variables: {
                channelId,
                userId,
                text,
            },
            fetchPolicy: 'network-only'
        });
        return result.data?.MessagePost;
    }
}