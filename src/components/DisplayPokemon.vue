<template>
  <div class="wrapper">
    <div class="mx-auto mt-4 bg-grey-lighter max-w-sm rounded-lg static relative">
      <div class="absolute pin-r pin-t h-full">
        <div class="writing-mode-vertical sticky pin-t flex w-full">
          <h1 class="flex-row-reverse py-3">Overview</h1>
        </div>
      </div>

        <img :src="pokemon.sprites.front_default" alt="">
        <h2 class=" mb-2">{{ toUpperCase(pokemon.name) }}</h2>
        <ul class="list-reset text-left m-4 flex justify-center">
            <li v-for="type in pokemon.types" :key="type.slot">
                <div :class="typeColour(type.type.name)" class="shadow-md rounded-full py-2 px-4 mx-2 mb-4">{{ type.type.name }}</div>
            </li>
        </ul>


        <div>
          <ul class="list-reset flex m-4 pb-6">
            <li class="flex-1 shadow px-2 py-4 mx-4 rounded-lg">Height: {{ pokemon.height / 10 }}m</li>
            <li class="flex-1 shadow px-2 py-4 mx-4 rounded-lg">Weight: {{ pokemon.weight / 10 }}kg</li>
          </ul>
        </div>
    </div>

    <div class="mx-auto mt-4 bg-grey-lighter max-w-sm rounded-lg static relative">
      <div class="absolute pin-r pin-t h-full">
        <div class="writing-mode-vertical sticky pin-t flex w-full">
          <h1 class="flex-row-reverse py-3">Stats</h1>
        </div>
      </div>

        <div class="flex">
            <ul class="list-reset flex-1 text-left my-4 ml-4 mr-10">
                <li v-for="(stat, index) in pokemon.stats" :key="index">
                    <p class="my-3">{{ formatString(stat.stat.name) }}: <span :class="`stat_${index}_count`"></span></p>
                    <div class="mr-10">
                      <div :id="`stat_` + index" class="shadow-md bg-blue h-2 rounded-lg" style="width: 0;"></div>
                    </div>
                </li>
            </ul>
        </div>

        <!-- <div class="flex">
            <ul class=" list-reset flex-1 text-center m-4">
                <li v-for="move in pokemon.moves" :key="move.id">
                    <p>{{ move.move.name }}</p>
                </li>
            </ul>
        </div> -->

    </div>

    <damage-info
        :pokemon-types="types"
    ></damage-info>

  </div>
</template>

<script>
import DamageInfo from './DamageInfo.vue'

export default {
    name: 'display-pokemon',

    components: {
        DamageInfo,
    },

    props: {
        pokemon: {
            type: Object,
            required: true,
        },
    },

    data() {
      return {
        stats: [],
      }
    },

    watch: {
      pokemon: function(value) {
        this.stats = this.pokemon.stats
        for (var i = 0; i < this.stats.length; i++) {
          this.animateStatBar(`#stat_${i}`, this.stats[i].base_stat)
          this.animateStatValue(`.stat_${i}_count`, this.stats[i].base_stat)
        }
      }
    },

    mounted() {
      this.stats = this.pokemon.stats
      for (var i = 0; i < this.stats.length; i++) {
          this.animateStatBar(`#stat_${i}`, this.stats[i].base_stat)
          this.animateStatValue(`.stat_${i}_count`, this.stats[i].base_stat)
      }
    },

    computed: {
        types: function () {
            let self = this
            let allTypes = []
            self.pokemon.types.forEach((element) => {
                allTypes.push(element)
            })
            return allTypes
        },
    },

    methods: {
        typeColour(name) {
            return `bg-type-${name}`
        },

        toUpperCase(value) {
            return value.charAt(0).toUpperCase() + value.slice(1)
        },

        animateStatBar(element, value) {
          this.$anim({
            targets: element,
            width: `${value}%`,
            easing: 'easeOutSine'
          })
        },

        animateStatValue(element, value) {
            console.log('animating: ' + element + ' by this amount: ' + value)
            this.$anim({
                targets: element,
                innerHTML: [0, value],
                round: 1,
                easing: 'easeOutSine'
            })
        },

        formatString(string) {
          let result = string
            .replace(/-/g, ' ')
            .replace(/^./, function(x){return x.toUpperCase()})

          return result
        }
    },
}
</script>
