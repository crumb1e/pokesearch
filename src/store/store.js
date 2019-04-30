import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        selectedPokemon: '',
        similarPokemon: [],
        genOne: []
    },
    mutations: {
        selectPokemon(state, selectedPokemon) {
            state.selectedPokemon = selectedPokemon
        },
        similarPokemon(state, similarPokemon) {
            state.similarPokemon.push(similarPokemon)
        },
        genOne(state, genOne) {
            state.genOne = genOne
        }
    },
    getters: {
        selectedPokemon: state => state.selectedPokemon,
        similarPokemon: state => state.similarPokemon,
        genOne: state => state.genOne
    }
})