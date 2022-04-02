import { gql } from "@apollo/client";

export const GET_LATEST_MESSAGES = gql`
query($channelId: ChannelId!) {
    MessagesFetchLatest(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export const GET_MORE_MESSAGES = gql`
query($channelId: ChannelId!, $messageId: String!, $old: Boolean!) {
    MessagesFetchMore(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      datetime
      userId
    }
  }
`