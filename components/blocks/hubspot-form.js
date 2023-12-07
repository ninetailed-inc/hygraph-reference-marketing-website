import { VStack } from '@chakra-ui/react'

import { useNinetailed, useProfile } from '@ninetailed/experience.js-next'
import { useForm } from 'react-hook-form'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VisuallyHiddenInput
} from '@chakra-ui/react'

export default function HubspotForm({ hubspotFormId, hubspotPortalId }) {
  const { profile } = useProfile()
  const { identify } = useNinetailed()

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitSuccessful, isSubmitting, errors }
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${hubspotPortalId}/${hubspotFormId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            fields: [
              {
                objectTypeId: '0-1',
                name: 'firstname',
                value: data.firstname
              },
              {
                objectTypeId: '0-1',
                name: 'lastname',
                value: data.lastname
              },
              {
                objectTypeId: '0-2',
                name: 'name',
                value: data.companyname
              },
              {
                objectTypeId: '0-1',
                name: 'companysize',
                value: data.companysize
              },
              {
                objectTypeId: '0-1',
                name: 'email',
                value: data.email
              },
              {
                objectTypeId: '0-1',
                name: 'ninetailedid',
                value: data.ninetailedid
              },
              {
                objectTypeId: '0-1',
                name: 'ninetailed_organization_id',
                value: data.ninetailed_organization_id
              },
              {
                objectTypeId: '0-1',
                name: 'ninetailed_environment',
                value: data.ninetailed_environment
              }
            ]
          })
        }
      )
      const {
        ninetailedid,
        ninetailed_organization_id,
        ninetailed_environment,
        ...traitData
      } = data
      await identify('', traitData)
      if (window.dataLayer) {
        window.dataLayer.push({
          event: 'contact_form',
          company_size: data.companysize
        })
      }
    } catch (e) {
      setError('root.submissionError', {
        message: 'Submission error, see console'
      })
      console.error(e)
    }
  }

  return (
    <Container>
      {(isSubmitSuccessful || errors.root?.submissionError) && (
        <Alert status={isSubmitSuccessful ? 'success' : 'error'}>
          <AlertIcon />
          {isSubmitSuccessful && (
            <>
              <AlertTitle>Thanks for your submission!</AlertTitle>
              <AlertDescription>
                A team member will be assigned soon.
              </AlertDescription>
            </>
          )}
          {errors.root?.submissionError && (
            <>
              <AlertTitle>Hrmmm...</AlertTitle>
              <AlertDescription>
                {errors.root?.submissionError}
              </AlertDescription>
            </>
          )}
        </Alert>
      )}
      {!isSubmitSuccessful && profile && (
        <form
          id="contactForm"
          name="contactForm"
          onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
        >
          <VStack spacing="24px">
            <FormControl isInvalid={errors.firstname}>
              <FormLabel htmlFor="firstname">First Name</FormLabel>
              <Input
                id="firstname"
                focusBorderColor="indigo.600"
                {...register('firstname', { required: true })}
              />
              {errors.firstname && (
                <FormErrorMessage>First name is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.lastname}>
              <FormLabel htmlFor="lastname">Last Name</FormLabel>
              <Input
                id="lastname"
                focusBorderColor="indigo.600"
                {...register('lastname', { required: true })}
              />
              {errors.lastname && (
                <FormErrorMessage>Last name is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.companyname}>
              <FormLabel htmlFor="companyname">Company Name</FormLabel>
              <Input
                focusBorderColor="indigo.600"
                id="companyname"
                {...register('companyname', { required: true })}
              />
              {errors.companyname && (
                <FormErrorMessage>Company name is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.companysize}>
              <FormLabel htmlFor="companysize">Company Size</FormLabel>
              <Select
                id="companysize"
                {...register('companysize', { required: true })}
                defaultValue=""
              >
                <option disabled value="">
                  Please Select
                </option>
                <option value="1-50">1-50</option>
                <option value="51-200">51-200</option>
                <option value="201-500">201-500</option>
                <option value="501-1000">501-1000</option>
                <option value="1000-2000">1000-2000</option>
                <option value="more_than_2000">More than 2000</option>
              </Select>
              {errors.companysize && (
                <FormErrorMessage>Company size is required.</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Business Email</FormLabel>
              <Input
                id="email"
                focusBorderColor="indigo.600"
                {...register('email', {
                  required: true,
                  pattern:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                })}
              />
              {errors.email && (
                <FormErrorMessage>Email is required.</FormErrorMessage>
              )}
            </FormControl>
            <VisuallyHiddenInput
              id="ninetailedid"
              {...register('ninetailedid', {
                required: true,
                value: profile.id
              })}
            />
            <VisuallyHiddenInput
              id="ninetailed_organization_id"
              {...register('ninetailed_organization_id', {
                required: true,
                value: process.env.NEXT_PUBLIC_NINETAILED_CLIENT_ID
              })}
            />
            <VisuallyHiddenInput
              id="ninetailed_environment"
              {...register('ninetailed_environment', {
                required: true,
                value: process.env.NEXT_PUBLIC_NINETAILED_ENVIRONMENT || 'main'
              })}
            />
            <Button
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              colorScheme="indigo"
            >
              Submit
            </Button>
          </VStack>
        </form>
      )}
    </Container>
  )
}
