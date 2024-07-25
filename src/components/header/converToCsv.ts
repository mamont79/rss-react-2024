import { SelectedPokemonType } from '../../types/types';

export const convertToCSV = (items: Array<SelectedPokemonType>): string => {
  if (items.length === 0) {
    return '';
  }

  const keys = Object.keys(items[0]);
  const header = keys.join(',');
  const rows = items.map((item) =>
    keys.map((key) => item[key as keyof SelectedPokemonType]).join(',')
  );

  return [header, ...rows].join('\n');
};
