<template>
    <!-- MENSAGEM DE ERRO -->
    <div id="contatiner-pokearea">
        <div :class="containerMensageError">
            <Message v-if="errorMessage">Pokemon Não Encontrado</Message>
        </div>

        <!-- BARRA DOS TIPOS DE POKEMON-->
        <div class="barra-type">
            <div class="container-type-card">
                <a href="#contatiner-pokearea" style="color:#4076c4" class="linkType" @click="ModificarUrl('pokemon')"> 
                    <img  src='../../public/img/Types/all.png' class="imgType">All
                </a>
            </div>
            <div class="container-type-card" v-for="(type,index)  in typePokemon" :key="index">
                <a href="#contatiner-pokearea" :style="{color: $store.state.colorType[type.name].color}" class="linkType" @click="ModificarUrl(type.name)"> 
                    <img  :src="require('../../public/img/Types/'+ index +'.png')" class="imgType">{{type.name}}
                </a>
            </div>
        </div>


        <!-- AREA DE EXIBIÇÃO DOS CARDS-->
        <div class="container-card-pokemon">
            <h1 class="textContador">Quantidade: {{$store.state.cont}}</h1>
            <div class="main-container">
                <div class="card-container" v-show="ValidadorDePokemon">
                    <div v-for="(lista, index) in ListaPokemon" :key="index" class="cardSingle">
                        <CardPokemon :propData="lista" :typeReq="url" :Index="index" :Limitador="limit"/>
                    </div>
                </div> 
            </div>
            <div class="container-btn-limitador">
                <button v-if="VerMaisState" class="btn-limitador btn" @click="AdicionarLimitador">Ver Mais</button>
            </div>
            
        </div>

    </div>
</template>

<script>

import api from "@/services/api";
import CardPokemon from "./CardPokemon.vue";
import Message from "./Message.vue";


  export default{
    name: 'PokeArea',
    components: {
    CardPokemon,
    Message
},
    data(){
        return{
            typePokemon: [],
            ListaPokemon: [],
            url: "/pokemon",
            limit: 23,
            VerMaisState: true,
            errorMessage: false,
            containerMensageError: null,
            ValidadorDePokemon: true,

        }
    },
    watch: {
    '$store.state.cont'() {
            this.ValidadorDoVerMais()
        },

    limit(){
        this.ValidadorDoVerMais()
    },

    '$store.state.pokemonPesqPokedex'(){
        this.PesquisaDePokemon()
    }

    },

    methods: {
        AdicionarLimitador(){
            this.limit = this.limit+20
        },

        ValidadorDoVerMais(){
            if (this.$store.state.cont > this.limit){
                this.VerMaisState = true
            }else{
                this.VerMaisState = false
            }

        },

        ModificarUrl(TypeUrl){
            
            if(TypeUrl == "pokemon"){
                this.url = `/${TypeUrl}`;
                this.TodosPokemon()
                }
            else{
                this.url = `type/${TypeUrl}`
                this.TipoDePokemon()
                }

            this.$store.dispatch("ZerarContador")
            

        },

        TodosPokemon(){
            api.get(`${this.url}?limit=200&offset=0`).then((response) => {
                this.ListaPokemon = response.data.results;
                this.limit = 23;
                this.ValidadorDePokemon = true;
                }).catch(() => {})
        },

        TipoDePokemon(){
            api.get(`${this.url}`).then((response) => {
                this.ListaPokemon = response.data.pokemon;
                this.limit = 23;
                this.ValidadorDePokemon = true;
                }).catch(() => {})
        },

        PesquisaDePokemon(){
            if (this.$store.state.pokemonPesqPokedex != ""){
            api.get(`/pokemon/${this.$store.state.pokemonPesqPokedex}`).then((response) => {
                this.ListaPokemon = [{
                    name: response.data.name,
                    url: `https://pokeapi.co/api/v2/pokemon/3/${response.data.id}`
                }];

                this.limit = 23;
                this.ValidadorDePokemon = true;
                this.$store.dispatch("ZerarContador")

                }).catch(() => {
                    this.$store.dispatch("ZerarContador")
                    this.ValidadorDePokemon = false;
                    this.errorMessage = true;
                    this.containerMensageError = "containerMensageError";
                    this.ValidadorDoVerMais();
                    setTimeout(() => {
                        this.errorMessage=false; 
                        this.containerMensageError = "";
                        this.TodosPokemon();
                        this.$store.dispatch("MudarPesquisaDaPokedex","")
                        }, 5000);

                })}
                else{
                    this.$store.dispatch("ZerarContador")
                    this.TodosPokemon();
                }
        },
    },

    beforeMount() {
        api.get("/type").then((response,) => {
            this.typePokemon = response.data.results;
            this.typePokemon.splice(18,2);
            }).catch(() => {})
        
        if (this.$store.state.pokemonPesqPokedex == ""){
        if(this.url == "/pokemon"){this.TodosPokemon()}
        else{this.TipoDePokemon()}

        this.$store.dispatch("ZerarContador")}
        else{
            this.PesquisaDePokemon()
        }


        
    },
  }
</script>

<style scoped>

    #contatiner-pokearea{
        display:flex;
        background-color: #efefef;
        border-top: 2px solid #d5d5d5;
        min-height: 600px;
        width: 100%;
           
    }

    .barra-type{
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 40px 0;
        border-right: 2px solid #d5d5d5;
        

    }

    .main-container{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }

    .card-container{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    .container-card-pokemon{
        width: 70%;
    }
    
    .imgType {
        width: 20px;
        height: 20px;
        margin: 0 10px
    }

    .container-type-card{
        width: 120px;
        margin: 7px 0px;
        text-decoration: none;
        text-transform: uppercase;
        filter:saturate(0);
        opacity: 55%;
        transition: 0.3s;
    }

    .container-type-card:hover{
        filter:saturate(1);
        opacity: 100%;
    }

    .container-type-card:active{
        filter:saturate(2);
        opacity: 55%;
    }
    
    .linkType{
        text-decoration: none;
        font-size: 16pt;
        display: flex;
        align-items: center;
    }

    .textContador{
        text-align: center;
        margin-top: 10px;
        }
    

    /* BUTAO */
    .container-btn-limitador{
        width:100%;
        display:flex;
        justify-content: center
    }

    .btn-limitador{
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 10px 0px;
        width: 120px;
        margin: 2%;
        text-decoration: none;
        cursor: pointer;
        font-weight:bold;
        font-size: 20px;
        letter-spacing:2px;
        text-transform: uppercase;
        text-shadow: 2px 2px #010103;
        background-color: #c81511;
        color: #fff;
        border-radius: 10px;
        transition:1s;
        position: relative;
        overflow: hidden;
        z-index: 2;
    }

    .btn-limitador{
        border: 2px solid #010103;
    }


    .btn-limitador::before{
        content: '';
        position:absolute;
        top:50%;
        left: 50%;
        transform: translate(50%, 50%);
        width: 100%;
        height: 100%;
        background-color: #010103;
        z-index: -1;
        transition: .5s ease;
    }

    .btn::before{
        width: 0%;
        height: 110%;
        transform: translate(-50%,-50%) rotate(-45deg);

    }
    .btn:hover::before{
        width: 110%;
        height: 310%;
        transition: .5s

    }

    .btn:active::before{
        background-color:#7a0c0ada;
        transition: 0.2s;
    }


    /* ERROR */

    .containerMensageError{
        animation: transicao 5s;
        z-index: 99;
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

    @media (max-width: 600px){
        .cardSingle{
            display: flex;
            align-items: center;
            justify-content: center;
            width:100%;
        }
    }



</style>