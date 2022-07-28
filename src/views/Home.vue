<template>
  <!-- MENSAGEM DE ERRO -->
    <div :class="containerMensageError">
      <Message v-if="errorMessage">Pokemon Não Encontrado</Message>
    </div>

  <!-- AREA CENTRAL -->
    <div class="container">
      <div class="card">

        <div class="container-img">
          <img :src="imgPokemon" v-if="imgPokemon"/>
          <h1 v-if="namePokemonImage" class="namePokemonImg">#{{IDPokemonImage}} {{namePokemonImage}}</h1>
        </div>

        <div class="barra-pesq">
          <input class="input-pesq" name="search" v-model="pesquisa" @keyup.enter="pesquisarPokemon" placeholder="Digite o nome do pokemon ou ID"/>
          <button class="btn-pesq" type="submit" @click="pesquisarPokemon"><img src="@/../public/img/pesquisar.png" /></button>
        </div>

      </div>
    </div>
</template>

<script> 
/* eslint-disable */
  import api from "@/services/api";
  import Message from "@/components/Message.vue"

  export default{
    name: 'Home',

    components: {
      Message,
    },
  
    data () {
      return { 
      responseVeri: "falseV",
      imagemPokemon: "#",
      pesquisa: "",
      data: null,
      imgPokemon: null,
      errorMessage: false,
      namePokemonImage: null,
      containerMensageError: null,
      IDPokemonImage: null,

      }
    },
    methods: {
      pesquisarPokemon() {
        if (this.pesquisa != ""){
          this.pesquisa = this.pesquisa.toLowerCase()
          const response = api.get(`/pokemon/${this.pesquisa}`).then((response,error) => {
            this.imgPokemon = response.data.sprites.other["official-artwork"].front_default;
            this.namePokemonImage = response.data.forms[0].name;
            this.IDPokemonImage = response.data.id

          }).catch(() => {
              this.imgPokemon = "";
              this.namePokemonImage = "";
              this.IDPokemonImage = "";

              this.errorMessage = true;
              this.containerMensageError = "containerMensageError"
              setTimeout(() => {this.errorMessage=false; this.containerMensageError = ""}, 5000);
          })}

        },


    },
  }


</script>

<style scoped>
    ::-webkit-scrollbar{
      width: 0;
    }

  .container{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height:100%;
    min-height: 800px;
    background-color: #fff;
    background-image: url('@/../public/img/background1.jpg');
    background-position: center;
    }

  .card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #c6c6c4;
    min-width: 500px;
    min-height: 500px;
    margin: 2% 2%;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 10px 10px 10px 10px #a4a4a1;
  } 

  .container-img{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 500px;
    min-height: 500px;
    width: 40vw;
    height: 60vh;

  }

  .container-img img{
    min-width: 475px;
    min-height: 475px;
  }

  .namePokemonImg{
    text-transform: uppercase;
  }

  .input-pesq{
    box-sizing: border-box;
    outline: none;
    border: 2px solid #010103;
    width: 80%;  
    height: 60px;
    margin: 10px 20px;
    border-radius: 20px;
    display: flex;
    text-align: center;
    
  }

  .btn-pesq{
    box-sizing: border-box;
    justify-content: center;
    align-items: center;
    outline: none;
    width: 70px;  
    height: 70px;
    padding:5px;
    cursor: pointer;
    background-color: #c81511;
    border: 2px solid #010103;
    border-radius:20px;
  }

  .btn-pesq:active{
    background-color: #910f0c;
  }

  .barra-pesq{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .containerMensageError{
    animation: transicao 5s;
  }

  @keyframes transicao {
    0% {
        transform: translateX(-500px);
    }
    20% {
        transform: translateX(0);
    }
    
    80% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(-500px);
    }
  }


@media (max-width: 850px){

  .card{
    min-width: 0;
    min-height: 0;
    align-items: center;
  }

  .container-img{
    min-width: 60vw;
    min-height: 0;
    height:40vh;
  }

  .container-img img{
    min-width: 0;
    min-height: 0;
    display:flex;
    max-width: 60vw;
  }
}

@media (max-width: 300px){
  .card{
    height: 100%;
  }

  .namePokemonImg{
    font-size: 10vw;
  }
}
</style>
