'use client'
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";


const Chart = dynamic(() => import("../components/Chart"), { ssr: false });
const PusherApp = dynamic(() => import("../components/Pusher"));

export default function Home() {

  useEffect(() => {
    console.log("Home");
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
          <h1 className="text-2xl font-bold">Quick Poll</h1>
          {/* <p className="mt-3 text-2xl">Get started by editing</p> */}
          <PusherApp />
          <Chart />
        </main>

        <footer className="flex items-center justify-center w-full h-24 border-t">
          <a
            className="flex items-center justify-center"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
          </a>
        </footer>
      </div>
    </>
  );
}
