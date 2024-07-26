import { store, RootState } from '../../store/store';

describe('Redux Store', () => {
  it('should have the correct reducers', () => {
    const rootReducer = store.getState();

    expect(rootReducer).toHaveProperty('pokemons');
    expect(rootReducer).toHaveProperty('selected');
  });

  it('should initialize with the correct default state', () => {
    const rootState: RootState = store.getState();

    expect(rootState.pokemons).toEqual({
      count: 0,
      pokemonData: [],
      isLoading: true,
    });

    expect(rootState.selected).toEqual({
      amount: 0,
      selectedData: [],
    });
  });
});
