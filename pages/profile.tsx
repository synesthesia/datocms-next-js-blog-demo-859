import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import useSWR from 'swr'
import { useSession, getSession } from 'next-auth/client'
import Container from "../components/container";
import Layout from "../components/layout";
import Head from 'next/head';

export default function Profile({ subscription }) {
  const [ session, loading ] = useSession()

  const fetcher = async url => {
    const res = await fetch(url)
  
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      throw error
    }
  
    return res.json()
  }
  
  
  const { data, error } = useSWR('/api/user', fetcher)
  
  if (loading) return null

  if (!loading && !session){
    return (
      <>
        <Layout preview={false}>
          <Container>
            <section className="prose">
            <h1>User Profile</h1>
            <p>If you were logged in, this would be your profile</p>
            </section>
          </Container>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Layout preview={false}>
      <Head> 
            <link rel="preload" href="/api/user" as="fetch" crossOrigin="anonymous" />
          </Head>
        <Container>
          <section className="prose">
          <h1>User Profile</h1>
          <p>This will be where you  can update your user profile</p>
          </section>
          <section className="prose">
            <h2>Your Profile</h2>
            <ProfileMessage data={data} error={error}></ProfileMessage>
            {data && <p>{data.sub}</p>}
            {data && data.roles.map((role, i) => <p key={i}>{role}</p>)}
          </section>
        </Container>
      </Layout>
    </>
  );
}


function ProfileMessage (data, error){
  if (error && error !== {}) {
    console.log(`error: ${JSON.stringify(error)}`);
    return <div>failed to load</div>}
  if (!data) return <div>loading...</div>

}