import { graphql, useStaticQuery } from "gatsby"

const useNavigation = () => {
  const { allContentfulPage } = useStaticQuery(graphql`
    query {
      allContentfulPage(sort: { url: ASC }) {
        edges {
          node {
            titlepage
            url
            id
          }
        }
      }
    }
  `)

  return allContentfulPage.edges
}

export default useNavigation
