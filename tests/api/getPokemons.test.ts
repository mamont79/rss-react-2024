import instance from '../../src/api/instance';
import getPokemons from '../../src/api/getPokemons';
jest.mock('../../src/api/instance.ts');

it('should return a successful response', async () => {
  const mockResponse = {
    data: {
      results: [{ name: 'pikachu', url: 'some.url' }],
    },
  };

  (instance.get as jest.Mock).mockResolvedValue(mockResponse);

  const pokemonData = await getPokemons();

  expect(mockResponse.data.results).toEqual(pokemonData);
});

it('should throw an error when the request fails', async () => {
  (instance.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

  await expect(getPokemons()).rejects.toThrow("Can't get data");
});
