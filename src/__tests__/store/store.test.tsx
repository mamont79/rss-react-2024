import {
  getOnePokemonAsync,
  getPokemonsAsync,
  setPokemonData,
  setTotalAmount,
} from '../../store/pokemons/pokemonSlice';
import {
  addSelected,
  removeFromSelected,
  resetAll,
} from '../../store/pokemons/selectedSlice';
import { store, RootState } from '../../store/store';
import { PokemonUrlData, SelectedPokemonType } from '../../types/types';
import {
  pageIncrement,
  pageDecrement,
  setPage,
  resetPage,
} from '../../store/pokemons/pageSlice';
import '@testing-library/jest-dom';

describe('Redux Store', () => {
  it('should have the correct reducers', () => {
    const rootReducer = store.getState();

    expect(rootReducer).toHaveProperty('pokemons');
    expect(rootReducer).toHaveProperty('selected');
    expect(rootReducer).toHaveProperty('page');
    expect(rootReducer).toHaveProperty('pokemonsApi');
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

    expect(rootState.page).toEqual({
      value: 1,
    });

    expect(rootState.pokemonsApi).toBeDefined();
  });

  it('should handle setTotalAmount action', () => {
    store.dispatch(setTotalAmount(150));
    const state: RootState = store.getState();
    expect(state.pokemons.count).toBe(150);
  });

  it('should handle setPokemonData action', () => {
    const pokemonData: PokemonUrlData[] = [
      { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
    ];
    store.dispatch(setPokemonData(pokemonData));
    const state: RootState = store.getState();
    expect(state.pokemons.pokemonData).toEqual(pokemonData);
  });

  it('should handle resetAll action', () => {
    store.dispatch(resetAll());
    const state: RootState = store.getState();
    expect(state.selected.amount).toBe(0);
    expect(state.selected.selectedData).toEqual([]);
  });

  it('should handle addSelected action', () => {
    const selectedData: SelectedPokemonType = {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      id: '1',
      height: '7',
      weight: '69',
      type: 'grass+poison',
    };
    store.dispatch(addSelected([selectedData]));
    const state: RootState = store.getState();
    expect(state.selected.amount).toBe(1);
    expect(state.selected.selectedData).toContainEqual(selectedData);
  });

  it('should handle removeFromSelected action', () => {
    const selectedData: SelectedPokemonType = {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      id: '1',
      height: '7',
      weight: '69',
      type: 'grass+poison',
    };
    store.dispatch(addSelected([selectedData]));
    store.dispatch(removeFromSelected([selectedData]));
    const state: RootState = store.getState();
    expect(state.selected.selectedData).not.toContainEqual(selectedData);
    expect(state.selected.amount).toBe(0);
  });

  it('should handle getPokemonsAsync thunk', async () => {
    await store.dispatch(getPokemonsAsync(1));
    const state: RootState = store.getState();
    expect(state.pokemons.isLoading).toBe(false);
    expect(state.pokemons.pokemonData.length).toBeGreaterThan(0);
  });

  it('should handle getOnePokemonAsync thunk', async () => {
    await store.dispatch(getOnePokemonAsync('pikachu'));
    const state: RootState = store.getState();
    expect(state.pokemons.isLoading).toBe(false);
    expect(state.pokemons.pokemonData[0].name).toBe('pikachu');
  });

  it('should handle pageIncrement action', () => {
    store.dispatch(pageIncrement());
    const state: RootState = store.getState();
    expect(state.page.value).toBe(2);
  });

  it('should handle pageDecrement action', () => {
    store.dispatch(pageIncrement());
    store.dispatch(pageDecrement());
    const state: RootState = store.getState();
    expect(state.page.value).toBe(1);
  });

  it('should handle setPage action', () => {
    store.dispatch(setPage(5));
    const state: RootState = store.getState();
    expect(state.page.value).toBe(5);
  });

  it('should handle resetPage action', () => {
    store.dispatch(setPage(3));
    store.dispatch(resetPage());
    const state: RootState = store.getState();
    expect(state.page.value).toBe(1);
  });
});
