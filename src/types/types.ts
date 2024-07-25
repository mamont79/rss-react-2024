export type PokemonUrlData = {
  name: string;
  url: string;
};

export type PokemonTypes = {
  type: { name: string };
};

export type PokemonSearchProps = {
  onPokemoDataChange: (data: PokemonData[]) => void;
};

export type DisplayProps = { pokemonsData: PokemonData[] };

export type PokemonCardProps = {
  pokemonsCard: PokemonUrlData;
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type PokemonSearchState = {
  searchValue: string;
};

export type PokemonCatalogState = {
  pokemonsData: PokemonData[];
};

export type PokemonData = {
  id: number;
  name: string;
  types: string;
};
