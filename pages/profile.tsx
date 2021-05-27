import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Container from "../components/container";
import Intro from "../components/intro";
import Layout from "../components/layout";

export default function Profile({ subscription }) {
  return (
    <>
      <Layout preview={false}>
        <Container>
          <Intro />
        </Container>
      </Layout>
    </>
  );
}
