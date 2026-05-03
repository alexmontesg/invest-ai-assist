import { Alert, Button, Container, Text, VStack } from '@chakra-ui/react';
import { getErrorMessage, type FallbackProps } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';

export default function ErrorView({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'error.view' });

  return (
    <Container>
      <VStack gap="8" alignItems="start">
        <Alert.Root status="error">
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title>{t('title')}</Alert.Title>
            <Alert.Description>{t('description')}</Alert.Description>
          </Alert.Content>
        </Alert.Root>

        <Text textStyle="5xl" as="h1">
          {getErrorMessage(error)}
        </Text>

        <Button onClick={resetErrorBoundary}>{t('button')}</Button>
      </VStack>
    </Container>
  );
}
