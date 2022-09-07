import { useRouter } from "next/router";
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import RepositoryTable from "../../components/Tables/RepositoryTable";
function ContributionPage() {
  const router = useRouter();
  router.query.repoId; //holds the value pf the url
  console.log(router.query.repoId);

  return (
    <div>
      <Layout>
        <Container>
          <RepositoryTable />
        </Container>
      </Layout>
    </div>
  );
}

export default ContributionPage;
