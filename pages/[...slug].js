import { gql } from 'graphql-request'
import get from 'lodash/get'

import { getPageLayout } from '@/layout'
import { hygraphClient } from '@/lib/_client'
import { pageQuery } from '@/lib/_queries'
import { parsePageData } from '@/utils/_parsePageData'
import Wrapper from '@/components/wrapper'

export default function Page({ page }) {
  return <Wrapper {...page} />
}

export async function getStaticProps({ locale, params, preview = false }) {
  const slug = get(params, 'slug', []).join('/')
  const client = hygraphClient(preview)
  const { page } = await client.request(pageQuery, {
    locale,
    slug
  })

  if (!page) {
    return {
      notFound: true
    }
  }

  const parsedPageData = await parsePageData(page)

  return {
    props: {
      page: parsedPageData,
      preview
    },
    revalidate: 5 // Demo purposes only!
  }
}

export async function getStaticPaths({ locales }) {
  let paths = []

  const client = hygraphClient()

  const { pages } = await client.request(gql`
    {
      pages(where: { slug_not_in: ["home", "blog"] }) {
        slug
      }
    }
  `)

  for (const locale of locales) {
    paths = [
      ...paths,
      ...pages.map((page) => ({
        params: { slug: page.slug.split('/') },
        locale
      }))
    ]
  }

  return {
    paths,
    fallback: 'blocking'
  }
}

Page.getLayout = getPageLayout
