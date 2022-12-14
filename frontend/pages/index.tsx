// import type { NextPage } from "next";
import { useEffect } from "react";

import Container from "../components/Container/Container";
import Layout from "../components/Layout/Layout";
import CardHolder from "../components/Cards/CardHolder";

import store from "../store/store";
import { GetStaticProps } from "next";
import { getRepositoryList } from "../lib/repositories";
import { useSelector, useDispatch } from "react-redux";
import {
  setRepository,
  filterLanguage,
} from "../store/repository/repositorySlice";
import Header from "../components/Header/Header";
import Input from "../components/Input/Input";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const repository = await getRepositoryList();
  return {
    props: {
      repository,
    },
  };
};

// interface Props{
//   repository[]
// }
// const Home = ({ repository }: Props) => {
const Home: React.FC<any> = ({ repository }) => {
  // console.log("@@", store);
  const dispatch = useDispatch();
  // console.log(repository); //ok

  useEffect(() => {
    dispatch(setRepository(repository));
    // dispatch(setRepository(repository ?? []));
  }, []); //repository as dependency
  return (
    <div>
      <Layout>
        <Container>
          <Header title={"Repositories"}>
            <Input type="text" placeholder="valami" />
          </Header>

          <CardHolder />
        </Container>
      </Layout>
    </div>
  );
};

export default Home;
