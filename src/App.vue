<template>

  <TheHeader />
  <router-view />
  <TheFooter/>

</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue'; 

  export default{
    name: 'App',
    components: {
    TheHeader,
    TheFooter
}
  }

</script>

<style>
  ::-webkit-scrollbar{
    width: 12px;
    height: 0px;
    }


  ::-webkit-scrollbar-track{
    border-radius:5px;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.25)
  }

  ::-webkit-scrollbar-thumb{
    border-radius:5px;
    background-color: #010103;
    border: 1px solid #fff;
  }

  ::-webkit-scrollbar-thumb:hover{
    background-color: #1b1b25;
  }

  ::-webkit-scrollbar-thumb:active{
    background-color: #010103;
  }
</style>
