import { FormatNumber } from '@chakra-ui/react';
import { Money, type SerializedMoney } from '@/domain/money';

type Props = {
  value: number | SerializedMoney;
  style: 'number' | 'currency';
};

export default function OrderFieldValue({ value, style }: Props) {
  if (style === 'number') {
    return <FormatNumber value={value as number} />;
  }

  const money = Money.fromJson(value as SerializedMoney);
  return (
    <FormatNumber
      value={money.amount}
      style="currency"
      currency={money.currency}
    />
  );
}
