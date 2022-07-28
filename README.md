# EvolutionSoft Teste Estagio VueJS

## Informações sobre o projeto
```
AUTOR: Guilherme Henrique Cardilho;
LINGUAGEM DE MARCAÇÃO: HTML CSS;
LINGUAGEM DE PROGRAMAÇÃO: JavaScrpit;
FRAMEWORK: Vue JS;
BIBLIOTECAS: Vuex, Vue Router, Axios;
Web Api: PokeApi (https://pokeapi.co).
```

### Sobre a Página
```
A pagina possui seis áreas sendo elas com suas respectivas informações:

1. Procurar:
  - Local para o usuario realizar rapidas pesquisas de Nomes e IDs
  - Pagina para explorar o Request - Web APIs
  
2. Pokedex:
 -> Local para realizar pesquisas de pokemons, filtrar tipos de pokemons;
 -> É possivel ver mais detalhes sobre o pokemon clicando sobre os cards individual;
 -> A pagina possui o Vuex onde foi utilizado para guardar estados das pesquisas, então se voce realizar algumas pesquisa e trocar de pagina sem atualizar quando voce voltar a pesquisa continuará no local. 
 
3. Sorteador:
  -> Local utilizado para sortear seus pokemons onde você tera a opção de adicionar a sua mochila;
  -> O Sorteador conta com local de exibição de pokemons que você possui na sua mão, seguindo a regra do pokemons onde você pode portar apenas seis o restante será motido automaticamente para sua mochila;
  -> Mini sistema de dinheiro;
  -> O objetivo dessa pagina é gerar informações para o Vuex poder utilizar na outra pagina "Mochila".
  
4. Mochila:
  -> Local utilizado para vizualizar seus pokemons obtido no Sorteador;
  -> Tambem podemos alterar o local do pokemons  "Mochila <-> Mão";
  -> O objetivo da pagina é receber e utilizar informações guardadas no Vuex.

5. Duelo:
  -> Local utilizado para realizar batalhas com outros pokemons aleatorios, e assim conseguir dinheiro para roletar;
  -> Mini sistema de "Ataque", "Defesa", "Especial" valoreas aleatorios;
  -> Mini Sistema de Recompensa e penalidade;
  -> Objetivo geral da pagina é interagir com a "Mochila" e o "Sorteador" atravez do Vuex.
  
6. Sobre
  -> Informações Gerais do site.
  
-----> As paginas contam com um design responsivo facilitando o acesso em aparelhos remotos ou com telas menores <-----

```
***Utilize um terminal de comandos no arquivos da pagina para:***
#### Instalando dependências 
```
npm install
```

##### Iniciando Servidor local
```
npm run serve
```
