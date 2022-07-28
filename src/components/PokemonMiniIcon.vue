<template>
    <div class="mini-icons">
        <img :src="Data.sprites.front_default" />
    </div>
</template>

<script>
    export default {
        name: 'PokemonMiniIcon',
        props: {
            Data: Object
            }
    }
</script>

<style scoped>

.mini-icons{
    width: 96px;
    height: 96px;
}

.mini-icons:hover{
  border: 1px solid #777777;
  transform: scale(1.5);
  background-color:#cccccc; 

}
</style>