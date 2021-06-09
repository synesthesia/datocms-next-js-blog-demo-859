import Head from "next/head";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import PostBody from "../../components/post-body";
import ProtectedBody from "../../components/protected-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import { request } from "../../lib/datocms";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import { metaTagsFragment, responsiveImageFragment } from "../../lib/fragments";



export async function getStaticPaths() {
    const data = await request({ query: `{ allArticles { slug } }` });
    console.log(JSON.stringify(data));
    return {
      paths: data.allArticles.map((article) => `/articles/${article.slug}`),
      fallback: false,
    };
  }

  export async function getStaticProps({ params, preview = false }) {
    const graphqlRequest = {
      query: `
        query ArticleBySlug ($slug: String){
           site: _site {
            favicon: faviconMetaTags {
              ...metaTagsFragment
            }
          }
          article(filter: {slug: {eq: $slug}}) {
              seo: _seoMetaTags {
                ...metaTagsFragment
              }
              accessGroups {
                name
              }
              id
              protectedContent {
                value
                blocks {
                  __typename
                  ... on ImageBlockRecord {
                      id
                      image {
                        responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                          ...responsiveImageFragment
                        }
                      }
                  }
                  ... on StructuredTextBlockRecord {
                      id
                      content {
                        value
                      }
                  }
                }
              }
              publicContent {
                value
                blocks {
                __typename
                ... on ImageBlockRecord {
                    id
                    image {
                      responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                        ...responsiveImageFragment
                      }
                    }
                  }
                  ... on StructuredTextBlockRecord {
                    id
                    content {
                      value
                    }
                  }
                }
              }
              slug
              title
              date
              coverImage {
                responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                  ...responsiveImageFragment
                }
              }
              author {
                name
                picture {
                  url(imgixParams: {fm: jpg, fit: crop, w: 100, h: 100, sat: -100})
                }
              }

            }
          }
  
        ${responsiveImageFragment}
        ${metaTagsFragment}
      `,
      preview,
      variables: {
        slug: params.slug,
      },
    };
  
    return {
      props: {
        subscription: preview
          ? {
              ...graphqlRequest,
              initialData: await request(graphqlRequest),
              token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
            }
          : {
              enabled: false,
              initialData: await request(graphqlRequest),
            },
      },
      revalidate: 60,
    };
  }

  export default function Article({ subscription, preview }) {
    const {
      data: { site, article, morePosts },
    } = useQuerySubscription(subscription);
  
    const metaTags = article.seo.concat(site.favicon);
  
    return (
      <Layout preview={preview}>
        <Head>{renderMetaTags(metaTags)}</Head>
        <Container>
          <Header />
          <article>
            <PostHeader
              title={article.title}
              coverImage={article.coverImage}
              date={article.date}
              author={article.author}
            />
            <PostBody content={article.publicContent} />
            <ProtectedBody content={article.protectedContent} allowedGroups={article.accessGroups}/>
          </article>
          <SectionSeparator />
        </Container>
      </Layout>
    );
  }
  