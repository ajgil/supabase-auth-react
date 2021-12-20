import React, { useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, ChannelList, LoadingIndicator, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';

import 'stream-chat-react/dist/css/index.css';

//const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZmFuY3ktaGFsbC0zIiwiZXhwIjoxNjQwMDE2NjAxfQ.9RyIYveYaayBHUBKEk66Xn_xihZlY2BBmGzeixujwxk';
/*
var stream = require('getstream');
// Instantiate a new client (server side)
client = stream.connect('7rfypad6gc33', 'qy6epb64gwckyjgt3bwwwrh2qq72gtgtdhuufgzu5apjmqkkd6nbd6t394ps2av8', '1151626');
// Instantiate a new client (client side)
client = stream.connect('7rfypad6gc33', null, '1151626');
// Find your API keys here https://getstream.io/dashboard/
*/


const filters = { type: 'messaging', members: { $in: ['artis'] } };
const sort = { last_message_at: -1 };

const HiklubChat = () => {

  const [chatClient, setChatClient] = useState(null);

  useEffect(() => {
    const initChat = async () => {
      const serverClient = StreamChat.getInstance('dj4bn8c565ua', '6nm2z8whbex2m5qtf4vqbeyn2u3y6wtfctskmbpz5wewe4t4b2hz3uufwjsucqum')
      const userToken = serverClient.createToken('artis')
      await serverClient.connectUser(
        {
          id: 'artis',
          name: 'artis',
          image: 'https://getstream.io/random_png/?id=fancy-hall-3&name=fancy',
        },
        userToken,
      );

      setChatClient(serverClient);
    };

    initChat();
  }, []);

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
  <Chat client={chatClient} theme='messaging light'>
     <ChannelList filters={filters} sort={sort} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
  </Chat>
  )

}

export default HiklubChat;