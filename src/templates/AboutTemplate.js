import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import useMetaData from "../hooks/useMetaData"
import { Helmet } from "react-helmet"

const AboutTemplate = props => {
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
      [BLOCKS.HEADING_4]: children => <h4 className="Header3">{children}</h4>,
      [BLOCKS.HEADING_5]: children => <h5 className="Header5">{children}</h5>,
    },
  }
  return (
    <>
      <Helmet>
        <title>{props.titlepage}</title>
        <meta name="description" content="This page is about me" />
      </Helmet>

      <article className="headerwrap">
        <h1 className="auther">{metaData.author}</h1>
        <h3 className="pagetitle">{props.titlepage}</h3>
      </article>

      <section className="aboutFlexContainer">
        <section className="aboutContentWrap">
          <section className="TextAndImageContainer flexdirection">
            <GatsbyImage
              className="aboutHeroimg"
              image={props.imagehero.gatsbyImage}
              alt={props.titlepage}
              layout="constrained"
            />
            <div className="richtextAbout">
              {renderRichText(props.content, richTextConfig)}
            </div>
          </section>
          <article className="cardWrap flexdirection">
            <div className="richtextAboutList">
              {renderRichText(props.listText, richTextConfig)}
            </div>
            <div className="CVwrap">
              <div className="CVContent">
                <div>{renderRichText(props.cardContent, richTextConfig)}</div>
              </div>
            </div>
          </article>
        </section>
      </section>
    </>
  )
}

export default AboutTemplate
