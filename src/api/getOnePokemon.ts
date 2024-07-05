import instance from './instance';

const getOnePokemon = async (id: number | string) => {
  try {
    const { data } = await instance.get(`/${id}`);
    return data;
  } catch {
    throw new Error(`Can't get data`);
  }
};

export default getOnePokemon;
