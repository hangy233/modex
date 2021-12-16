import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';
import axios from 'axios';
import { getLanguage } from '../utils';
import { LAN, VERSION } from '../utils/consts';

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache()
});

type PmName = { id: any; pokemon_v2_pokemonspeciesnames: { name: any; }[]; };

// Also fetch types?
export async function fetchPokemonNames({gen = 1, lan = LAN.en}: {gen?: number, lan?: LAN} = {}) {
  const res =  await client
    .query({
      query: gql`
      query gen1 {
        names: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {id: {_eq: ${gen}}}}, order_by: {id: asc}) {
          id
          pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: ${lan}}}) {
            language_id
            name
            pokemon_v2_language {
              name
            }
          }
        }
      }`
    });
  
  // return res.data.names.map((item: PmName) => ({nationalId: item.id, name: item.pokemon_v2_pokemonspeciesnames[0].name}));

  const returnValue: {[key: string]: string} = {};
  for (const pm of res.data.names) {
    returnValue[String(pm.id)] = pm.pokemon_v2_pokemonspeciesnames[0].name;
  }
  return returnValue;
}

// TODO doesn't have all languages in all versions.
export async function fetchPokemonDescription({nationalId, lan = LAN.en, version = VERSION.red}: {nationalId: number, lan?: LAN, version?: VERSION}) {
  const {data} =  await client
    .query({
      query: gql`
      query info {
      infos: pokemon_v2_pokemonspecies(where: {id: {_eq: ${nationalId}}}) {
        entry: pokemon_v2_pokemonspeciesflavortexts(where: {language_id: {_eq: ${lan}}, version_id: {_eq: ${version}}}) {
          entry: flavor_text
        }
        genus: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: ${lan}}}) {
          genus
        }
      }
    }`
  });
  const info = data.infos[0];
  const {entry} = info.entry[0];
  const {genus} = info.genus[0];

  return {
    [`${nationalId}_${version}_entry`]: entry,
    [`${nationalId}_${version}_genus`]: genus,
  };
}

export async function fetchPokemonInfo({nationalId}: {nationalId: number}) {
  const {data} =  await client
    .query({
      query: gql`
      query info {
        infos: pokemon_v2_pokemonspecies(where: {id: {_eq: ${nationalId}}}) {
          base:pokemon_v2_pokemons(where: {is_default: {_eq: true}}) {
            height
            weight
          }
          hasGenderDifferences: has_gender_differences
        }
      }`
    });
  
  const info = data.infos[0];
  const {height, weight} = info.base[0];
  const {hasGenderDifferences} = info;

  return {
    height,
    weight,
    hasGenderDifferences,
  };
};

export async function fetchUiTexts(lan: LAN = LAN.en): Promise<{[key: string]: string}> {
  const res = await axios.get(`https://storage.googleapis.com/retrodex/i18n/locales/${getLanguage(lan)?.code}.json`);
  return res.data;
}