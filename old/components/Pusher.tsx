import React from "react";
import Pusher from "pusher-js";
import * as PusherTypes from 'pusher-js';

const PusherApp = () => {
  const [state, setState] = React.useState<{chats:string[]}>({ chats: [] });

  React.useEffect(() => {
    if (process.env.NEXT_PUBLIC_PUSHER_APP_KEY === undefined) {
      console.error("Pusher App Key is not defined");
      //   throw new Error("Pusher App Key is not defined");
      return;
    }

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER,
      forceTLS: true,
    });

    const channel = pusher.subscribe("my-channel");

    channel.bind("my-event", (data:any) => {
      console.log("my-event", data);
      
      const { chats } = state;
      data && chats.push(data);
      setState({ chats });
    });

    pusher.connection.bind("connected", () => {
      console.log("connected");
    });

    return () => {
      pusher.disconnect();
    };
  }, []);

  return <div>
    {/* {state.chats.map((chat, index) => {
      return <div key={index}>
        <p>{chat.message}</p>
       
      </div>
    })} */}
    {JSON.stringify(state.chats)}
  </div>;
};

export default PusherApp;
