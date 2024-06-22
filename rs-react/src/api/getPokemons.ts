import instance from '.';

const getPokemons = async () => {
  try {
    const { data } = await instance.get(`/`);
    console.log(data.results);
    return data.results;
  } catch {
    throw new Error(`Can't get data`);
  }
};

export default getPokemons;