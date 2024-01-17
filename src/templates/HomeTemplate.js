import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Link } from "gatsby"
import useMetaData from "../hooks/useMetaData"
import { Helmet } from "react-helmet"

const HomeTemplate = props => {
  // Hook to fetch meta data from gatsby-config.js
  const metaData = useMetaData()

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
      [BLOCKS.HEADING_1]: children => <h1 className="Header1">{children}</h1>,
      [BLOCKS.HEADING_2]: children => <h2 className="Header2">{children}</h2>,
      [BLOCKS.HEADING_3]: children => <h3 className="Header3">{children}</h3>,
      [BLOCKS.HEADING_4]: children => <h4 className="Header4">{children}</h4>,
      [BLOCKS.HEADING_5]: children => <h5 className="Header5">{children}</h5>,
    },
  }

  return (
    <>
      <Helmet>
        <title>{props.titlepage}</title>
        <meta name="description" content="This my homepage" />
      </Helmet>

      <article className="headerwrap">
        <h1 className="auther">{metaData.author}</h1>
        <h3 className="pagetitle">{props.titlepage}</h3>
      </article>

      <h3 className="headerbannerHome">{props.heroheader}</h3>

      <div className="flexcontainerHome">
        <section className="contentwrapHome">
          <article className="textContentHome">
            <div className="richtextHome">
              {renderRichText(props.content, richTextConfig)}
            </div>
            <button className="buttonLink">
              <Link to="/portfolio">{props.githubtitle}</Link>
            </button>
          </article>
          <GatsbyImage
            className="heroimghome"
            image={props.imagehero.gatsbyImage}
            alt={props.titlepage}
            layout="constrained"
          />
        </section>
      </div>
    </>
  )
}

export default HomeTemplate
