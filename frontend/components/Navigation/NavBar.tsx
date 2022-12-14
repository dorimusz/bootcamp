import * as S from "../Navigation/NavigationAtom";
//stilus es legeneralt nav
import * as T from "../Text/TextAtom";
import { Colors } from "../../enums/colorEnums";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase, faTent, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import { useState } from "react";

const NavBar = () => {
  const router = useRouter();
  //   console.log(router.pathname);

  return (
    <S.NavContainer>
      <S.TitleContainer justifyContent="center">
        <S.SmallHeading>
          <T.TextHeader size="20px">
            <FontAwesomeIcon
              style={{ marginRight: ".5rem", width: "20px", height: "20px" }}
              icon={faTent}
            />
            BootCamp
          </T.TextHeader>
        </S.SmallHeading>
      </S.TitleContainer>
      <S.NavItemWrapper>
        <S.ListItems>
          <T.TextPrimary margin="0 0 1rem 0">
            <Link href="/" passHref>
              <S.LinkText pathName={router.pathname}>
                <FontAwesomeIcon
                  icon={faDatabase}
                  style={{
                    marginRight: ".5rem",
                    width: "15px",
                    height: "15px",
                  }}
                />
                Repositories
              </S.LinkText>
            </Link>

            {/* <Link href="/">Repositories</Link> */}
          </T.TextPrimary>
        </S.ListItems>

        <S.ListItems>
          <T.TextPrimary margin="0">
            <Link href="/users" passHref>
              <S.LinkText pathName={router.pathname}>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    marginRight: ".5rem",
                    width: "15px",
                    height: "15px",
                  }}
                />
                User list
              </S.LinkText>
            </Link>

            {/* <Link href="/users">User List</Link> */}
          </T.TextPrimary>
        </S.ListItems>
      </S.NavItemWrapper>
    </S.NavContainer>
  );
};
export default NavBar;
