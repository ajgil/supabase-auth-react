import {
	Chat,
	Channel,
	MessageInput,
    MessageList
} from "stream-chat-react";


const ChatView = () => (
	<Chat>
		<Channel>
            <MessageList />
            <MessageInput />
		</Channel>
	</Chat>
);

export default ChatView;

