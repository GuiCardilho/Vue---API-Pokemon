<template>
    <div id="messagem" :class="typeMessage">
        <h1><slot/></h1>
    </div>
</template>

<script>
/* eslint-disable */
    export default{
        name: 'Message',
        props:{
            typeMessage: {
                type: String,
                default: "falseV",
            }
        },

    }
</script>

<style scoped>

    #messagem h1{
        display: flex;
        position: absolute;

        font-size: 15pt;

        margin-top: 30%;

        padding:20px;
        padding-left: 60px;
        
        
    }

    #messagem{
        display: flex;
        
    }

    .falseV h1{
        color: #fff;
        background-color: #c81511;
        border: 2px solid #010103;
        border-left: none;
        letter-spacing: 2px;
        text-shadow: 2px 0 #010103, -2px 0 #010103, 0 2px #010103, 0 -2px #010103,
             2px 2px #010103, -2px -2px #010103, 2px -2px #010103, -2px 2px #010103;
        
    }

    .trueV{
        color: gren;
        background-color: green

        
    }
</style>