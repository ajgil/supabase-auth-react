import { useAuth, useState } from '../contexts/Auth'
import { StreamChat } from "stream-chat";
import axios from "axios";
import ChatView from './ChatView';


export default function ChatUserController() {

    const { user } = useAuth()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const API_KEY = "dj4bn8c565ua";

    const client = StreamChat.StreamChat(API_KEY);


    axios
      .post('https://7dno22e0xa.execute-api.us-east-1.amazonaws.com/dev/users/create', {
        username: user.id,
      })
      .then(res => {
        if (res.data.status) {
            client
            .setUser(
              {
                id: res.data.user_id,
                username: username,
                image:
                  'https://stepupandlive.files.wordpress.com/2014/09/3d-animated-frog-image.jpg',
              },
              res.data.token
            )
            .then(() => {
              axios
                .post('https://7dno22e0xa.execute-api.us-east-1.amazonaws.com/dev/users/add_member', {
                  username: username,
                })
                .then(() => {
                    setIsAuthenticated(true);
                });
            });
          return;
        }
        alert('Authentication', 'Could not authenticate you. Try again')
        console.log('Authentication', 'Could not authenticate you. Try again')
        //sacar una alerta
      })
      .catch(err => {
        console.log(err);
        alert(
          'Authentication',
          'An error occurred while authenticating you. Try again'
        );
      });

    if (isAuthenticated) return <ChatView client={client} username={username}/>
}

  