import { ChakraProvider } from '@chakra-ui/react'
import { DefaultSeo } from 'next-seo'
import { NinetailedProvider } from '@ninetailed/experience.js-next'
import { NinetailedPreviewPlugin } from '@ninetailed/experience.js-plugin-preview'

import { SiteLayout } from '@/layout'

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
        clientId={process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID ?? ''}
        environment={process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? ''}
        plugins={[
          ...(pageProps.preview
            ? [
                NinetailedPreviewPlugin({
                  clientId:
                    process.env.NEXT_PUBLIC_NINETAILED_MANAGEMENT_CLIENT_ID ??
                    '',
                  secret:
                    process.env.NEXT_PUBLIC_NINETAILED_MANAGEMENT_SECRET ?? '',
                  environment:
                    process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT ?? ''
                })
              ]
            : [])
        ]}
      >
        {getLayout(<Component {...pageProps} />)}
      </NinetailedProvider>
    </ChakraProvider>
  )
}
