import styled from "styled-components";

const Wrapper = styled.div`
    padding: 12px 24px;
  border: 1px solid #E1E1FB;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
  
`

const Title = styled.div`
    font-size: 16px;
    font-weight: 700;
`

const Description = styled.div`
    font-size: 16px;
`

function SingleQuestion({name, description }) {
    return (
        <Wrapper>
            <Description>{description}</Description>
        </Wrapper>
    );
}

export default SingleQuestion;