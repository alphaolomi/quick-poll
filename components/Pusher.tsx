'use client'
import { useState, useEffect } from "react";
import Pusher from "pusher-js";
import * as PusherTypes from 'pusher-js';

const APP_KEY = process.env.NEXT_PUBLIC_PUSHER_APP_KEY as string;
const APP_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER as string;

export default function PusherApp() {
  const [state, setState] = useState<{ chats: string[] }>({ chats: [] });

  useEffect(() => {
    if (!APP_KEY) {
      console.error("Pusher App Key is not defined");
      //   throw new Error("Pusher App Key is not defined");
      return;
      
    }

    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER,
    });

    const channel = pusher.subscribe("my-channel");

    channel.bind("my-event", (data: any) => {
      console.log("my-event", data);

      const { chats } = state;
      data && chats.push(data);
      setState({ chats });
    });

    pusher.connection.bind("connected", () => {
      console.log("connected");
    });

    pusher.connection.bind('error', function (error: unknown) {
      console.log("error", error);
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
