import { gql } from "@apollo/client";

export const POST_MESSAGE = gql`
mutation($channelId: ChannelId!, $userId: UserId!, $text: String!) {
    MessagePost(channelId: $channelId, userId: $userId, text: $text) {
        messageId
        text
        datetime
        userId
    }
}
`