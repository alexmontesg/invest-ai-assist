import { useState } from 'react';
import {
  Container,
  Field,
  Fieldset,
  Flex,
  HStack,
  IconButton,
  Input,
  List,
  Separator,
  Stack,
} from '@chakra-ui/react';
import { CiSquarePlus, CiTrash } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';

import useWatchlist from '@/watchlist/hooks/useWatchlist';

export default function Watchlist() {
  const { t } = useTranslation('translation', { keyPrefix: 'watchlist' });
  const [newAsset, setNewAsset] = useState('');
  const { assets, handleAdd, handleRemove } = useWatchlist();

  return (
    <Container as="aside" maxW="96">
      <Stack gap="4">
        <List.Root variant="plain">
          {assets.map((asset) => (
            <List.Item key={asset} mb="4">
              <Flex gap="6" align="center" width="96" justify="space-between">
                <span>{t(asset)}</span>
                <IconButton
                  onClick={() => handleRemove(asset)}
                  alignSelf="end"
                  size="md"
                  colorPalette="red"
                  aria-label={t('button.remove', { asset })}
                >
                  <CiTrash />
                </IconButton>
              </Flex>
            </List.Item>
          ))}
        </List.Root>

        <Separator />

        <HStack align="end" gap="6" justify="space-between">
          <Fieldset.Root>
            <Fieldset.Content>
              <Field.Root>
                <Field.Label>{t('new.asset')}</Field.Label>
                <Input
                  name="stock"
                  placeholder="AAPL, MSFT..."
                  value={newAsset}
                  onChange={(e) => setNewAsset(e.target.value)}
                />
              </Field.Root>
            </Fieldset.Content>
          </Fieldset.Root>

          <IconButton
            onClick={() => handleAdd(newAsset)}
            alignSelf="end"
            size="md"
            colorPalette="green"
            aria-label={t('button.add')}
          >
            <CiSquarePlus />
          </IconButton>
        </HStack>
      </Stack>
    </Container>
  );
}
