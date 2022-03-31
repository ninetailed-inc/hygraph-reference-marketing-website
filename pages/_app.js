import { useMemo } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import Cookies from 'js-cookie'
import {
  NinetailedProvider,
  NinetailedSsrPlugin,
  NINETAILED_ANONYMOUS_ID_COOKIE
} from '@ninetailed/experience.js-next'
import { NinetailedGoogleAnalyticsPlugin } from '@ninetailed/experience.js-plugin-google-analytics'
// import { NinetailedPreviewPlugin } from '@ninetailed/experience.js-plugin-preview'

import { SiteLayout } from '@/layout'

import { defaultSEO } from '../next-seo.config'
import { theme } from '../styles/theme'
import '../styles/css/global.css'

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)

  const audiences = pageProps.ninetailed?.audiences || []
  const profile = useMemo(() => {
    const id = Cookies.get(NINETAILED_ANONYMOUS_ID_COOKIE)
    const profile = {
      id,
      random: 0,
      audiences,
      traits: {},
      session: {
        isReturningVisitor: false,
        count: 0,
        landingPage: { path: '', query: {}, referrer: '', search: '', url: '' },
        activeSessionLength: 0,
        averageSessionLength: 0
      },
      location: {}
    }
    return profile
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...defaultSEO} />
      <NinetailedProvider
        // // analyticsPlugins={{
        // //   googleAnalytics: {
        // //     trackingId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? '',
        // //     actionTemplate: 'Audience:{{ audience.name }}',
        // //     labelTemplate:
        // //       '{{ baselineOrVariant }}:{{ component.__typename }} - {{ component.id }}',
        // //   },
        // // }}
        profile={profile}
        clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID ?? ''}
        environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? ''}
        url={process.env.NEXT_PUBLIC_NINETAILED_URL ?? ''}
        plugins={[
          NinetailedSsrPlugin(),
          // NinetailedPreviewPlugin({ clientId: '085abef3-67a9-463f-a22d-6c8db44218c5', secret: '58ec390d-83ea-4e76-9ffd-8c22b63f71b0' }),
          NinetailedGoogleAnalyticsPlugin({ trackingId: 'UA-155' })
        ]}
      >
        {getLayout(<Component {...pageProps} />)}
      </NinetailedProvider>
    </ChakraProvider>
  )
}
