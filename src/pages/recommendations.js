import Layout from "@/components/Layout";
import InProgress from "@/assets/icons8-future-64.png";
import Image from "next/image";
import styled from "styled-components";


export async function getStaticProps(context) {
    return {
        props: {}, // will be passed to the page component as props
    }
}

const Absolute = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`

function Recommendations() {
  return (
      <Layout active={2}>
          <Absolute>
              <Image src={InProgress} alt="In progress" width={64} height={64}/>
              <h1>Coming soon...</h1>
          </Absolute>

      </Layout>
  );
}

export default Recommendations;