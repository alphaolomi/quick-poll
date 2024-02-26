// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.NEXT_PUBLIC_PUSHER_APP_ID || "",
  key: process.env.NEXT_PUBLIC_PUSHER_APP_KEY || "",
  secret: process.env.NEXT_PUBLIC_PUSHER_APP_SECRET || "",
  cluster: process.env.NEXT_PUBLIC_PUSHER_APP_CLUSTER || "",
  useTLS: true,
});

type Data = {
  car: string;
  points: number;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // if (!req.body.name) {
    //   res.status(400).end();
    // }

    const newVote = {
      car: req.body.name,
      points: 1,
    };

    pusher.trigger("my-channel", "my-event", newVote).then(() => {
      console.log("Event triggered", newVote);
    });
      

    res.status(200).json(newVote);
  } else {
    // Handle any other HTTP method
    res.status(400).end();
  }
}
