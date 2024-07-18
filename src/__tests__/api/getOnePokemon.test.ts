import instance from '../../api/instance';
import getOnePokemon from '../../api/getOnePokemon';
jest.mock('../../api/instance');

describe('getOnePokemon', () => {
  it('should return a successful response for a given Pokemon ID', async () => {
    const mockResponse = {
      data: { name: 'pikachu', id: 25, url: 'some.url' },
    };

    (instance.get as jest.Mock).mockResolvedValue(mockResponse);

    const pokemonData = await getOnePokemon(25);

    expect(mockResponse.data).toEqual(pokemonData);
  });

  it('should throw an error when the request fails', async () => {
    (instance.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    await expect(getOnePokemon(1)).rejects.toThrow("Can't get data");
  });
});
