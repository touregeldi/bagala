import React from 'react';
import styled from 'styled-components';
import LogoIcon from '../assets/logo-small.svg';
import BookIcon from '../assets/book.svg';
import QuestionIcon from '../assets/question.svg';
import RecommendationIcon from '../assets/like.svg';
import Link from "next/link";
import {useSession} from "next-auth/react";


const MainWrapper = styled.div`
  background: rgba(242, 246, 255, 1);
  display: flex;
`;

const Main = styled.div`
  min-height: calc(100vh - 80px);
    padding: 32px;
  color: #5D5C5C;
  width: 100%;
  position: relative;
`

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background-color: white;
  width: 100%;
  height: 80px;
  color: #5D5C5C;
`;

const UserName = styled.div`
  font-size: 16px;
  color: #5D5C5C;
`;

const NavBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: white;
  width: 250px;
`;

const NavItem = styled.div`
  display: flex;
    align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 16px;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  color: #5D5C5C;
  ${({ active }) => active && `
  background-color: #0D8BFF;
  color: white;
  `}
`;

const LogoWrapper = styled.div`
  display: flex;
  gap: 8px;
  font-size: 24px;
  cursor: pointer;
`

const UserWrapper = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

const UserEmail = styled.div`
    color: #9A9AB0;
  font-size: 12px;
`

const Layout = ({ children, active }) => {
    const {data: session} = useSession()
    const userName = session?.user?.name || 'Guest'
    const userEmail = session?.user?.email || 'Guest'

    return (
        <>
            <TopBar>
                <Link href={'/'}>
                    <LogoWrapper>
                        <LogoIcon/>
                        <p>Bagala</p>
                    </LogoWrapper>
                </Link>
                <UserWrapper>
                    <div>
                        <UserName>{userName}</UserName>
                        <UserEmail>{userEmail}</UserEmail>
                    </div>

                </UserWrapper>

            </TopBar>
            <MainWrapper>
                <NavBar>
                    <Link href={'/'}>
                        <NavItem active={active === 0} fill={active === 0 ? 'white' : "#9A9AB0" }>
                            <BookIcon/>
                            <p>Courses</p>
                        </NavItem>
                    </Link>

                    <Link href={'/questions'} stroke={active === 1 ? 'white' : "#9A9AB0" }>
                        <NavItem active={active === 1}>
                            <QuestionIcon/>
                            <p>Questions</p>
                        </NavItem>
                    </Link>

                    <Link href={'/recommendations'} stroke={active === 2 ? 'white' : "#9A9AB0" }>
                        <NavItem active={active === 2}>
                            <RecommendationIcon/>
                            <p>Recommendations</p>
                        </NavItem>
                    </Link>
                </NavBar>
                <Main>{children}</Main>
            </MainWrapper>
        </>
    );
};

export default Layout;
