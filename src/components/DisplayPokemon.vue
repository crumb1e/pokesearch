<template>
    <div class="mx-auto mt-4 bg-grey-lighter max-w-sm rounded-lg">
        <img :src="pokemon.sprites.front_default" alt="">
        <h2 class=" mb-2">{{ toUpperCase(pokemon.name) }}</h2>
        <ul class="list-reset text-left m-4 flex justify-center">
            <li v-for="type in pokemon.types" :key="type.slot">
                <div :class="typeColour(type.type.name)" class="shadow-md rounded-full py-2 px-4 mx-2 mb-4">{{ type.type.name }}</div>
            </li>
        </ul>

        <div>
          <ul class="list-reset flex m-4">
            <li class="flex-1 shadow px-2 py-4 mx-4 rounded-lg">Height: {{ pokemon.height / 10 }}m</li>
            <li class="flex-1 shadow px-2 py-4 mx-4 rounded-lg">Weight: {{ pokemon.weight / 10 }}kg</li>
          </ul>
        </div>

        <div class="flex">
            <ul class="list-reset flex-1 text-left m-4">
                <p class="font-bold">Stats</p>
                <li v-for="stat in pokemon.stats" :key="stat.id">
                    <p>{{ stat.stat.name }}: {{ stat.base_stat }}</p>
                </li>
            </ul>
        </div>

        <div class="flex">
            <ul class=" list-reset flex-1 text-center m-4">
                <li v-for="move in pokemon.moves" :key="move.id">
                    <p>{{ move.move.name }}</p>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>
export default {
    name: 'display-pokemon',

    props: {
        pokemon: {
            type: Object,
            required: true,
        }
    },

    methods: {
        typeColour(name) {
            return `bg-type-${name}`
        },

        toUpperCase(value) {
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
    },
}
</script>
