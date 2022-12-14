import Head from "next/head";
import React from "react";
import NavBar from "../Navigation/NavBar";
//titlere is hasznalhato pl :)

//functional comp, deconstr.
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Dorcsi's bootcamp app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <NavBar />
        {children}
      </main>
    </>
  );
};

export default Layout;
