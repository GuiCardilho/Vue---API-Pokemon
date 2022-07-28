<template>

  <!--BARRA DE PESQUISA-->
  <div class="mainContainerBarra">
    <div class="containerBarra">
        <div id="BarraDePesquisa">
        <input type="text" placeholder="Digite o nome do pokemon ou ID" v-model="valorPesquisa" @keyup.enter="PesquisaPokedex"/>
        <button class="btnPesquisa"  @click="PesquisaPokedex"><img src="@/../public/img/lupa.png"/></button>
    </div>
  </div>

  <!--AREA DE EXIBIÇÃO DO TIPO E DOS POKEMONS -->
  </div>
  <div class="AreaDosPokemons">
    <PokeArea />
  </div>
</template>

<script>
import PokeArea from '@/components/PokeArea.vue'; 
/* eslint-disable */

  export default{
    name: 'Pokedex',
    components: {
      PokeArea
    },
    data(){
      return{
        valorPesquisa: "",
      }
    },
    methods: {
      PesquisaPokedex(){
        this.$store.dispatch("MudarPesquisaDaPokedex",this.valorPesquisa)
      }
    },
  }

</script>


<style scoped>

    ::-webkit-scrollbar{
    width: 10px;
    }
    
  .containerBarra{
    width: 100%;
    min-height: 400px;

    display: flex;
    align-items:center;
    justify-content:center;

  }

  .AreaDosPokemons{
    min-height: 600px;
  }


  #BarraDePesquisa{
    display: flex;
    flex-wrap: wrap;
  }

  #BarraDePesquisa input{
      text-align: center;
      border-radius: 20px;
      width: 70vw;
      height: 5vh;
      position: relative;
      left: 2.5vh;

  }

  .btnPesquisa{
      width:5vh;
      height: 5vh;
      border-radius: 20px;
      position: relative;
      left: -2.5vh;
      cursor: pointer;
      background-color: #fff;
      transition: 0.4s;
  } 

  .btnPesquisa:hover{
    background-color:#c81511;
  }

  .btnPesquisa:active{
    background-color:#c8141183;
  }

  .mainContainerBarra{
    background-image: url("../../public/img/pokedex.gif");
    background-color: #fffcfc;
    background-repeat: no-repeat;
    width:100%;
    height: 100%;
    background-position:left;
    background-size: 200px;
  }

  @media (max-width: 950px){
    .mainContainerBarra{
      background-position:bottom;
    }
  }

</style>

