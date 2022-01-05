import {
	Chat,
	Channel,
	MessageInput,
} from "stream-chat-react";


const ChatView = () => (
	<Chat>
		<Channel>
				<View style={{display: 'flex', height: '100%'}}>
						<MessageList />
						<MessageInput />
				</View>
		</Channel>
	</Chat>
);

export default ChatView;
