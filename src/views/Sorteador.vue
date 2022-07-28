<template>
  <div class="main-container">

    <div class="mensagem" v-show="MenssageSucess">
      <div :class="containerMensageSucess">
          <Message v-if="(slotMensage == 'Sucesso')">Adicionado Com Sucesso a {{local}}</Message>
          <Message v-else-if="(slotMensage == 'Dinheiro')">Você esta Sem dinheiro </Message>
          <Message v-else>Você precisa sortear primeiro </Message>
        </div>
      </div>

      <div class="backg">
      <div class="container-sorteador">
        <div class="container-centralizador">
          <div class="textContainers dinheiro"><img src="@/../public/img/dinheiro.png" /> - R$ {{$store.state.dinheiro}}</div>
          <div class="container-central">
            <div class="btn-lateral">
              <button @click="Sortear" class="btnConceito btn">RECUSAR</button>
            </div>

            <div class="container-img">
              <img v-if="imgPrim" :src="imgPrim" />
              <img v-else-if="imgAlt" :src="imgAlt" />
              <div v-if="imgPrim || imgAlt" class="container-name">
              <span>#{{dataPokemon.id}}</span> 
              {{dataPokemon.name}}
              </div>
            </div>

            <div class="btn-lateral"> 
              <button @click="AdicionarPokemon" class="btnConceito btn2">ADICIONAR</button>
            </div>
          </div>

          <div class="btn-central">
            <button @click="Sortear" class="btnConceito btn3">Sortear</button>
          </div>
        </div>
      </div>
      <div class="container-mini-icons" v-if="$store.state.pokemonNaMao.length > 0">
      <div class="mini-icons-pokemon">
        <div v-for="(pokemon, index) in $store.state.pokemonNaMao" :key="index">
            <PokemonMiniIcon :Data="pokemon"></PokemonMiniIcon>
        </div>
      </div>

    </div>
  </div>
</div>
  
</template>

<script>
import api from '@/services/api';
import PokemonMiniIcon from '@/components/PokemonMiniIcon.vue';
import Message from '@/components/Message.vue';

/* eslint-disable */

  export default{
    name: 'Sorteador',
    components: {
    PokemonMiniIcon,
    Message
},
    data(){
      return{
        listaPokemon: null,
        imgPrim : null,
        imgAlt : null,
        dataPokemon: null,
        MenssageSucess: false,
        containerMensageSucess: null,
        local: "MÃO",
        slotMensage: "", 
      }
    },

    methods: {
      Sortear(){
        this.numeroSorteado = Math.floor(Math.random() * 1154);
        this.numeroSorteado = this.numeroSorteado - 1;
        this.BuscarPokemon();
      },

      ObterListaPokemon(){
        api.get("/pokemon?limit=100000&offset=0").then((response) => {
            this.listaPokemon = response.data.results
        }).catch(() => {})
      },

      BuscarPokemon(){
        api.get(`/pokemon/${this.listaPokemon[this.numeroSorteado].name}`).then((response) => {
          this.imgPrim = response.data.sprites.other.dream_world.front_default;
          this.imgAlt = response.data.sprites.other["official-artwork"].front_default;
          this.dataPokemon = response.data
          this.$store.dispatch("GuardarInformacaoSorteada",this.dataPokemon)
          this.miniIconImg = response.data.sprites.front_default

          if (this.imgPrim == null && this.imgAlt == null){
            this.Sortear()
          }else{
            if(this.miniIconImg == null){
              this.Sortear()
            }
          }

        }).catch(() => {})
      },

      AdicionarPokemon(){
        if (this.dataPokemon != null){
            if(this.$store.state.dinheiro > 0){
            this.$store.dispatch("RemoverDinheiro",1);
            this.$store.dispatch("AdicionarPokemon",this.dataPokemon)
            if(this.$store.state.pokemonNaMao.length < 6){
              this.local = "Mão";
            }
            else{
              this.local = "Mochila"
            }
            this.slotMensage = "Sucesso"
            this.MenssageSucess = true;
            this.containerMensageSucess = "containerMensageSucess";
            setTimeout(() => {this.MenssageSucess=false; this.containerMensageSucess = "";}, 3000);
            
            this.Sortear();
          }else{
            this.slotMensage = "Dinheiro"
            this.MenssageSucess = true;
            this.containerMensageSucess = "containerMensageSucess";
            setTimeout(() => {this.MenssageSucess=false; this.containerMensageSucess = "";}, 3000);
          }
        }else{
            this.slotMensage = "Sorteio"
            this.MenssageSucess = true;
            this.containerMensageSucess = "containerMensageSucess";
            setTimeout(() => {this.MenssageSucess=false; this.containerMensageSucess = "";}, 3000);
        }
      },
    },

    mounted(){
      this.ObterListaPokemon()
      if (this.$store.state.ultimoPokemonSorteado != null) {
        this.imgPrim = this.$store.state.ultimoPokemonSorteado.sprites.other.dream_world.front_default;
        this.imgAlt = this.$store.state.ultimoPokemonSorteado.sprites.other["official-artwork"].front_default;
        this.dataPokemon = this.$store.state.ultimoPokemonSorteado;
      }

      
    },

  }

</script>

<style scoped>

  .backg{
    background-image: url('@/../public/img/background2.jpg');
    background-position: center;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: space-between;
  }

  .dinheiro{
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .dinheiro img{
      width: 20px;
      height: 20px;
  }

  .mensagem{
    position: fixed;
    top:20vh;
  }

  .main-container{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .container-sorteador{
    width: 70vw;
    height: 80vh;
    display: flex;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container-centralizador{
    border: 2px solid #cccccc;
    border-radius: 20px;
    padding: 20px 40px;
    box-shadow: 3px 3px 6px #cccccc;
    background-color: #fff;
  }

  .container-central{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container-img{
    min-width: 41vw;
    min-height: 50vh;
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  .container-name{
    margin-top: 20px;
    text-transform: capitalize;
  }

  .container-img img{
    width: 40vh;
    height: 40vh;
  }

  .btn-central{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container-mini-icons{
    margin:40px;
    box-shadow: 0px 0px 5px 1px #010103;
    border-radius: 20px;
    padding: 15px;
    background-color: #cccccc;
    justify-content: center;
    align-items: center;
    display: flex;

  }

  .mini-icons-pokemon{
    background-color: #cccccc;
  }


/* BOTAO */
  .btnConceito{
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 15px 0px;
    width: 80px;
    margin: 1%;
    cursor: pointer;
    font-weight:bold;
    font-size: 13px;
    letter-spacing:2px;
    text-transform: uppercase;
    text-shadow: 1px 1px rgba(255, 255, 255, 0.774);
    background-color: transparent;
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
  
  .btn {
    color: #df0000;
  }

  .btn::before{
    width: 0%;
    transform: translate(0%,-50%);
  }

  .btn:hover::before{
    width: 150%;
    height: 150%;
    transition: .5s;
    background-color: #df0000;
  }

  .btn2 {
    color: #009118;
  }

  .btn2::before{
    left: 100%;
    width: 0%;
    transform: translate(0%,-50%);
  }

  .btn2:hover::before{
    width: 150%;
    height: 150%;
    transition: .5s;
    left: 0%;
    background-color: #009118;
  }
  
  .btn3::before{
    width: 150%;
    height: 150%;
    transform: translate(0%,100%);
  }

  .btn3:hover::before{
    transition: .5s;
    transform: translate(0%,-50%);
  }

  .btn:active::before{
    background-color:#c81511;
    transition: 0.2s;
  }

  .btn-central:active::before{
    background-color:#010103;
    transition: 0.2s;
  }


  /* MENSAGEM DE SUCESSO */
  .containerMensageSucess{
    animation: transicao 3s;
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

  @media (max-width: 1050px){
    .container-sorteador{
      margin: 1%;
      height: auto;
    }

    .backg{
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .container-mini-icons{
      flex-direction:row;
    }

    .mini-icons-pokemon{
      display: flex;
    }
  }

  @media (max-width: 600px){
    .mini-icons-pokemon{
      flex-wrap:wrap;
      justify-content: center;
      align-items: center;
    }

    .container-centralizador{
      display: flex;
      flex-direction: column;
    }

    .container-sorteador{
      box-sizing: content-box;
    }

    .container-central{
      flex-direction:column
    }

    .container-img img{
      width: 40vw;
      height: 40vw;

    }
  }

</style>
