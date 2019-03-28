<template>
    <div>
        <h1 class="m-4">PokéSearch</h1>
        <p class="m-2">Written by <span><a class="no-underline hover:underline" href="https://twitter.com/crumb1e_">@crumb1e</a></span></p>
        <form @submit.prevent="fetchPokemon(searchQuery)" class="w-full mx-auto max-w-sm">
        <div class="flex items-center border-b border-b-2 border-teal py-2">
            <input v-model="searchQuery" class="appearance-none bg-transparent border-none w-full text-grey-darker mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Search for a Pokemon" aria-label="Full name">
            <button @click="fetchPokemon(searchQuery)" class="flex-no-shrink bg-teal hover:bg-teal-dark border-teal hover:border-teal-dark text-sm border-4 text-white py-1 px-2 rounded" type="button">
            Search
            </button>
        </div>
        <div id="error" v-if="searchError">
            <p class="mt-5 mb-3">Sorry, that Pokémon could not be found :(</p>
            <p class="mt-3">Did you spell it's name correctly?</p>
            <p>Did you mean: </p>
            <ul class="list-reset pt-2 flex flex-wrap -mx-2 overflow-hidden">
                <li v-for="pokemon in similarPoke" :key="pokemon.id" class="my-2 px-2 w-1/4 overflow-hidden sm:w-1/3 md:w-1/3">
                    <div class="hover:underline hover:bg-grey-lightest cursor-pointer " @click="fetchPokemon(pokemon.name)">
                        <img :src="pokemon.sprites.front_default" :alt="pokemon.name">
                        <a  class="no-underline">{{ pokemon.name }}</a>
                    </div>
                </li>
            </ul>

        </div>
        </form>

        <display-pokemon
            v-if="singleMon"
            :pokemon="singleMon"
        ></display-pokemon>

    </div>
</template>

<script>
import axios from 'axios'
import resources from '../assets/resources.js'
import DisplayPokemon from './DisplayPokemon.vue'

export default {
    name: 'Home',

    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.fetchPokemon(to.params.pokemon)
        })
    },

    components: {
        DisplayPokemon,
    },

    data() {
        return {
            pokemon: [],
            pokemonNames: [],
            similarPoke: [],
            singleMon: null,
            searchQuery: '',
            searchError: false,
            tempSimilar: null,
            resources: resources,
            errors: [],
        }
    },

    computed: {

    },

    mounted() {
        axios.get('https://pokeapi.co/api/v2/pokemon/?limit=1000')
            .then(response => {
                this.pokemon = response.data
                response.data.results.forEach(element => {
                    this.pokemonNames.push(element.name)                    
                });
            })
            .catch(e => {
                this.errors.push(e)
            })
    },

    methods: {
        fetchPokemon(value) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
                .then(response => {
                    this.singleMon = response.data
                    this.clearErrors()

                })
                .catch(e => {
                    this.clearErrors()
                    this.singleMon = null
                    this.searchError = true
                    this.findSimilar(value)
                    this.errors.push(e)
                })
        },

        getSimilar(value) {
            axios.get(`https://pokeapi.co/api/v2/pokemon/${value}`)
                .then(response => {
                    this.tempSimilar = response.data
                    this.similarPoke.push(this.tempSimilar)
                })
        },

        typeColour(name) {
            return `bg-type-${name}`
        },

        toUpperCase(value) {
            return value.charAt(0).toUpperCase() + value.slice(1)
        },

        findSimilar(value) {
            this.pokemonNames.forEach(element => {
                if (element.includes(value)) {
                    this.getSimilar(element)
                }
            });
        },

        clearErrors() {
            this.errors = []
            this.searchError = false
            this.similarNames = []
        },
    },
}
</script>

