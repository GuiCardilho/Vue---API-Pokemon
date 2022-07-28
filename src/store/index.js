import { createStore } from 'vuex'

export default createStore({
  state: {

    cont : 0,

    pokemonPesqPokedex: "",

    ultimoPokemonSorteado: null,
    
    dinheiro: 6,
    pokemonNaMao: [],
    backpack: [],

    indexCombat: 0,
    PokemonDuelo: null,
    SituacaoBatalha: false,

    colorType:  {
      "normal":{
        color: "#a0a29f",
        index: 0,
        color2: "#e8e8e8",
      },

      "fighting":{
        color:"#c44d61",
        index: 1,
        color2: "#f3dbdf",
      },

      "flying":{
        color:"#a6bbe8",
        index: 2,
        color2: "#ecf0f9",
      },

      "poison":{
        color:"#ac6aca",
        index: 3,
        color2: "#eee1f4",
      },

      "ground":{
        color:"#ce8056",
        index: 4,
        color2: "#f5e4db",
      },

      "rock":{
        color:"#8bcec1",
        index: 5,
        color2: "#e7f5f2",
      },

      "bug":{
        color:"#9bba48",
        index:6,
        color2: "#e6ecd7",
      },

      "ghost":{
        color:"#616eb7",
        index:7,
        color2: "#dfe2f1",
      },

      "steel":{
        color:"#6594a1",
        index:8,
        color2: "#e6ecd7",
      },

      "fire":{
        color:"#f66d6d",
        index:9,
        color2: "#ffebca",
      },

      "water":{
        color:"#88a3d4",
        index:10,
        color2: "#dfecf5",
      },

      "grass":{
        color:"#73b861",
        index:11,
        color2: "#d6ebdc",
      },

      "electric":{
        color:"#eed967",
        index:12,
        color2: "#f5f2df",
      },

      "psychic":{
        color:"#eb8b85",
        index:13,
        color2: "#fbe8e7",
      },

      "ice":{
        color:"#a4d9ce",
        index:14,
        color2: "#e5f3f0",
      },


      "dragon":{
        color:"#2c6ac1",
        index:15,
        color2: "#dae1eb",
      },

      "dark":{
        color:"#595761",
        index:16,
        color2: "#d8d8d9",
      },

      "fairy":{
        color:"#e296e1",
        index:17,
        color2: "#f8e8f8",
      },
    },
    
  },
  getters: {
  },
  mutations: {
    CONTADOR(state){
      state.cont = state.cont+1
    },

    ZERAR_CONTADOR(state){
      state.cont = 0
    },

    MUDAR_PESQUISA_DA_POKEDEX(state,payload){
      payload = payload.toLowerCase()
      state.pokemonPesqPokedex = payload
    },

    ADICIONAR_POKEMON(state,payload){

      if (state.pokemonNaMao.length < 6){
        state.pokemonNaMao.push(payload)
      }
      else{
        state.backpack.push(payload)
      }
    },

    GUARDAR_INFORMAÇÃO_DO_POKEMON_SORTEADO(state,payload){
      state.ultimoPokemonSorteado = payload
    },

    ALTERAR_LOCAL_DO_POKEMON(state,payload){
      
      this.result = state.pokemonNaMao.includes(payload)

      if (this.result == false){
        if(state.pokemonNaMao.length < 6){
        state.backpack = state.backpack.filter(pokemon => pokemon.name != payload.name)
        state.pokemonNaMao.push(payload)}
      }

      else{
        state.pokemonNaMao = state.pokemonNaMao.filter(pokemon => pokemon.name != payload.name)
        state.backpack.push(payload)
      }
    },

    POKEMON_EM_BATALHA(state,payload){
      state.PokemonDuelo = payload
    },

    ALTERAR_INDEX(state,payload){
      state.indexCombat = payload
    },

    ALTERAR_SITUACAO_BATALHA(state,payload){
      state.SituacaoBatalha = payload
    },

    REMOVER_POKEMON(state,payload){
      state.pokemonNaMao = state.pokemonNaMao.filter(pokemon => pokemon.name != payload.name)
    },

    ADICIONAR_DINHEIRO(state,payload){
      state.dinheiro = state.dinheiro+payload
    },

    REMOVER_DINHEIRO(state,payload){
      state.dinheiro = state.dinheiro-payload
    },

  },
  actions: {
    Contador(context,payload){
      context.commit('CONTADOR',payload);      
    },

    ZerarContador(context,payload){
      context.commit('ZERAR_CONTADOR',payload);      
    },

    MudarPesquisaDaPokedex(context,payload){
      context.commit('MUDAR_PESQUISA_DA_POKEDEX',payload);     
    },

    AdicionarPokemon(context,payload){
      context.commit('ADICIONAR_POKEMON',payload);     
    },

    GuardarInformacaoSorteada(context,payload){
      context.commit('GUARDAR_INFORMAÇÃO_DO_POKEMON_SORTEADO',payload); 
    },

    AlterarLocalDeGuardar(context,payload){
      context.commit('ALTERAR_LOCAL_DO_POKEMON',payload);
    },

    PokemonEmBatalha(context,payload){
      context.commit('POKEMON_EM_BATALHA',payload);
    },

    AlterarIndex(context,payload){
      context.commit('ALTERAR_INDEX',payload);
    },

    AlterarSituacaoBatalha(context,payload){
      context.commit('ALTERAR_SITUACAO_BATALHA',payload);
    },

    RemoverPokemon(context,payload){
      context.commit('REMOVER_POKEMON',payload);
    },

    AdicionarDinheiro(context,payload){
      context.commit('ADICIONAR_DINHEIRO',payload);
    },

    RemoverDinheiro(context,payload){
      context.commit('REMOVER_DINHEIRO',payload);
    },

  },
  modules: {
  }
})
