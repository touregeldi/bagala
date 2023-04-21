import Head from 'next/head'
import withAuth from "@/hocs/withAuth";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import WhitePaper from "@/components/WhitePaper";
import styled from "styled-components";
import {useEffect, useState} from "react";
import axios, {get} from "axios";
import SingleItem from "@/components/SingleItem";
import {useRouter} from "next/router";

const schools = ['SEDS', 'SSH', 'SMG', 'SME', 'Graduate']

const Header = styled.div`
  display: flex;
  gap: 32px;;
`

const School = styled.div`
  font-size: 16px;
  color: rgba(17, 20, 45, 0.5);
  font-weight: 700;
  ${({ active }) => active ? `
  color: #11142D;
  ` :``}
  cursor: pointer;
`

const MainWrapper = styled.div`
    display: flex;
    flex-direction: column;
  gap: 16px;
`

const mockCourses = [
    {
        "name": "CSCI 151",
        "description": "Computer Science course",
        "id": 1
    },
    {
        "name": "CSCI 152",
        "description": "Computer Science course",
        "id": 2
    }
]

export const getBaseUrl = () => 'http://127.0.0.1:8000/api/v1'

function MainPage() {
    const breadcrumbItems = [
        { label: 'Courses', link: '/' }
    ]
    const [activeSchool, setActiveSchool] = useState(0)
    const [data, setData] = useState([])
    const router = useRouter()

    useEffect(() => {
        axios.get(`${getBaseUrl()}/courses/${activeSchool}`)
            .then(res => {
                setData(res.data)
                console.log('res', res.data)
            })
    }, [activeSchool])

    function onItemClick(id) {
        router.push('/course-details/' + id + '?schoolName=' + data.find(item => item.id === id).name)
    }

    return (
        <Layout active={0}>
            <Breadcrumb items={breadcrumbItems} />
            <WhitePaper header={
                <Header>
                    {
                        schools.map((school, index) =>
                            <School
                                key={school}
                                onClick={() => setActiveSchool(index)}
                                active={index === activeSchool}
                            >{school}</School>)
                    }   
                </Header>

            }>
                <MainWrapper>
                    
                    {
                        data.map((course, index) => <SingleItem key={index} {...course} onClick={() => onItemClick(course.id)}/>)
                    }
                </MainWrapper>

            </WhitePaper>

        </Layout>
    );
}

function Home() {
  return (
    <>
      <Head>
        <meta name="description" content="Awesome project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <MainPage/>
      </main>
    </>
  )
}

export default withAuth(Home)
