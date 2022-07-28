# EvolutionSoft Teste Estagio VueJS

## Informações sobre o projeto
```
AUTOR: Guilherme Henrique Cardilho;
LINGUAGEM DE MARCAÇÃO: HTML CSS;
LINGUAGEM DE PROGRAMAÇÃO: JavaScrpit;
FRAMEWORK: Vue JS;
BIBLIOTECAS: Vuex, Vue Router, Axios.
```

### Sobre a Página
```
A pagina possui cinco areas sendo elas com suas respectivas informações:

- Procurar:
  -> Local para o usuario realizar rapidas pesquisas de Nomes e IDs
  -> Pagina para explorar o Request - Web APIs
  
- Pokedex:
 -> Local para realizar pesquisas de pokemons, filtrar tipos de pokemons;
 -> A pagina possui o Vuex onde foi utilizado para guardar estados das pesquisas, então se voce realizar algumas pesquisa e trocar de pagina sem atualizar quando voce voltar a pesquisa continuará no local. 
 
- Sorteador:
  -> Local utilizado para sortear seus pokemons onde você tera a opção de adicionar a sua mochila;
  -> O Sorteador conta com local de exibição de pokemons que você possui na sua mão, seguindo a regra do pokemons onde você pode portar apenas seis o restante será motido automaticamente para sua mochila;
  -> O objetivo dessa pagina é gerar informações para o Vuex poder utilizar na outra pagina "Mochila".
  
- Mochila:
  -> Local utilizado para vizualizar seus pokemons obtido no Sorteador;
  -> Tambem podemos alterar o local do pokemons  "Mochila <-> Mão";
  -> O objetivo da pagina é receber e utilizar informações guardadas no Vuex.
  
- Sobre
  -> Informações Gerais do site.

```

#### Instalando dependências
```
npm install
```

##### Iniciando Servidor local
```
npm run serve
```
