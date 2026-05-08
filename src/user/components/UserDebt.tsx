import { memo, useState } from 'react';
import {
  DataList,
  FormatNumber,
  Heading,
  LocaleProvider,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

import userDebt from '@/user/mocks/userDebt.json';
import type { UserDebt } from '@/user/types/user';
import UserDebtList from '@/user/components/UserDebtList';
import { Money } from '@/domain/money';

function UserDebt() {
  const [debt] = useState<UserDebt>(userDebt);
  const { t, i18n } = useTranslation('translation', {
    keyPrefix: 'user.debt',
  });

  const totalDebt = debt.items
    .map((item) => item.outstanding)
    .reduce(
      (prev, curr) => Money.fromJson(prev).add(Money.fromJson(curr)).toJSON(),
      Money.fromUnit(0, debt.items[0].outstanding.currencyCode).toJSON(),
    );

  const averageInterest =
    debt.items
      .map((item) => item.interestRate * item.outstanding.value)
      .reduce((prev, curr) => prev + curr, 0) / totalDebt.value;

  return (
    <VStack as="section" gap={8} alignItems="start">
      <Heading as="h2">{t('title')}</Heading>
      <LocaleProvider locale={i18n.language}>
        <DataList.Root orientation="horizontal">
          <DataList.Item>
            <DataList.ItemLabel>{t('total')}</DataList.ItemLabel>
            <DataList.ItemValue>
              <FormatNumber
                value={totalDebt.value}
                style="currency"
                currency={totalDebt.currencyCode}
              />
            </DataList.ItemValue>
          </DataList.Item>

          <DataList.Item>
            <DataList.ItemLabel>{t('avg_interest')}</DataList.ItemLabel>
            <DataList.ItemValue>
              <FormatNumber
                value={averageInterest}
                style="percent"
                maximumFractionDigits={2}
              />
            </DataList.ItemValue>
          </DataList.Item>
        </DataList.Root>
        <UserDebtList items={debt.items} />
      </LocaleProvider>
    </VStack>
  );
}

export default memo(UserDebt);
