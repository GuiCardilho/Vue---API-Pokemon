<template>
    <div class="mini-icons" @click="AlterarEstado" @mouseover="ExibirSeta()" @mouseleave="TirarSeta()">
        <img clas=".mini-icons-img" :src="Data.sprites.front_default" />
        <img  class="seta" v-if="local == 'Mochila' && MouseSobre == true" src="@/../public/img/cima.png" />
        <img class="seta" v-if="local == 'Mao' && MouseSobre == true" src="@/../public/img/baixo.png" />
    </div>
</template>

<script>
    export default {
        name: 'MiniIconsNaMochila',
        props: {
            Data: Object,
            local: String,
            },
        
        data(){
            return{
                MouseSobre: false
            }
        },

        methods: {
            AlterarEstado(){
                this.$store.dispatch("AlterarLocalDeGuardar",this.Data)
            },

            ExibirSeta(){
                this.MouseSobre = true
            },

            TirarSeta(){
                this.MouseSobre = false
            },
        },
    }
    
</script>

<style scoped>

.mini-icons{
    cursor: pointer;
    display: flex;

    justify-content: center;
    align-items: center;

}

.mini-icons-img{
    width: 96px;
    height: 96px;
}

.seta{
    position:absolute;
    width: 30px;
    height: 30px;
}

</style>