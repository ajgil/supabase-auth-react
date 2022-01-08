import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

const chatClient = StreamChat.getInstance('7rfypad6gc33');
const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMmEwMTI1ZDgtNzBkOC00MmI0LTkxN2QtM2U2NTQxMTgyNzY2In0.81c0UW6P_daioaiTL7w8ziqYgybIazer6b_yJqi1v1w'
chatClient.connectUser(
  {
    id: '2a0125d8-70d8-42b4-917d-3e6541182766',
    name: 'hiklub',
    image: 'https://getstream.io/random_png/?id=hiklub&name=hiklub',
  },
  userToken,
);

const channel = chatClient.channel('messaging', 'hiklub-dev', {
  // add as many custom fields as you'd like
  image: 'https://www.drupal.org/files/project-images/react.png',
  name: 'Talk about Hiklub dev',
  members: ['ajgil','hiklub'],
});

const ChatEjemplo = () => (
  <Chat client={chatClient} theme='messaging light'>
    <Channel channel={channel}>
      <Window>
        <ChannelHeader />
        <MessageList />
        <MessageInput />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default ChatEjemplo;