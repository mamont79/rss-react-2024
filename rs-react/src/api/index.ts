const apiLink = 'https://pokeapi.co/api/v2/pokemon/';

export const getPokemons = async () => {
  const info = await fetch(apiLink);
  const data = await info.json();

  console.log(data);

  return data;
};
