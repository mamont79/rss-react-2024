export type DetailedProps = {
  changeActive?(input: boolean): void;
  destroyPokemon?(updateId: number | null): void;
  pokemonId?: number | null;
};

export type PokemonDetailedType = {
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: { front_default: string };
  stats: StatsType[];
  types: TypesType[];
};

export type StatsType = {
  base_stat: number;
  stat: { name: string };
};

export type TypesType = {
  type: { name: string };
};
