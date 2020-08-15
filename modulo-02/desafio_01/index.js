import stateModule from './src/modules/stateModule.js';
import { getUF } from './src/modules/ReaderModule.js';

init();

async function init() {
  console.log("\nCriando os arquivos .json para cada estado");
  stateModule.createStateCityJsons();

  console.log("\nExibindo a quantidade de cidades para o UF informado a seguir");
  const UF = await getUF("Digite o UF: ");
  console.log( stateModule.getCityQuantity(UF));

  console.log("\nOs 5 estados com mais cidades");
  stateModule.getTop5MostPopulatedStates();

  console.log("\nOs 5 estados com menos cidades");
  stateModule.getTop5LeastCityStates();

  console.log("\nLista com a cidade de maior nome para cada estado");
  stateModule.getTopBiggestCityName();

  console.log("\nLista com a cidade de menor nome para cada estado");
  stateModule.getTopShortesCityName();

  console.log("\nA Cidade com o nome mais longo");
  stateModule.getTopLongestCityNameAll();

  console.log("\nA Cidade com o nome mais curto\n");
  stateModule.getTopShortestCityNameAll();
}