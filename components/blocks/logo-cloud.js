import { Box, Flex, Heading } from '@chakra-ui/react'
import Image from 'next/image'

export default function LogoCloud({ companies, logoCloudTitle }) {
  if (!(logoCloudTitle || companies || companies.length)) return null

  return (
    <Box bg="indigo.700">
      <Box maxW="7xl" mx="auto" py={[16, 20]} px={[4, 6, null, 8]}>
        <Heading as="h2" fontSize="3xl" fontWeight="extrabold" color="white">
          {logoCloudTitle}
        </Heading>

        <Box display="flow-root" mt={{ base: 8, lg: 10 }}>
          <Flex
            mt={-4}
            ml={{ base: -8, lg: -4 }}
            flexWrap="wrap"
            justifyContent="space-around"
            gap="24px"
          >
            {companies.map((company) => (
              <Flex
                key={company.id}
                justifyContent="center"
                alignItems="center"
                width="150px"
                height="150px"
                position="relative"
              >
                <Image
                  src={company.logo.url}
                  alt={company.logo.handle}
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                  fill
                />
              </Flex>
            ))}
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}
