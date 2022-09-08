import { useEffect } from "react";

import { useRouter } from "next/router";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import ContributionTable from "../../components/Tables/ContributionTable";

import { GetStaticProps, GetStaticPaths } from "next";
import { getContributionList } from "../../lib/contributions";
import { useDispatch } from "react-redux";
import { setContribution } from "../../store/contribution/contributionSlice";
import Header from "../../components/Header/Header";

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.repoId;
  const contribution = await getContributionList(id);

  // console.log("@@para", params.repoId);
  // console.log(users);
  return {
    props: {
      contribution,
      id,
    },
  };
};

const ContributionPage: React.FC<any> = ({ contribution }) => {
  const router = useRouter();
  router.query.repoId; //holds the value pf the url

  const dispatch = useDispatch();
  // console.log(contribution);

  useEffect(() => {
    dispatch(setContribution(contribution));
  }, []);

  return (
    <div>
      <Layout>
        <Container>
          <Header
            title={
              "Contributions related to repository: " + router.query.repoId
            }
          />
          <ContributionTable />
        </Container>
      </Layout>
    </div>
  );
};

export default ContributionPage;
