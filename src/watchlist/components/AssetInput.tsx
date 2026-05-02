import { memo, useState } from 'react';
import { Field, Fieldset, HStack, IconButton, Input } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { CiSquarePlus } from 'react-icons/ci';

type AssetInputProps = { handleAdd: (asset: string) => void };

function AssetInput({ handleAdd }: AssetInputProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'watchlist' });
  const [newAsset, setNewAsset] = useState('');

  return (
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
  );
}

export default memo(AssetInput);
