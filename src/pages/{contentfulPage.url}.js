import { graphql } from "gatsby"
import Layout from "../components/layout"
import React from "react"
import AboutTemplate from "../templates/AboutTemplate"
import ContactTemplate from "../templates/ContactTemplate"
import HomeTemplate from "../templates/HomeTemplate"
import PortfolioTemplate from "../templates/portfolio-template"
import NotFoundPage from "./404"

const Page = props => {
  const { data } = props
  const { contentfulPage } = data

  // Function that handles templates from contentful
  const getTemplate = () => {
    switch (contentfulPage.templates) {
      case "about":
        return <AboutTemplate {...contentfulPage} />
      case "portfolio":
        return <PortfolioTemplate {...contentfulPage} />
      case "/":
        return <HomeTemplate {...contentfulPage} />
      case "kontakt":
        return <ContactTemplate {...contentfulPage} />
      case "404":
        return <NotFoundPage {...contentfulPage} />
      default:
        return <HomeTemplate {...contentfulPage} />
    }
  }
  return <Layout>{getTemplate(contentfulPage)}</Layout>
}

// fetch from page from contentful
export const data = graphql`
  query pageQuery($id: String) {
    contentfulPage(id: { eq: $id }) {
      url
      titlepage
      linkedIntitle
      githubtitle
      heroheader
      templates
      imagehero {
        gatsbyImage(width: 2000)
        gatsbyImageData(layout: CONSTRAINED)
      }
      content {
        raw
      }
      cardContent {
        raw
      }
      listText {
        raw
      }
    }
  }
`

export default Page
