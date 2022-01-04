import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  VirtualizedMessageList,
  ChannelHeader,
  ChannelList,
  MessageInput,
  Window,
  Thread,
  MessageSimple
} from "stream-chat-react";

import axios from "axios";

const API_KEY = "dj4bn8c565ua";

const client = StreamChat.getInstance(API_KEY);

useEffect(() => {
    const connectUser = async () => {
        await client.connectUser(
            {
            id: ajgil,
            name: 'Artis',
            image: 'https://getstream.io/random_png'
            },
            client.devToken('ajgil')
        )
    }

    // crear el channel
    const channel = client.channel("messaging", "notjustdev", { name: 'notJust Development'});
    await channel.watch()

    connectUser()

    return () => client.disconnectUser()
}, [])


/**
 * Set defaultItemHeight to the pixel height of your one-liner message.
 * This speeds up rendering and minimizes reflows.
 *
 * If you're using a custom message, ensure that reactions don't change the height of the item.
 * This improves the end-user experience and performance, as the chat "bounses" less.
 *
 * The `increaseViewportBy` decreases the rerenders for the message sender,
 * and eliminates short "blinks" when new messages appear.
 *
 * stickToBottomScrollBehavior can be either 'smooth' or 'auto'
 * smooth may have hard time catching up with many incoming messages. Use 'auto' for busy chats.
 */
const HiklubChat = () => (
  <Chat client={chatClient}>
    <ChannelList />
    <Channel>
      <Window>
        <ChannelHeader />
        <VirtualizedMessageList
          stickToBottomScrollBehavior="auto"
          message={MessageSimple}
          defaultItemHeight={60}
          additionalVirtuosoProps={{
            increaseViewportBy: { top: 0, bottom: 200 }
          }}
        />
        <MessageInput focus />
      </Window>
      <Thread />
    </Channel>
  </Chat>
);

export default HiklubChat;
