import React, { Fragment } from "react";
import Head from "next/head";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Fragment>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <link rel="icon" href="/favicon.ico" />

      <title>{"Realtime Chat"}</title>
    </Head>
    {children}
  </Fragment>
);

export default Layout;
