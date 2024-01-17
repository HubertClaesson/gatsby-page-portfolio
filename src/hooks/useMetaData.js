import { graphql, useStaticQuery } from "gatsby"

const useMetaData = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          description
        }
      }
    }
  `)

  return site.siteMetadata
}

export default useMetaData
