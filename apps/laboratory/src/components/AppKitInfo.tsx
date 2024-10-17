import * as React from 'react'
import {
  StackDivider,
  Card,
  CardHeader,
  Heading,
  CardBody,
  Box,
  Stack,
  Text
} from '@chakra-ui/react'

type AppKitInfoProps = {
  address?: string
  chainId?: number
  clientId: string | null
}

export function AppKitInfo({ address, chainId, clientId }: AppKitInfoProps) {
  return (
    <Card marginTop={10} marginBottom={10}>
      <CardHeader>
        <Heading size="md">Account Information</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase" pb="2">
              Address
            </Heading>
            <Text data-testid="w3mx-address">{address}</Text>
          </Box>

          <Box>
            <Heading size="xs" textTransform="uppercase" pb="2">
              Chain Id
            </Heading>
            <Text data-testid="w3mx-chain-id">{chainId}</Text>
          </Box>

          {clientId && (
            <Box>
              <Heading size="xs" textTransform="uppercase" pb="2">
                Relay Client ID
              </Heading>
              <Text data-testid="w3mx-chain-id">{clientId}</Text>
            </Box>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}
