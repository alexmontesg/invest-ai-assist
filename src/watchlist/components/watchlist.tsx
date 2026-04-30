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
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { RootState } from '@/store/store';
import { addAsset, removeAsset } from '@/watchlist/slices/watchlist';
import { useState } from 'react';

export default function Watchlist() {
  const dispatch = useDispatch();
  const assets = useSelector((state: RootState) => state.watchlist.assets);
  const { t } = useTranslation('translation', { keyPrefix: 'watchlist' });
  const [newAsset, setNewAsset] = useState('');

  const handleRemove = (asset: string) => dispatch(removeAsset(asset));
  const handleAdd = () => dispatch(addAsset(newAsset));

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
            onClick={() => handleAdd()}
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
