import fs from 'fs';

const cities = JSON.parse( fs.readFileSync('./src/static/Cidades.json', 'utf8') );
const states = JSON.parse( fs.readFileSync('./src/static/Estados.json', 'utf8') );

const stateModule = {
  // 1
  createStateCityJsons() {
    const state_cities = states.map(state => {
      state.cities = cities.filter(city => city.Estado == state.ID);
      return state;
    });

    state_cities.forEach(state => {
      fs.writeFileSync(`./src/temp/${state.Sigla}.json`, JSON.stringify(state));
    });
  },
  // 2
  getCityQuantity(uf) {
    try {
      const state = JSON.parse(fs.readFileSync(`./src/temp/${uf}.json`, 'utf8'));
      return state.cities.length;
    } catch (err) {
      return "Ocorreu um erro ao buscar o arquivo, favor conferir o UF informado!";
    }    
  },
  // 3
  getTop5MostPopulatedStates() {
    const stateWithCityCount = states.map(state => {
      state.cityCount = this.getCityQuantity(state.Sigla);
      return state;
    });
    const sortedByCityCount = stateWithCityCount.slice().sort((a, b) => b.cityCount - a.cityCount).slice(0,5);
    const result = [];
    sortedByCityCount.forEach(({ Sigla, cityCount }) => {
      result.push(`${Sigla} - ${cityCount}`);
    })

    console.log(result);
  },
  // 4
  getTop5LeastCityStates() {
    const stateWithCityCount = states.map(state => {
      state.cityCount = this.getCityQuantity(state.Sigla);
      return state;
    });
    const sortedByCityCount = stateWithCityCount.slice().sort((a, b) => a.cityCount - b.cityCount).slice(0, 5).reverse();
    const result = [];
    sortedByCityCount.forEach(({ Sigla, cityCount }) => {
      result.push(`${Sigla} - ${cityCount}`);
    })

    console.log(result);
  },
  // 5
  getTopBiggestCityName() {
    const state_cities = states.map(state => {
      state.cities = cities.filter(city => city.Estado == state.ID);
      return state;
    });
    const result = []
    state_cities.forEach(({Sigla, cities}) => {
      cities.sort((a, b) => b.Nome.length - a.Nome.length);
      result.push(`${cities[0].Nome} - ${Sigla}`);
    });

    console.log(result);
  },
  // 6
  getTopShortesCityName() {
    const state_cities = states.map(state => {
      state.cities = cities.filter(city => city.Estado == state.ID);
      return state;
    });
    const result = []
    state_cities.forEach(({Sigla, cities}) => {
      cities.sort((a, b) => a.Nome.length - b.Nome.length);
      result.push(`${cities[0].Nome} - ${Sigla}`);
    });

    console.log(result);
  },
  //7
  getTopLongestCityNameAll() {
    const {Nome, Estado} = cities.sort((a, b) => b.Nome.length - a.Nome.length)[0];
    const {Sigla} = states.find(state => state.ID = Estado);
    console.log(`${Nome} - ${Sigla}`);
  },
  //8
  getTopShortestCityNameAll() {
    const {Nome, Estado} = cities.sort((a, b) => a.Nome.length - b.Nome.length)[0];
    const {Sigla} = states.find(state => state.ID = Estado);
    console.log(`${Nome} - ${Sigla}`);
  }
}

export default stateModule;