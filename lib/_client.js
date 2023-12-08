import { GraphQLClient } from 'graphql-request'

const hygraphClient = (preview = false) =>
  new GraphQLClient(process.env.NEXT_PUBLIC_HYGRAPH_URL, {
    headers: {
      ...(process.env.HYGRAPH_TOKEN && {
        Authorization: `Bearer ${
          preview
            ? process.env.HYGRAPH_PREVIEW_TOKEN
            : process.env.HYGRAPH_TOKEN
        }`
      })
    }
  })

export { hygraphClient }
