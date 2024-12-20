import instance from './instance';

const pokemonsPerPage = 20;

const getPokemons = async (page = 1) => {
  try {
    const offset = (page - 1) * pokemonsPerPage;
    const { data } = await instance.get(`/`, {
      params: { offset: offset, limit: pokemonsPerPage },
    });
    return data;
  } catch {
    throw new Error(`Can't get data`);
  }
};


export default getPokemons;
