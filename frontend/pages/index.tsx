import type { NextPage } from "next";

import Container from "../components/Container/Container";
import Layout from "../components/Layout/Layout";
import CardHolder from "../components/Cards/CardHolder";
import store from "../store/store";

const Home: NextPage = () => {
  console.log("@@", store);
  return (
    <div>
      <Layout>
        <Container>
          <CardHolder />
        </Container>
      </Layout>
    </div>
  );
};

export default Home;
