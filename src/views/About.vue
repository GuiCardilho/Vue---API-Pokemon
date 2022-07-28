<template>
  <div class="background">
    <div class="container-info">
      <div class="container-central">
      <h1>Autor: <span class="text-info">Guilherme Henrique Cardilho</span></h1>
      <h1>Linguagem de marcação: <span class="text-info">Html CSS</span></h1>
      <h1>Linguagem de Programação:<span class="text-info"> JavaScrpit</span></h1>
      <h1>Framework:<span class="text-info"> Vue JS</span></h1>
      <h1>Bibliotecas:<span class="text-info"> Vuex, Vue Router, Axios</span></h1>
      </div>
    </div>
  </div>
</template>

<script> 
/* eslint-disable */

  export default{
    name: 'About',
    components: {

    }
  }

</script>

<style scoped>

  .background{
    background-image: url('@/../public/img/background3.png');
    background-position: center;
    width: 100vw;
    height: 80vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container-info{
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    color: #c81511;
    background-color: #fff;
    padding: 5%;
    box-shadow: 3px 3px 6px 1px #cccccc;
    border-radius: 15px;
  }

  .text-info{
    font-weight: normal;
    text-transform: capitalize;
    color: #010103
  }

  @media (max-width: 600px){
    .background{
      height: auto;
      width: auto;
    }

    .container-central h1{
      margin: 10% 0
    }

    .container-info{
      margin: 5%
    }
  }
</style>
