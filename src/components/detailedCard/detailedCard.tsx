type DetailedProps = {
  changeActive(input: boolean): void;
  destroyPokemon(updateId: number | null): void;
  pokemonId: number | null;
};

export const DetailedCard = ({
  changeActive,
  destroyPokemon,
  pokemonId,
}: DetailedProps) => {
  const onCloseCard = () => {
    changeActive(false);
    destroyPokemon(null);
  };

  return (
    <div>
      <p>It's detailed card for {pokemonId}</p>
      <p onClick={onCloseCard}>Close it</p>
    </div>
  );
};
