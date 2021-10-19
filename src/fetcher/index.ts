import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from '@apollo/client';
import { LAN_ID } from '../utils/consts';

const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta',
  cache: new InMemoryCache()
});

export async function fetchGen8(lan = 'en') {
  const res =  await client
    .query({
      query: gql`
      query gen8 {
        pms: pokemon_v2_pokemonspecies(where: {pokemon_v2_pokemondexnumbers: {pokedex_id: {_gte: 27}, _and: {pokedex_id: {_lte: 29}}}}, order_by: {id: asc}) {
          name: pokemon_v2_pokemonspeciesnames(where: {language_id: {_eq: ${LAN_ID[lan]}}}) {
            name
          }
          dex: pokemon_v2_pokemondexnumbers(where: {pokedex_id: {_gte: 27}, _and: {pokedex_id: {_lte: 29}}}, order_by: {pokedex_id: asc}) {
            pokedex_number
            pokedex_id
          }
          id
        }
      }      
    `});
  
  return res.data.pms;
}
