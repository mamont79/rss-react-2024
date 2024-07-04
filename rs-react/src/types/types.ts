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

export type PokemonCardProps = { pokemonsCard: PokemonUrlData; key: number };

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

export type MainContextType = {
  data: Array<PokemonUrlData>;
  updateData: (newData: Array<PokemonUrlData>) => void;
};
