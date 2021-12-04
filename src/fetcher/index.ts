import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';
import axios from 'axios';
import { getLanguage } from '../utils';
import { LAN } from '../utils/consts';

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache()
});

type PmName = { id: any; pokemon_v2_pokemonspeciesnames: { name: any; }[]; };

export async function fetchGen1(lan: number = LAN.en) {
  const res =  await client
    .query({
      query: gql`
      query gen1 {
        names: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {id: {_eq: 1}}}, order_by: {id: asc}) {
          id
          pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: ${lan}}}) {
            language_id
            name
            pokemon_v2_language {
              name
            }
          }
        }
      }
    `});
  
  return res.data.names.map((item: PmName) => ({nationalId: item.id, name: item.pokemon_v2_pokemonspeciesnames[0].name}));
}

export async function fetchI18nTexts(lan: LAN = LAN.en): Promise<{[key: string]: string}> {
  const res = await axios.get(`https://storage.googleapis.com/retrodex/i18n/locales/${getLanguage(lan)?.code}.json`);
  return res.data;
}