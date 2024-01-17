import { graphql, useStaticQuery } from "gatsby"

const useSocialLinks = () => {
  const { allContentfulSocialLinks } = useStaticQuery(graphql`
    query {
      allContentfulSocialLinks {
        edges {
          node {
            githubLink
            linkedInLink
            id
            iconLinkedin {
              file {
                url
              }
            }
            iconGithub {
              file {
                url
              }
            }
          }
        }
      }
    }
  `)

  return allContentfulSocialLinks.edges
}

export default useSocialLinks
