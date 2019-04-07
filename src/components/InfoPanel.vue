<template>
    <div class="flex-col">
        <p class="text-left px-2 py-4 mx-4 mt-4 mr-12 rounded-lg">{{ panelTitle }}:</p>
        <ul class="list-reset text-left my-4 ml-4 mr-10 flex flex-wrap">
            <li
                v-for="(item, index) in panelTypes" :key="index"
                class="w-1/3"
            >
                <p :class="typeColour(item)" class="text-center rounded-sm py-2 px-4 mx-2 mb-4 border-b-4 hover:shadow-md">{{ item }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'InfoPanel',

    props: {
        title: {
            type: String,
            required: true,
        },
        types: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            panelTitle: this.title,
            panelTypes: this.types,
        }
    },

    methods: {
        typeColour(name) {
            return `border-type-${name}`
        },
    }
}
</script>
