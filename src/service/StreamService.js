import { StreamChat } from 'stream-chat';
//import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
//import { useAuth } from '../../contexts/Auth'

export default function StreamService () {
// Define values. 
const api_key = 'dj4bn8c565ua' 
const api_secret = '6nm2z8whbex2m5qtf4vqbeyn2u3y6wtfctskmbpz5wewe4t4b2hz3uufwjsucqum' 
const user_id = 'ajgil' 
 
// Initialize a Server Client 
const serverClient = StreamChat.getInstance( api_key, api_secret); 
// Create User Token 
const token = serverClient.createToken(user_id);

console.log('token', token)

}