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

import "@stream-io/stream-chat-css/dist/css/index.css";
import "./styles.css";

const API_KEY = "dj4bn8c565ua";

// Setup two users, so that we can simulate send/receive messages using two urls:.
// https://m3j4h.csb.app/
// https://m3j4h.csb.app/?alt

const USER_ID1 = "ajgil";

//const USER_TOKEN1 =
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicmlja3kifQ.GtkIUZC_XpaaafSISkVyIXE3ecArf5Dt0RPl_6Tg9qc";

const USER_ID2 = "artis";
//const USER_TOKEN2 =
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoianVsaWFuIn0.iQ7y2r5OsWPENdS0EiNOXD-5PxZhW85uweFYDZQRCjw";

const chatClient = StreamChat.getInstance(API_KEY);

const USER_TOKEN1 = chatClient.createToken(USER_ID1);
const USER_TOKEN2 = chatClient.createToken(USER_ID2);

const alt = window.location.search === "?alt";
const userId = alt ? USER_ID2 : USER_ID1;
const userToken = alt ? USER_TOKEN2 : USER_TOKEN1;

document.title = `${userId} - Stream test`;

chatClient.connectUser(
  {
    id: userId,
    name: userId,
    image: `https://getstream.io/random_png/?id=${userId}&name=${userId}`
  },
  userToken
);

const channel = chatClient.channel("messaging", "hallway", {
  members: [USER_ID1, USER_ID2]
});
channel.watch();

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
