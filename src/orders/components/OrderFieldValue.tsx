import { FormatNumber } from '@chakra-ui/react';
import type { Money } from '@/domain/money';

type Props = {
  value: number | Money;
  style: 'number' | 'currency';
};

export default function OrderFieldValue({ value, style }: Props) {
  if (style === 'number') {
    return <FormatNumber value={value as number} />;
  }

  const money = value as Money;
  return (
    <FormatNumber
      value={money.amount}
      style="currency"
      currency={money.currency}
    />
  );
}
