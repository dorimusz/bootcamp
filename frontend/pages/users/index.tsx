//React.FC(functional components that take a props argument and return JSX) and NextPage(just the page type of a nextjs project - not component!) type:
import Container from "../../components/Container/Container";
import Layout from "../../components/Layout/Layout";
import UserTable from "../../components/Tables/UserTable/UserTable";
import Header from "../../components/Header/Header";

import { getUserList } from "../../lib/users";

import { useEffect } from "react";

import { GetStaticProps } from "next";
import { useDispatch } from "react-redux";
import { setUsers } from "../../store/user/userSlice";

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const users = await getUserList();
  // console.log(users);
  return {
    props: {
      users,
    },
  };
};

const Users: React.FC<any> = ({ users }) => {
  // const { users: usersState } = useSelector(userSelector);
  const dispatch = useDispatch();
  // console.log(users);
  // dispatch(setUsers(users));

  useEffect(() => {
    dispatch(setUsers(users));
  }, []);

  return (
    <>
      <Layout>
        <Container>
          <Header title={"User list"} />
          <UserTable />
          {/* {usersState.length && <h1>{usersState[0].login}</h1>} */}
        </Container>
      </Layout>
    </>
  );
};

export default Users;
