import * as React from "react"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import useMetaData from "../hooks/useMetaData"
import { Helmet } from "react-helmet"

const PortfolioTemplate = props => {
  //   // Hook to fetch meta data from gatsby-config.js
  const metaData = useMetaData()

  // query from graphql that fetch from contentType portfolio
  const data = useStaticQuery(graphql`
    query {
      allContentfulPortfolio {
        edges {
          node {
            title
            itemTitle
            itemDescription
            id
            slug
            content {
              raw
            }
            image {
              gatsbyImage(width: 1200)
              gatsbyImageData(layout: CONSTRAINED)
            }
          }
        }
      }
    }
  `)

  return (
    <>
      <Helmet>
        <title>{props.titlepage}</title>
        <meta name="description" content="This page shows all my projects" />
      </Helmet>

      <article className="headerwrap">
        <h1 className="auther">{metaData.author}</h1>
        <h3 className="pagetitle">{props.titlepage}</h3>
      </article>

      <div className="gridContainer">
        {data.allContentfulPortfolio.edges.map(edge => {
          return (
            <div className="gridItemWrap" key={edge.node.id}>
              <h4 className="headerLinkPost">
                <Link to={`/portfolio/${edge.node.slug}`}>
                  {edge.node.title}
                </Link>
              </h4>
              <Link to={`/portfolio/${edge.node.slug}`}>
                <GatsbyImage
                  className="imgGrid"
                  image={edge.node.image.gatsbyImage}
                  alt={edge.node.title}
                  layout="constrained"
                />
              </Link>
              <h5 className="headerLinkPost">
                <Link to={`/portfolio/${edge.node.slug}`}>
                  {edge.node.itemTitle}
                </Link>
              </h5>
              <p className="aboutProjectText">{edge.node.itemDescription}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default PortfolioTemplate
