<template>
    <!-- POPUP-->
    <div class="MorePokemon" v-if="(ShowMore == true)" @click="AlterarEstadoPopUP">
        <div  class="popup">
            <div class="container-popup" @click="AlterarEstadoPopUP">
                <div class="container-popup-left">
                    <img v-if="SearchImgSingle" :src="SearchImgSingle" class=""/>
                    <img v-else-if="SearchImgAlt" :src="SearchImgAlt" class=""/>
                </div>

                <div class="container-popup-right">
                    
                    <div class="namePopUP">
                        <span class="" v-if="IDPokemonSingle >= 100">#{{IDPokemonSingle}}</span> 
                        <span class="" v-else-if="IDPokemonSingle >= 10">#0{{IDPokemonSingle}}</span> 
                        <span class="" v-else>#00{{IDPokemonSingle}}</span> 
                        {{namePokemonSingle}}
                        <img :src="require('../../public/img/Types/'+ this.indexIndividual.index +'.png')" class="imgTypePopUP"/>
                     </div>

                     <div class="HWAPopUP">
                        <div  class="HWA2PopUP"><h1>Height</h1><h2>{{heightPopUP}}</h2></div>
                        <div class="HWA2PopUP"><h1>Weight</h1><h2>{{weightPopUp}}</h2></div>
                        <div class="HWA2PopUP"><h1>Abilities</h1><h2>{{abilitiesPopUp[0].ability.name}}</h2></div>
                     </div>

                    <div class="weaknessesPopUp">
                        <h1>Weaknesses</h1>
                    </div>

                    <div class="weaknessesTypePopUp">
                        <div v-for="(MD,index) in this.moreDamege" :key="index">
                            <h1 :style="
                            {color: this.$store.state.colorType[MD.name].color, background: indexIndividual.color2}" 
                            
                            class="">{{MD.name}}</h1>
                        </div>
                    </div>

                    <div class="statsPopUp">
                        <div class="statsTextPopUpt">
                            <div>HP</div>
                            <div>Attack</div>
                            <div>Defense</div>
                            <div>Sp. attack</div>
                            <div>Sp. defense</div>
                            <div>Speed</div>
                        </div>

                        <div class="statsNumberPopUp">
                            <div>{{statsPopUp[0].base_stat}}</div>
                            <div>{{statsPopUp[1].base_stat}}</div>
                            <div>{{statsPopUp[2].base_stat}}</div>
                            <div>{{statsPopUp[3].base_stat}}</div>
                            <div>{{statsPopUp[4].base_stat}}</div>
                            <div>{{statsPopUp[5].base_stat}}</div>
                        </div>
                    </div>


                </div>
            </div>
            <div class="container-btn ">
                <button class="btnPopUP btn">Fechar</button>
            </div>
        </div>
    </div>


     <!-- CARD-->
    <div class="card" v-if="(ValidadorPrim && Index <= Limitador)" @click="AlterarEstadoPopUP">
        <div class="colorTypeSingle" :style="{background: indexIndividual.color2}"> 
        <img v-if="SearchImgSingle" :src="SearchImgSingle" class="imgSingle"/>
        <img v-else-if="SearchImgAlt" :src="SearchImgAlt" class="imgSingle"/>
        <h1 class="textName" v-if="(ValidadorPrim && Index <= Limitador)"> 
            <span class="IDText" v-if="IDPokemonSingle >= 100" :style="{color: indexIndividual.color}">#{{IDPokemonSingle}}</span> 
            <span class="IDText" v-else-if="IDPokemonSingle >= 10" :style="{color: indexIndividual.color}">#0{{IDPokemonSingle}}</span> 
            <span class="IDText" v-else :style="{color: indexIndividual.color}">#00{{IDPokemonSingle}}</span>
            {{namePokemonSingle}}
        </h1>
        </div>
    </div>

</template>

<script>
    import api from "@/services/api";

    export default {
        name: 'CardPokemon',
        props: ["propData","typeReq","Index", "Limitador"],


        data () {
            return{
                IDPokemonSingle: null,
                namePokemonSingle: null,
                dataPokemon: [],
                ValidadorPrim: true,
                SearchImgSingle: null,
                SearchImgAlt: null,
                ShowMore:  false,
                typeIndividual: [],
                indexIndividual: [],
                moreDamege: null,
                
            }
        },

        watch: {
            propData(){
                this.RequestPokemons()
            },
        },
        
        methods:{
            AlterarEstadoPopUP(){
                this.InformacoesPopUp(this.nucleo)

                this.ShowMore = !this.ShowMore;
            },

            InformacoesPopUp(response){
                this.typePopUp = response.data.types;
                this.heightPopUP = response.data.height;
                this.weightPopUp = response.data.weight;
                this.abilitiesPopUp = response.data.abilities;
                this.statsPopUp = response.data.stats;



                api.get(`/type/${this.typePopUp[0].type.name}`).then((response) => {
                    this.moreDamege = response.data.damage_relations.double_damage_from;
                }).catch(() => {})
            },

            DivindoInformacoes(response){
                this.nucleo = response

                this.dataPokemon = response.data;
                this.namePokemonSingle = this.dataPokemon.name;
                this.IDPokemonSingle = this.dataPokemon.id;

                this.SearchImgSingle = response.data.sprites.other.dream_world.front_default;
                this.SearchImgAlt = response.data.sprites.other["official-artwork"].front_default;
                
                this.typeIndividual = response.data.types[0].type.name
                
                this.indexIndividual = this.$store.state.colorType[this.typeIndividual]

                if (this.SearchImgSingle){
                    this.ValidadorPrim = true;
                    this.$store.dispatch("Contador")}
                else{
                    if (this.SearchImgSingle){
                    this.ValidadorPrim = true;
                    this.$store.dispatch("Contador")}
                    else{
                        this.ValidadorPrim = false;
                    } 
                }
            },
            RequestPokemons(){

                if (this.typeReq == "/pokemon"){
                    api.get(`/pokemon/${this.propData.name}`).then((response) => {
                        this.DivindoInformacoes(response)
                    }).catch(() => {})
                }
                
                else{
                    api.get(`/pokemon/${this.propData.pokemon.name}`).then((response) => {
                        this.DivindoInformacoes(response)
                    }).catch(() => {})
                }
            }
        },

        mounted() {
            this.RequestPokemons();
            }
        }

    

</script>

<style scoped>
    .card{
        display: flex;
        flex-direction: column;
        background-color: #fff;
        box-shadow: 2px 2px 3px 2px rgba(0, 0, 0, 0.466);
        margin: 10px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        min-width: 300px;
        min-height: 300px;
        padding: 10px;
        cursor: pointer;
        transition:0.5s; 
    }

    .card:hover{
        transform:scale(1.1);
        border: 1px solid #010103    
    }

    .colorTypeSingle{
        border-radius: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-direction: column;

    }


    .imgSingle{
        width: 200px;
        height: 200px;
    }

    .IDText{
        -webkit-text-stroke: 1px black;
        margin-right: 10px;
    }

    .textName{
        text-transform: uppercase;
        justify-content: center;
        align-items: center;
        display: flex;
    }

    .MorePokemon{
        position: fixed;
        background-color:  rgba(0, 0, 0, 0.2);
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 99;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    /* POPUP */
    .popup{
        background-color: #fff;

        width: 50vw;
        height: 65vh;

        display:inline-block;

        border-radius: 20px;
        box-shadow: 1px 1px 5px 2px #01010369;

        padding: 50px 40px;
    }

    .container-popup{
        display: flex;
        width: 100%;
        height: 100%;
    }

    .container-popup-left, .container-popup-right{
        display: flex;
        flex-direction: column;

    }

    .container-btn{
        align-content: center;
        justify-content: center;
        display: flex;
    }

    .container-popup-left{
        align-content: left;
        justify-content: center;

        width: 50%;
        height: 100%;
    }

    .container-popup-right{
        
        align-content: center;
        justify-content: center;

        width: 50%;
        height: 100%;
    }

    .container-popup-left img{
        box-sizing: border-box;
        width: 80%;
        height: 80%;
        justify-self: center;
        align-self: left;
        display: flex;
    }



    .container-popup-right{
        width: 50%;
        height: 100%;
    }
    
    .namePopUP{
        font-size: 20px;
        text-transform: uppercase;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 50px;
        font-weight: bold;
        border: 2px solid #000;
        padding: 10px;
        border-radius: 10px;
        

    }

    .imgTypePopUP{
        width: 30px;
        height: 35px;
        
    }

    .HWAPopUP{
        display: flex;
        justify-content: space-between;
    }
    
    .HWAPopUP h1{
        font-size: 12px;
        color: #aaa;
        text-shadow: 1px 1px 1px#010103;  
    }
    
    .HWAPopUP h2{
        font-size: 12px;    
        margin-bottom: 20px;
    }


     .HWA2PopUP{
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-items: center;
     }

    .HWA2PopUP h1{
        font-size: 16px;
     }

     .weaknessesPopUp h1{
        font-size:16px;
     }

     .weaknessesTypePopUp{
        display: flex;
        justify-content: space-around;
        margin-bottom: 20px;
        
     }

     
     .weaknessesTypePopUp h1{
        padding: 5px;
        font-size: 20px;
        border-radius: 5px;
        text-shadow: 1px 1px 1px#010103;
        box-shadow: 1px 1px 1px 1px #01010369;
        
     }

    .statsPopUp{
        display: flex;
        justify-content:space-between;
    }

    .statsNumberPopUp{
        justify-self: center;
    }

    /*BOTAO */

    .btnPopUP{
        top: -20px;
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
        color: #010103;
        border-radius: 10px;
        transition:1s;
        position: relative;
        overflow: hidden;
        z-index: 2;
        border: none
    }

    .btnPopUP:hover{
        color: #fff;
        text-shadow: 1px 1px #010103ad;
    }
    .btnPopUP:active{
        color: #fff;
        text-shadow: 1px 1px #01010394;
    }

    .btnPopUP::before{
        content: '';
        position:absolute;
        top:50%;
        left: 50%;
        transform: translate(50%, 50%);
        width: 100%;
        height: 100%;
        background-color: #c81511;
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
        background-color:#010103;
        transition: 0.2s;
    }


@media (max-width: 600px){
    .card{
        min-height: 0;
        min-width: 0;
        margin: 5px;
        max-width: 60vw;
        width: 100%;
        overflow: hidden;
    }

}

@media (max-width: 900px){
    .popup{
        overflow: scroll;
        width: 80%;
    }
    .namePopUP{
        flex-direction: column;
        margin: 5px;
    }

    .container-popup{
        flex-direction: column;
        height: auto;

        justify-content: center;
        align-items: center;
    }

    .container-popup-left{
        display: flex;
        justify-content:center;
        align-items: center;
    }

    .HWAPopUP{
        flex-direction: column;
    }

    .HWA2PopUP h2{
        margin-bottom: 5px;
    }

    .weaknessesTypePopUp{
        flex-wrap: wrap;
        justify-content: center;
        align-items:center;
    }

    .weaknessesPopUp{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    .btnPopUP {
        top: 10px;
    }
}

@media (max-width: 360px){
    .namePopUP{
        font-size: 100%;
        border: none;
    }

    .statsTextPopUpt, .statsNumberPopUp{
        font-size: 60%
    }
}

</style>