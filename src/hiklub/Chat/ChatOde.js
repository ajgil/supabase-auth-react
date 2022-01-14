import React, { useState } from 'react';
import 'stream-chat-react/dist/css/index.css';
import {
  Chat,
  Channel,
  Window,
  TypingIndicator,
  MessageList,
  MessageCommerce,
  MessageInput,
  MessageInputFlat,
  withChannelContext
} from "stream-chat-react";

export default function ChatOde() {
    return (
      <Chat client={/*chatClient*/} theme="commerce light">
        <Channel channel={/*channel*/}>
          <Window>
            <div className="stream-header">
              <div className="str-header-left">
                <p className="stream-header-left-title">
                  Customer Support Chat
                </p>
              </div>
              <div className="str-chat__header-livestream-right">
                Welcome, {/*chatClient.user.name*/}
              </div>
            </div>
            <MessageList
              typingIndicator={TypingIndicator}
              Message={MessageCommerce}
            />
            <MessageInput Input={MessageInputFlat} focus />
          </Window>
        </Channel>
      </Chat>
    );

}