import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AbsoluteCenter,
  Accordion,
  DataList,
  Flex,
  FormatNumber,
  Heading,
  HStack,
  ProgressCircle,
} from '@chakra-ui/react';

import type { DebtItem } from '@/user/types/user';

type DebtItemProps = {
  item: DebtItem;
};

type DebtListProps = {
  items: Array<DebtItem>;
};

function UserDebtItem({ item }: DebtItemProps) {
  const percentagePaid = (1 - item.outstanding.value / item.total.value) * 100;
  const { t } = useTranslation('translation', {
    keyPrefix: 'user.debt',
  });

  return (
    <>
      <Accordion.ItemTrigger>
        <Heading as="h3" flex="1" cursor="pointer">
          {item.givenName}
        </Heading>
        <Accordion.ItemIndicator />
      </Accordion.ItemTrigger>
      <Accordion.ItemContent py={8}>
        <HStack gap={8}>
          <ProgressCircle.Root size="xl" value={percentagePaid}>
            <ProgressCircle.Circle>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <ProgressCircle.ValueText fontSize="xs" />
            </AbsoluteCenter>
          </ProgressCircle.Root>

          <DataList.Root orientation="horizontal">
            <DataList.Item>
              <DataList.ItemLabel>{t('outstanding')}</DataList.ItemLabel>
              <DataList.ItemValue>
                <Flex>
                  <FormatNumber
                    value={item.outstanding.value}
                    style="currency"
                    currency={item.outstanding.currencyCode}
                  />{' '}
                  /{' '}
                  <FormatNumber
                    value={item.total.value}
                    style="currency"
                    currency={item.total.currencyCode}
                  />
                </Flex>
              </DataList.ItemValue>
            </DataList.Item>

            <DataList.Item>
              <DataList.ItemLabel>{t('term')}</DataList.ItemLabel>
              <DataList.ItemValue>
                <Flex>
                  <FormatNumber value={item.remainingTerm} /> /{' '}
                  <FormatNumber
                    value={item.totalTerm}
                    style="unit"
                    unit="month"
                    unitDisplay="long"
                  />
                </Flex>
              </DataList.ItemValue>
            </DataList.Item>

            <DataList.Item>
              <DataList.ItemLabel>{t('interest')}</DataList.ItemLabel>
              <DataList.ItemValue>
                <FormatNumber
                  value={item.interestRate}
                  style="percent"
                  maximumFractionDigits={2}
                />
              </DataList.ItemValue>
            </DataList.Item>
          </DataList.Root>
        </HStack>
      </Accordion.ItemContent>
    </>
  );
}

function UserDebtList({ items }: DebtListProps) {
  return (
    <Accordion.Root multiple>
      {items.map((item) => {
        return (
          <Accordion.Item key={item.id} value={item.id}>
            <UserDebtItem item={item} />
          </Accordion.Item>
        );
      })}
    </Accordion.Root>
  );
}

export default memo(UserDebtList);
