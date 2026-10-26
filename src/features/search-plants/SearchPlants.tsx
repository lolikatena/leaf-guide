import { TextInput } from '@mantine/core';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

// поле поиска, своё состояние не хранит - всё приходит пропсами
export default function SearchPlants({ value, onChange }: Props) {
  return (
    <TextInput
      placeholder="Начните вводить название растения"
      value={value}
      onChange={(event) => onChange(event.currentTarget.value)}
      size="md"
      mb={24}
    />
  );
}
