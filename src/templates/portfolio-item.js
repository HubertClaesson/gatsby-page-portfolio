import { graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Link } from "gatsby"
import { Helmet } from "react-helmet"
import useMetaData from "../hooks/useMetaData"

// Object to render richtext
const richTextConfig = {
  renderMark: {
    [MARKS.BOLD]: text => <b className="font-bold">{text}</b>,
  },
  renerNode: {
    [INLINES.HYPERLINK]: node => (
      <a href={node.data.uri} target="_blank" rel="noopener noreferrer">
        {node.content[0].value}
      </a>
    ),
    [BLOCKS.HEADING_1]: children => <h1 className="Header">{children}</h1>,
    [BLOCKS.HEADING_2]: children => <h2 className="Header2">{children}</h2>,
    [BLOCKS.HEADING_3]: children => <h3 className="Header3">{children}</h3>,
    [BLOCKS.HEADING_4]: children => <h4 className="Header3">{children}</h4>,
  },
}

// query from graphql that fetch from contentType portfolio
export const query = graphql`
  query ($slug: String!) {
    contentfulPortfolio(slug: { eq: $slug }) {
      title
      buttonText
      image {
        gatsbyImage(width: 1000)
        gatsbyImageData(layout: CONSTRAINED)
      }
      content {
        raw
      }
    }
  }
`

const Portfolioitem = ({ data }) => {
  const { title, image, content, buttonText } = data.contentfulPortfolio
  const img = getImage(image)
  // Hook to fetch meta data from gatsby-config.js
  const metaData = useMetaData()

  return (
    <>
      {/* Links to the haeder  */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={content} />
      </Helmet>

      <Layout>
        <article className="headerwrap">
          <h1 className="auther">{metaData.author}</h1>
          <h3 className="pagetitle">{title}</h3>
        </article>
        <section className="flexContainerSingleProject">
          <section className="contentWrapSingleProject">
            <GatsbyImage
              className="heroImageSingleProjectPage"
              image={img}
              alt={title}
              layout="constrained"
            />
            <p className="richtextSingleProject">
              {renderRichText(content, richTextConfig)}
            </p>
            <button className="buttonLink">
              <Link to="/portfolio">{buttonText}</Link>
            </button>
          </section>
        </section>
      </Layout>
    </>
  )
}

export const Head = () => <title>Portfolio Page</title>

export default Portfolioitem
