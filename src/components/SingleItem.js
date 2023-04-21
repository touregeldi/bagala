import styled from "styled-components";

const Wrapper = styled.div`
    padding: 12px 24px;
  border: 1px solid #E1E1FB;
  border-radius: 8px;
  width: 100%;
  &:hover {
    background-color: #0D8BFF;
    color: white;
  }
  cursor: pointer;
`

const Title = styled.div`
    font-size: 16px;
    font-weight: 700;
`

const Description = styled.div`
    font-size: 12px;
`

const Name = styled.div`
    font-size: 16px;
  font-weight: 700;
`

const LocalName = styled.div`
  background: #CCE9FE;
  padding: 8px;
    border-radius: 8px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`

function SingleItem({name, description, active, onClick, author }) {
    return (
        <Wrapper onClick={onClick}>
            <Header>
                <Title>{name}</Title>
                {author && <Name><LocalName>{author}</LocalName></Name>}
            </Header>
            <Description>{description}</Description>

        </Wrapper>
    );
}

export default SingleItem;