<template>
  <div class="main-container" v-if="$store.state.pokemonNaMao.length > 0 && $store.state.SituacaoBatalha == false || $store.state.backpack.length > 0 && $store.state.SituacaoBatalha == false">
    <div class="container-centralizador">
        <div v-if="$store.state.backpack" class="container-barra-cima">
          <h1>Na Mão</h1>
          <div class="barraNaMao">
            <div v-for="(pokemon,index) in $store.state.pokemonNaMao" :key="index">
              <MiniInconsNaMochila :Data="pokemon" class="miniInconsIndividual" local="Mao"></MiniInconsNaMochila>
            </div>
          </div>
        </div>

        <div class="container-barra-baixo" v-if="$store.state.backpack.length > 0 ">
          <h1>Mochila</h1>
          <div class="naMochila-container">
              <div v-if="$store.state.backpack.length > 0" class="barraNaGuardados">
                <div v-for="(pokemon,index) in $store.state.backpack" :key="index" class="mini-icons-backpack">
                  <MiniInconsNaMochila :Data="pokemon" class="miniInconsIndividual" local="Mochila"></MiniInconsNaMochila>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>

  <div v-else-if="$store.state.SituacaoBatalha == false" class="semPokemon">
    <h1 class="semPokemonText">Você não possui pokemon, obtenha em:</h1>
    <router-link to="/sorteador" class="semPokemonLink btnConceito btn">Sorteador</router-link>
  </div>

  <div v-else class="semPokemon">
    <h1 class="semPokemonText">Voce esta em batalha, derrote o pokemon</h1>
    <router-link to="/duelo" class="semPokemonLink btnConceito btn">Duelo</router-link>
  </div>
</template>

<script>
  import MiniInconsNaMochila from "../components/MiniInconsNaMochila.vue"; 

  export default{
    name: 'MyPokedex',

    components: {
    MiniInconsNaMochila
      },

  }

</script>

<style scoped>
  .main-container{
    background-image: url('@/../public/img/background4.png');
    background-position: center;

    min-width: 100vw;
    min-height: 80vh;
  }

  .container-centralizador{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .container-barra-cima{
    background-color:#fff;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 60px 0px;
    border: 1px solid #cccccc;
    border-radius: 20px;
    text-transform: uppercase;
    padding: 40px;
    box-shadow: 3px 3px 6px #cccccc
  }

  .container-barra-baixo{
    background-color:#fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 60px 60px;
    border: 1px solid #cccccc;
    border-radius: 20px;
    text-transform: uppercase;
    padding: 40px;
    box-shadow: 3px 3px 6px #cccccc
  }
  
  .naMochila-container{
    display: flex;
  }

  .mini-icons-backpack{
    display: flex;
  }

  .miniInconsIndividual:hover{
    transform: scale(1.5)
  }

  .barraNaMao{
    display: flex;
  }

  .barraNaGuardados{
    display: flex;
    flex-wrap: wrap;
  }

  .semPokemon{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80vh;
    text-transform: uppercase;
  }

  .semPokemonText{
    text-decoration: none;
    font-size: 40px;
  }

  .semPokemonLink{
    text-decoration: none;
    padding: 20px;
    font-weight: 800;
    font-size: 40px;
  }

  .btnConceito{
    box-sizing: border-box;
    cursor: pointer;
    letter-spacing:2px;
    text-shadow: 1px 1px rgba(255, 255, 255, 0.774);
    background-color: transparent;
    color: #c81511;
    border-radius: 10px;
    transition:0.5s;
    position: relative;
    overflow: hidden;
    z-index: 2;
    border: none;
    box-shadow: 1px 1px 4px #aaaaaa;
  }

  .btnConceito:hover{
    color: #fff;
    text-shadow: 1px 1px #010103ad;
  }
  .btnConceito:active{
    color: #fff;
    text-shadow: 1px 1px #01010394;
  }

  .btnConceito::before{
    content: '';
    position:absolute;
    top:50%;
    left: 0%;
    transform: translate(50%, 50%);
    width: 150%;
    height: 150%;
    background-color: #010103;
    z-index: -1;
    transition: .5s ease;
  }

  .btn::before{
    width: 0%;
    transform: translate(0%,-50%);
  }

  .btn:hover::before{
    width: 150%;
    height: 150%;
    transition: .5s
  }

@media (max-width: 700px){
  .barraNaMao{
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
    align-items:center;
    }

  .semPokemon{
    margin: 3%;
    display: flex;
    flex-wrap: wrap;
    height: 40vh;
  }

  .semPokemonText, .semPokemonLink{
    font-size: 6vw;
  }
}
</style>
