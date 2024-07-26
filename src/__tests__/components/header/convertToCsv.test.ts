import { convertToCSV } from '../../../components/header/converToCsv';
import { SelectedPokemonType } from '../../../types/types';

describe('convertToCSV', () => {
  const originalCreateObjectURL = URL.createObjectURL;
  const mockCreateObjectURL = jest.fn();

  beforeAll(() => {
    URL.createObjectURL = mockCreateObjectURL;
  });

  afterAll(() => {
    URL.createObjectURL = originalCreateObjectURL;
  });

  afterEach(() => {
    mockCreateObjectURL.mockReset();
  });

  it('returns an empty string for an empty array', () => {
    const result = convertToCSV([]);
    expect(result).toBe('');
  });

  it('converts an array with a single item to CSV format and creates a URL', () => {
    const items: Array<SelectedPokemonType> = [
      {
        id: '1',
        name: 'Bulbasaur',
        url: 'some.url',
        height: '5',
        weight: '10',
        type: 'Grass+Poison',
      },
    ];
    const expectedCsvContent =
      'id,name,url,height,weight,type\n1,Bulbasaur,some.url,5,10,Grass+Poison';
    const blob = new Blob([expectedCsvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const expectedUrl = 'blob:http://example.com/123456';
    mockCreateObjectURL.mockReturnValue(expectedUrl);

    const result = convertToCSV(items);

    expect(mockCreateObjectURL).toHaveBeenCalledWith(blob);
    expect(result).toBe(expectedUrl);
  });

  it('converts an array with multiple items to CSV format', () => {
    const items: Array<SelectedPokemonType> = [
      {
        id: '1',
        name: 'Bulbasaur',
        url: 'some.url',
        height: '5',
        weight: '10',
        type: 'Grass+Poison',
      },
      {
        id: '2',
        name: 'Bulbasaur',
        url: 'some.url',
        height: '5',
        weight: '10',
        type: 'Grass+Poison',
      },
      {
        id: '3',
        name: 'Bulbasaur',
        url: 'some.url',
        height: '5',
        weight: '10',
        type: 'Grass+Poison',
      },
    ];
    const expectedCsvContent = `id,name,url,height,weight,type\n1,Bulbasaur,some.url,5,10,Grass+Poison\n2,Bulbasaur,some.url,5,10,Grass+Poison\n3,Bulbasaur,some.url,5,10,Grass+Poison`;
    const blob = new Blob([expectedCsvContent], {
      type: 'text/csv;charset=utf-8;',
    });
    const expectedUrl = 'blob:http://example.com/123456';
    mockCreateObjectURL.mockReturnValue(expectedUrl);

    const result = convertToCSV(items);

    expect(mockCreateObjectURL).toHaveBeenCalledWith(blob);
    expect(result).toBe(expectedUrl);
  });
});
