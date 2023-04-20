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

function SingleItem({name, description, active, onClick }) {
    return (
        <Wrapper onClick={onClick}>
            <Title>{name}</Title>
            <Description>{description}</Description>
        </Wrapper>
    );
}

export default SingleItem;