import styled from 'styled-components';

const Wrapper = styled.div`
    background: white;
  width: 100%;
    border-radius: 8px;
`

const Header = styled.div`
  padding: 32px 30px;
  border-bottom: 1px solid #E1E1FB;
`

const Main = styled.div`
  padding: 16px 32px;
`

function WhitePaper ({ children, header }) {
  return (
    <Wrapper>
        {header && <Header>
            {header}
        </Header>}
        <Main>
            {children}
        </Main>
    </Wrapper>
  )
}

export default WhitePaper