import Head from 'next/head'
import withAuth from "@/hocs/withAuth";
import {signOut, useSession} from "next-auth/react";

function Home() {
    const {data: session} = useSession()

  return (
    <>
      <Head>
        <meta name="description" content="Awesome project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <div>
              <h1>Welcome, {session.user.name}</h1>
              <p>You are logged in with {session.user.email}.</p>

              <button onClick={() => signOut('google')}>Sign out</button>
          </div>
      </main>
    </>
  )
}

export default withAuth(Home)
