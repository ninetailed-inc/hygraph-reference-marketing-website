import { getPageLayout } from '@/layout'
import { graphcmsClient } from '@/lib/_client'
import { pageQuery } from '@/lib/_queries'
import { parsePageData } from '@/utils/_parsePageData'
import Wrapper from '@/components/wrapper'

export default function IndexPage({ page }) {
  return <Wrapper {...page} />
}

export async function getStaticProps({ locale, preview = false }) {
  console.log({ params })

  const isPersonalized = get(params, 'slug.0', '').startsWith(';')
  console.log({ isPersonalized })

  const audiences = isPersonalized
    ? get(params, 'slug.0', '').split(';')[1].split(',')
    : []

  const client = graphcmsClient(preview)

  const { page } = await client.request(pageQuery, {
    locale,
    slug: 'home'
  })

  const parsedPageData = await parsePageData(page)

  return {
    props: {
      page: parsedPageData,
      preview
    },
    revalidate: 10
  }
}

IndexPage.getLayout = getPageLayout
