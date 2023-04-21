import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import universityImage from '../assets/login-image.jpg';
import LogoImage from '../assets/logo.svg';
import GoogleImage from '../assets/google-logo.svg';
import NextImage from 'next/image'


const LoginWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 3rem;
`;

const LeftColumn = styled(Col)`
  
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

const LogoWrapper = styled.div`
  display: flex;
  margin: 50px 9rem;
  align-items: center;`;

const Logo = styled(LogoImage)`
  margin-right: 1rem;
`;

const WelcomeMessage = styled.h3`
  margin-bottom: 1rem;
  font-size: 35px ;
`;

const StyledNextImage = styled(NextImage)`
    border-radius: 22px;
`

const Box = styled.div`
  height: 100%;
  border-radius: 22px;
  padding: 3rem 9rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Authorize = styled.p`
  font-size: 25px;
  font-weight: 100;
  color: grey;
`

const AuthorizeContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledButton = styled(Button)`
  display: flex;
    align-items: center;
  justify-content: center;
`

const StyledGoogleImage = styled(GoogleImage)`
  margin-right: 1rem;
`

export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}

const LoginPage = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (session) {
        return <div>You are already logged in.</div>;
    }

    return (
        <LoginWrapper>
            <Container fluid className={'h-100'}>
                <Row className={'h-100'}>
                    <LeftColumn>
                        <LeftWrapper>
                            <LogoWrapper>
                                <Logo  />
                                <h2>Bagala</h2>
                            </LogoWrapper>
                            <Box>
                                <WelcomeMessage className={'font-weight-bold'}>
                                    Your Course Guide to Succeed in Nazarbayev University
                                </WelcomeMessage>
                                <AuthorizeContainer>
                                    <Authorize>Authorize with your university mail account:</Authorize>
                                    <StyledButton className={'btn-lg btn-outline-primary'} onClick={() => signIn('google', { callbackUrl: '/' })}>
                                        <StyledGoogleImage />
                                        Sign in with Google
                                    </StyledButton>
                                </AuthorizeContainer>
                            </Box>
                        </LeftWrapper>
                    </LeftColumn>
                    <Col>
                        <StyledNextImage src={universityImage} alt="university" layout={'fill'} objectFit="cover" />
                    </Col>
                </Row>
            </Container>
        </LoginWrapper>
    );
};

export default LoginPage;
