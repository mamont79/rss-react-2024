import instance from './instance';

const searchPokemons = async (name: string) => {
  try {
    const { data } = await instance.get(`/name/`, { params: { name: name } });
    console.log(data.results);
    return data.results;
  } catch {
    throw new Error(`Can't get data`);
  }
};

export default searchPokemons;
