<template>
        <div v-if="$store.state.pokemonNaMao.length > 0" class="main-container">
            <div class="textContainers dinheiro"><img src="@/../public/img/dinheiro.png" /> - R$ {{$store.state.dinheiro}}</div>
            <div class="container-duelo">
                <div class="container-left">
                    <img v-if="ImgAtual" :src="ImgAtual" />
                    <img v-else :src="ImgAtualAlt" />
                    <div class="textContainers">
                        <h1>Name: {{$store.state.pokemonNaMao[index].name}}</h1>
                        <h1>Tipo: {{$store.state.pokemonNaMao[index].types[0].type.name}}</h1>
                        <h1>HP: {{$store.state.pokemonNaMao[index].stats[0].base_stat - danoTomado[index]}}</h1>
                        <h1>Ataque: {{$store.state.pokemonNaMao[index].stats[1].base_stat}}</h1>
                        <h1>Defesa: {{$store.state.pokemonNaMao[index].stats[2].base_stat+AumentarDefesa}}</h1>
                    </div>
                    <div class="btnBaixoAtaque">
                        <button v-if="this.dataDuelo != '' " @click="AtaqueUsuario" class="btnConceito btn">Ataque</button>
                        <button v-if="this.dataDuelo != '' " @click="DefesaUsuario" class="btnConceito btn">Defesa</button>
                        <button v-if="this.dataDuelo != '' && this.contadorEspecial >= 5" @click="AtaqueEspecialUsuario" class="btnConceito btn">Especial</button>
                    </div>
                </div>

                <div class="containerTextCentral">
                    <h1>{{mensagemPlayer}}</h1>
                    <h1>{{mensagemBot}}</h1>
                </div>

                <div v-if="dataDuelo" class="container-right">
                    <img v-if="imgPokemonDuelo" :src="imgPokemonDuelo"/>
                    <img v-else :src="imgPokemonDueloAlt" />
                    <div class="textContainers">
                        <h1>Name: {{dataDuelo.name}}</h1>
                        <h1>Tipo: {{dataDuelo.types[0].type.name}}</h1>
                        <h1>HP: {{dataDuelo.stats[0].base_stat - danoDado}}</h1>
                        <h1>Ataque: {{dataDuelo.stats[1].base_stat}}</h1>
                        <h1>Defesa: {{dataDuelo.stats[2].base_stat}}</h1>
                    </div>
                </div>

                <div v-else><button @click="SortearPokemonEmDuelo" class="btnConceito btn aumentarBotao" >Duelo</button></div>
            </div>

            <div  class="">
                <div class="container-mini-icons" v-if="$store.state.pokemonNaMao.length > 0">
                    <div class="mini-icons-pokemon">
                        <div v-for="(pokemon, index) in $store.state.pokemonNaMao" :key="index">
                            <PokemonMiniIcon :Data="pokemon" @click="AlterarPokemonDuelo(index)"></PokemonMiniIcon>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <div v-else class="semPokemon">
        <h1 class="semPokemonText">Você não possui pokemon para duelo, obtenha em:</h1>
        <router-link to="/sorteador" class="semPokemonLink btnConceito btn">Sorteador</router-link>
    </div>

</template>

<script>

import PokemonMiniIcon from '@/components/PokemonMiniIcon.vue'
import api from '@/services/api';
/* eslint-disable */

    export default{
    name: "Duelo",
    components: { PokemonMiniIcon },

    data() {
        return {
            todosPokemons: null,
            imgPokemonDuelo: null,
            imgPokemonDueloAlt: null,
            ImgAtual: null,
            ImgAtualAlt: null,
            dataDuelo: "",
            index: this.$store.state.indexCombat,
            danoTomado: [0,0,0,0,0,0],
            danoDado: 0,
            AumentarDefesa: 0,
            mensagemBot: "",
            mensagemPlayer: "",
            contador: 0,
            contadorEspecial: 0,
            urlPesquisa: "",
            AtaqueEspecial: 1,
            DoubleDamageFrom: 1,
            DoubleDamageTo: 1,

        };
    },

    methods: {

        SortearPokemonEmDuelo(){
            this.numeroSorteado = Math.floor(Math.random() * 1154);
            this.numeroSorteado = this.numeroSorteado - 1;
            this.BuscarPokemon();
        },

        TodosPokemon(){
            api.get("/pokemon?limit=100000&offset=0").then((response) => {
                this.todosPokemons = response.data.results
            }).catch(() => {})
        },


        BuscarPokemon(){
            api.get(`/pokemon/${this.todosPokemons[this.numeroSorteado].name}`).then((response) => {
                this.imgPokemonDuelo = response.data.sprites.other.dream_world.front_default;
                this.imgPokemonDueloAlt = response.data.sprites.other["official-artwork"].front_default;
                this.dataDuelo = response.data
                this.$store.dispatch("PokemonEmBatalha",this.dataDuelo)
                this.$store.dispatch("AlterarSituacaoBatalha",true)
                this.urlPesquisa = response.data.types[0].type.name
                api.get(`/type/${this.urlPesquisa}`).then((response) => {
                    this.fraquezas = response.data;
                 }).catch(() => {})
                if (this.imgPokemonDuelo == null && this.imgPokemonDueloAlt == null){
                this.SortearPokemonEmDuelo()
                }
                }).catch(() => {}) 
        },

        AlterarPokemonDuelo(posicao){
            this.$store.dispatch("AlterarIndex",posicao)
        },

        AtaqueUsuario(){
            this.DoubleDamageFrom = 1
            this.DoubleDamageTo = 1
            this.CalcularVantagem(this.$store.state.pokemonNaMao[this.index].types[0].type.name);
            this.AtaqueDoPokemon = (this.$store.state.pokemonNaMao[this.index].stats[1].base_stat / this.dataDuelo.stats[2].base_stat)* 10; 
            this.AtaqueSorteado = ((Math.floor(Math.random() * this.AtaqueDoPokemon) + (this.AtaqueEspecial))*(this.DoubleDamageFrom)+1)/(this.DoubleDamageTo) ;
            this.danoDado = this.danoDado + this.AtaqueSorteado
            this.mensagemPlayer = `O ${this.$store.state.pokemonNaMao[this.index].name} deu ${this.AtaqueSorteado} de dano`
            this.contador = this.contador+1
            this.contadorEspecial = this.contadorEspecial + 1;

            if(this.contador == 5){
                this.AumentarDefesa = 0
                this.contador = 0  
            }
            if (this.dataDuelo.stats[0].base_stat < this.danoDado){
                this.dataDuelo = "";
                this.imgPokemonDuelo =  "";
                this.imgPokemonDueloAlt = "";
                this.mensagemBot = "";
                this.mensagemPlayer = "";
                this.danoDado = 0;
                this.danoTomado = [0,0,0,0,0,0];
                this.AumentarDefesa = 0
                this.$store.dispatch("AlterarSituacaoBatalha",false);
                this.$store.dispatch("AdicionarDinheiro",3);
                this.contadorEspecial = 1
            }

            if (this.dataDuelo != ""){
                this.AtaqueBot();
            }
        },

        AtaqueBot(){
            this.DoubleDamageFrom = 1
            this.DoubleDamageTo = 1
            this.CalcularVantagem(this.$store.state.pokemonNaMao[this.index].types[0].type.name);
            this.ValorAtaqueBot = (((this.dataDuelo.stats[1].base_stat) / (this.$store.state.pokemonNaMao[this.index].stats[2].base_stat + this.AumentarDefesa))*10)
            this.AtaqueSorteadoBot = ((Math.floor(Math.random() * this.ValorAtaqueBot))*(this.DoubleDamageTo)+1)/(this.DoubleDamageFrom);
            this.danoTomado[this.index] = this.danoTomado[this.index] + this.AtaqueSorteadoBot 
            this.mensagemBot = `O ${this.dataDuelo.name} deu ${this.AtaqueSorteadoBot} de dano`
            
            if (this.$store.state.pokemonNaMao[this.index].stats[0].base_stat < this.danoTomado[this.index]){
                this.$store.dispatch("RemoverPokemon",this.$store.state.pokemonNaMao[this.index]);
                this.mensagemBot = "";
                this.mensagemPlayer = "";
                this.danoTomado[this.index] = 0;
                this.AumentarDefesa = 0
                this.index = this.$store.state.indexCombat;
                this.ImgAtual = this.$store.state.pokemonNaMao[this.index].sprites.other.dream_world.front_default;
                this.ImgAtualAlt = this.$store.state.pokemonNaMao[this.index].sprites.other["official-artwork"].front_default;
                this.contadorEspecial = 1
            }
        },

        DefesaUsuario(){
            this.DefesaAleatoria = Math.floor(Math.random() * 70)+1
            this.AumentarDefesa = this.AumentarDefesa + this.DefesaAleatoria
            this.mensagemPlayer = `O ${this.$store.state.pokemonNaMao[this.index].name} aumentou sua defesa em: ${this.DefesaAleatoria}`
            this.AtaqueBot()

        },

        AtaqueEspecialUsuario(){
            this.AtaqueEspecial = Math.floor(Math.random() * 50)+1
            this.AtaqueUsuario()
            this.contadorEspecial = 1
        },

        CalcularVantagem(tipo){
            
            for (var i = 0; i < this.fraquezas.damage_relations.double_damage_from.length; i++) {
                 if (this.fraquezas.damage_relations.double_damage_from[i].name == tipo) {
                    this.DoubleDamageFrom = 2
                 }
            }
            for (var i = 0; i < this.fraquezas.damage_relations.double_damage_to.length; i++) {
                if (this.fraquezas.damage_relations.double_damage_to[i].name == tipo) {
                    this.DoubleDamageTo = 2
                 }
            }
        },
    },
    

    watch: {
        '$store.state.indexCombat'(){
            this.index = this.$store.state.indexCombat;
            this.ImgAtual = this.$store.state.pokemonNaMao[this.index].sprites.other.dream_world.front_default;
            this.ImgAtualAlt = this.$store.state.pokemonNaMao[this.index].sprites.other["official-artwork"].front_default;
        },

        index(){
            if (this.dataDuelo != ""){
                this.AtaqueBot();
            }
        }
    },

    mounted() {
        this.TodosPokemon();
        if (this.$store.state.pokemonNaMao != ""){ 
            this.ImgAtual = this.$store.state.pokemonNaMao[this.index].sprites.other.dream_world.front_default
            this.ImgAtualAlt = this.$store.state.pokemonNaMao[this.index].sprites.other["official-artwork"].front_default
        }

        if (this.$store.state.PokemonDuelo != null){
            this.dataDuelo = this.$store.state.PokemonDuelo
            this.imgPokemonDuelo =  this.$store.state.PokemonDuelo.sprites.other.dream_world.front_default
            this.imgPokemonDueloAlt = this.$store.state.PokemonDuelo.sprites.other["official-artwork"].front_default
        }
    },
    
}
</script>

<style scoped>
    .main-container{
        justify-content: center;
        align-content: center;
        margin-top: 120px;
        display: flex;
        flex-direction: column;
        height: 75vh;
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

    .container-duelo{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height:auto;
    }

    .container-left img, .container-right img{
        width: 200px;
        height: 200px;
    }

    .container-left, .container-right{
        border: 2px solid #cccccc;
        border-radius: 20px;
        padding: 20px 0px;
        box-shadow: 3px 3px 6px #cccccc;
        background-color: #fff;
        margin: 15px;
        width: 30%;
        height: 30%;
        justify-content:center;
        align-items: center;
        display: flex;
        flex-direction: column;
        text-transform: uppercase;

        max-width: 450px;
        min-height: 450px;
    }
    .btnBaixoAtaque{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .textContainers h1{
        font-size:20px
    }

    .containerTextCentral{
        display: flex;
        flex-direction: column;
        width: 30%;
        height: 40%;
    }
    .containerTextCentral h1{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px;
        background-color: #cccccc;
        box-shadow: 1px 1px 4px #777777;
        border-radius: 20px;
        margin: 20px;
        text-transform: uppercase;
        min-height: 80px;	
    }

    .aumentarBotao{
        padding: 50px;
        font-size: 30px;
    }

    .container-mini-icons{
        margin:90px 40px;
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
        padding: 12px;
        margin-top: 15px;
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

    @media (max-width: 1050px){
        .main-container{
            height: auto;
        }

        .container-duelo{
            flex-direction: column;
        }

        .container-left, .container-right, .containerTextCentral {
            width: 90%;
            max-width: 1000px;

        }
    }
</style>