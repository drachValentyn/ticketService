import  locationsInstatnce, { Locations } from "../locations";
import { formatDate } from "../../helpers/date";
import api, { Api } from "../../services/apiService";

const countries = [{ code: 'UKR', name: 'Ukraine'}];
const cities = [{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }];
const airlines = [{ country_code: 'UKR', name: 'Airlines', code: 'AVIA' }];

jest.mock('../../services/apiService.js', () => {
  const mockApi = {
    countries: jest.fn(() => Promise.resolve([{ code: 'UKR', name: 'Ukraine'}])),
    cities: jest.fn(() => Promise.resolve([{ country_code: 'UKR', name: 'Kharkiv', code: 'KH' }])),
    airlines: jest.fn(() => Promise.resolve([{ country_code: 'UKR', name: 'Airlines', code: 'AVIA' }])),
  }

  return {
    Api: jest.fn(() => mockApi)
  }
});

const apiService = new Api();

describe('Location store tests', () => {
  beforeEach(() => {
    locationsInstatnce.countries = locationsInstatnce.serializeCountries(countries);
    locationsInstatnce.cities = locationsInstatnce.serializeCities(cities);
  })

  it('Check that locationInstance is instance of Locations class', () => {

    expect(locationsInstatnce).toBeInstanceOf(Locations)
  })

  it('Success Locations instance create', () => {
    const instance = new Locations(api, { formatDate });

    expect(instance.countries).toBe(null);
    expect(instance.cities).toBe(null);
    expect(instance.shortCities).toEqual({});
    expect(instance.lastSearch).toEqual({});
    expect(instance.airlines).toEqual({});
    expect(instance.formatDate).toEqual(formatDate);
  })

  it('Check correct countries serialize', () => {
    const res = locationsInstatnce.serializeCountries(countries);
    const expectedData = {
      UKR: { code: 'UKR', name: 'Ukraine'}
    }

    expect(res).toEqual(expectedData);
  })

  it('Check countries serialize with incorrect data', () => {
    const res = locationsInstatnce.serializeCountries(null);
    const expectedData = {}

    expect(res).toEqual(expectedData);
  })

  it('Check correct cities serialize', () => {
    const res = locationsInstatnce.serializeCities(cities);
    const expectedData = {
      KH: {
          country_code: 'UKR',
          name: 'Kharkiv',
          code: 'KH',
          country_name: 'Ukraine',
          full_name: 'Kharkiv, Ukraine'
        }
    }

    expect(res).toEqual(expectedData);
  })

  it('Check correct get city by code', () => {
    const res = locationsInstatnce.getCityNameByCode('KH');

    expect(res).toBe('Kharkiv');
  })

  it('Check correct init method call', () => {
    const instance = new Locations(apiService, { formatDate });

    expect(instance.init()).resolves.toEqual([countries, cities, airlines])
  })
})