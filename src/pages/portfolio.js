import * as React from "react"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import Layout from "../components/layout"

//sidans namn blir portfolio efter namnet på javascript-filen
const SecondPage = () => {
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

  const data = useStaticQuery(graphql`
    query {
      allContentfulPortfolio {
        edges {
          node {
            title
            id
            content {
              raw
            }
            image {
              gatsbyImage(width: 1200)
            }
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <ul>
        {data.allContentfulPortfolio.edges.map(edge => {
          return (
            <li key={edge.node.id}>
              <h2>{edge.node.title}</h2>
              <h2>{edge.node.message}</h2>
              <p>{edge.node.slug}</p>
              <p>
                <Link to={`/portfolio/${edge.node.slug}`}>
                  {edge.node.slug}
                </Link>
              </p>
              <p>{renderRichText(edge.node.content, richTextConfig)}</p>
              <div className="grid-container">
                <GatsbyImage
                  className="img"
                  image={edge.node.image.gatsbyImage}
                  alt={edge.node.title}
                />
              </div>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}

export const Head = () => <title>Portfolio Page</title>

export default SecondPage
