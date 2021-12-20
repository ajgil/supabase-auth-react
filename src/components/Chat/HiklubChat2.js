import React, { useEffect, useState } from "react";
import { StreamChat } from 'stream-chat';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Thread, Window } from 'stream-chat-react';
//import { useAuth } from '../../contexts/Auth'
import 'stream-chat-react/dist/css/index.css';

const HiklubChat2 = () => {
    //const { user } = useAuth()

    const chatClient = StreamChat.getInstance('dj4bn8c565ua', '6nm2z8whbex2m5qtf4vqbeyn2u3y6wtfctskmbpz5wewe4t4b2hz3uufwjsucqum');
    const userToken = chatClient.devToken('artis');

    //const connectResponse =  chatClient.connectAnonymousUser(); 
    //console.log(connectResponse.me);

    useEffect(() => {
        const connectUser = async () => {
            await chatClient.connectUser({
                id: 'artis',
                name: 'artis',
                image: 'https://getstream.io/random_png',
            },
            userToken,
            )
            console.log('User connected')

        // Crear el channel
            const channel2 = chatClient.createChannel("messaging", "notjustdev", {name: "notjustdev"})
            await channel2.watch()
            
        }
    
        connectUser()
        return () => chatClient.disconnectUser();
    }, []);

    /*
    const updateResponse = chatClient.upsertUser({  
        id: user?.id,  
        role: 'admin',  
        book: 'dune' 
    }); 
  

    chatClient.connectUser(
    {
        id: 'ajgil',
        name: 'artis',
        image: 'https://getstream.io/random_png/?id=ajgil&name=artis',
    },
    userToken,
    );
      */

    const channel = chatClient.channel('messaging', 'custom_channel_id', {
    // add as many custom fields as you'd like
    image: 'https://www.drupal.org/files/project-images/react.png',
    name: 'hiklub team',
    members: ['ajgil'],
    });


    return (
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
    )
}

export default HiklubChat2;