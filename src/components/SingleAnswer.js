import styled from "styled-components";
import UpLogo from "@/assets/up.svg";
import DownLogo from "@/assets/down.svg";
import {motion} from "framer-motion";

const Wrapper = motion(styled.div`
    padding: 12px 24px;
  border: 1px solid #E1E1FB;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
`)

const Title = styled.div`
    font-size: 16px;
    font-weight: 700;
`

const Description = styled.div`
    font-size: 16px;
  margin-left: 40px;
`

const Logos = styled.div`
    display: flex;
    gap: 8px;
  flex-direction: column;
    align-items: center;
`

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
    gap: 16px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
`

const Name = styled.div`
    font-size: 16px;
  font-weight: 700;
  display: flex;
    align-items: center;
`

const LocalName = styled.div`
  background: #CCE9FE;
  padding: 8px;
    border-radius: 8px;
`

function SingleAnswer({name, description, number, handleUpVote, handleDownVote, author }) {
    return (
        <Wrapper
            layout
        >
            <Header>
                <TitleWrapper>
                    <Logos>
                        <UpLogo onClick={handleUpVote}/>
                        <div>{number}</div>
                        <DownLogo onClick={handleDownVote}/>
                    </Logos>
                    <Title>{name}</Title>
                </TitleWrapper>
                <Name><LocalName>{author}</LocalName></Name>
            </Header>


            <Description>{description}</Description>
        </Wrapper>
    );
}

export default SingleAnswer;