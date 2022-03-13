import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'

import { SiteLayout } from '@/layout'

import {
  NinetailedProvider,
} from '@ninetailed/experience.js-next';

import { defaultSEO } from '../next-seo.config'
import { theme } from '../styles/theme'
import '../styles/css/global.css'

export default function App({ Component, pageProps }) {
  const getLayout =
    Component.getLayout || ((page) => <SiteLayout>{page}</SiteLayout>)

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
            clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID ?? ''}
            environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? ''}
            url={process.env.NEXT_PUBLIC_NINETAILED_URL ?? ''}
          >
      {getLayout(<Component {...pageProps} />)}
      </NinetailedProvider>
    </ChakraProvider>
  )
}
