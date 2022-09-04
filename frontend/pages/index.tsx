import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import NavBar from "../components/Navigation/NavBar";
import Container from "../components/Container/Container";
import Layout from "../components/Layout/Layout";

const Home: NextPage = () => {
  return (
    <div>
      <Layout>
        <Container />
      </Layout>
    </div>
  );
};

export default Home;
