import Head from 'next/head'
import withAuth from "@/hocs/withAuth";
import {signOut, useSession} from "next-auth/react";
import Layout from "@/components/Layout";
import Breadcrumb from "@/components/Breadcrumb";
import WhitePaper from "@/components/WhitePaper";

function MainPage() {
    const breadcrumbItems = [
        { label: 'Courses', link: '/' },
        { label: 'Course 1', link: '/course/1' },
    ];

    return (
        <Layout active={0}>
            <Breadcrumb items={breadcrumbItems} />
            <WhitePaper header={<h1>Welcome to the main page header!</h1>}>
                <p>Welcome to the main page main!</p>
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
