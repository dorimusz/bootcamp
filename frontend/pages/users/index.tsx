//React.FC(functional components that take a props argument and return JSX) and NextPage(just the page type of a nextjs project - not component!) type:
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import * as S from "../../components/Container/ContainerAtom";
import Header from "../../components/Header/Header";

const Users: React.FC = () => {
  return (
    <>
      <Layout>
        <Container>
          <p>bibop, table goes here</p>
        </Container>
      </Layout>
    </>
  );
};

export default Users;
