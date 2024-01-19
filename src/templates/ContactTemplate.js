import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { INLINES, BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { Link } from "gatsby"
import useMetaData from "../hooks/useMetaData"
import useSocialLinks from "../hooks/useSocialLinks"
import { Helmet } from "react-helmet"

const ContactTemplate = props => {
  // Hook to fetch meta data from gatsby-config.js
  const metaData = useMetaData()
  // Hook to fetch links and icons for LinkedIn and Github
  const socialLink = useSocialLinks()

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
  return (
    <>
      <Helmet>
        <title>{props.titlepage}</title>
        <meta name="description" content="This is a contact page" />
      </Helmet>

      <article className="headerwrap">
        <h1 className="auther">{metaData.author}</h1>
        <h3 className="pagetitle">{props.titlepage}</h3>
      </article>

      <GatsbyImage
        className="heroimgContact"
        image={props.imagehero.gatsbyImage}
        alt={props.titlepage}
        layout="constrained"
      />
      <article className="contactinfowrap">
        <div>{renderRichText(props.content, richTextConfig)}</div>
        {socialLink.map(social => (
          <div buttonwrap className="buttonwrap" key={social.node.id}>
            <button className="buttonLink">
              <Link to={social.node.linkedInLink}>{props.linkedIntitle}</Link>
            </button>
            <button className="buttonLink">
              <Link to={social.node.githubLink}>{props.githubtitle}</Link>
            </button>
          </div>
        ))}
      </article>
    </>
  )
}

export default ContactTemplate
