<template>
  <header id="barra">
    <div class="logo">
        <img src="../../public/img/logo.png"/>
    </div>

    <div class="barraLinks">

      <router-link to="/" class="linksTo btn">Procurar</router-link>
      <router-link to="/pokedex" class="linksTo btn">Pokedex</router-link>
      <router-link to="/sorteador" class="linksTo btn">Sorteador</router-link>
      <router-link to="/mypokedex" class="linksTo btn">Mochila</router-link>
      <router-link to="/duelo" class="linksTo btn">Duelo</router-link>
      <router-link to="/about" class="linksTo btn">Sobre</router-link>

    </div>
  </header>
</template>

<script> 
/* eslint-disable */

  export default{
    name: 'TheHeader',
    components: {

    }
  }

</script>

<style scoped>
  #barra{
    width: 100%;
    height: 100px;
    background-color:#c81511;
    border-bottom: 3px solid #010103;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
  }

  .logo{
    box-sizing: border-box;
  }

  .logo img{
    max-width: 200px;
    max-height: 200px;
    width: 50%;
    height: 50%;
    margin: 10px 60px;
    box-sizing: border-box;
  }

  .barraLinks{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
  }
  
  .linksTo{
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
    background-color: transparent;
    color: #fff;
    border-radius: 10px;
    transition:1s;
    position: relative;
    overflow: hidden;
    z-index: 2;
    }

  .linksTo:hover{
    border: 2px solid white;
  }

  .linksTo::before{
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


  @media (max-width: 1050px){
    #barra{
      display: flex;
      flex-direction: column;
      height: auto;
    }

    .logo{
      display: flex;
      width:30%;
      min-width: 300px;
      justify-content:center;
      align-items:center;
      
    }

    .logo img{
      margin: 0; 
    }

    .barraLinks{
      width:auto;
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 300px){
    .logo{
      min-width: 90vw;
    }
  }
</style>
