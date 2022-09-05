import type { NextPage } from "next";

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
