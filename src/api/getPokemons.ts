import instance from './instance';

const getPokemons = async () => {
  try {
    const { data } = await instance.get(`/`);
    return data.results;
  } catch {
    throw new Error(`Can't get data`);
  }
};

export default getPokemons;
