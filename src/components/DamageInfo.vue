<template >
    <div class="mx-auto mt-4 bg-grey-lighter max-w-sm rounded-lg static relative">
      <div class="absolute pin-r pin-t h-full">
        <div class="writing-mode-vertical sticky pin-t flex w-full">
          <h1 class="flex-row-reverse py-3">Damage Info</h1>
        </div>
      </div>

        <div class="flex-col overflow-auto">
            <!-- <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Damage Dealt</th>
                        <th>Damage Taken</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="">

                    </tr>
                </tbody>
            </table> -->



            <info-panel
                :title='"Double Damage To"'
                :types="this.doubleDmgTo"
            />

            <info-panel
                :title='"Double Damage From"'
                :types="this.doubleDmgFrom"
            />

            <info-panel
                :title='"Half Damage To"'
                :types="this.halfDmgTo"
            />

            <info-panel
                :title='"Half Damage From"'
                :types="this.halfDmgFrom"
            />

            <info-panel
                :title='"No Damage To"'
                :types="this.noDmgTo"
            />

            <info-panel
                :title='"No Damage From"'
                :types="this.noDmgFrom"
            />
        </div>
    </div>
</template>

<script>
import InfoPanel from './InfoPanel.vue'

export default {
    name: 'DamageInfo',

    components: {
        InfoPanel,
    },

    props: {
        pokemonTypes: {
            type: Array,
            required: true
        },
    },

    mounted() {
        for (var i = 0; i < this.types.length; i++) {
            this.$axios.get(this.types[i].type.url)
                .then(response => {
                    this.addDamageInfo(this.doubleDmgTo, response.data.damage_relations.double_damage_to)
                    this.addDamageInfo(this.doubleDmgFrom, response.data.damage_relations.double_damage_from)

                    this.addDamageInfo(this.halfDmgTo, response.data.damage_relations.half_damage_to)
                    this.addDamageInfo(this.halfDmgFrom, response.data.damage_relations.half_damage_from)

                    this.addDamageInfo(this.noDmgTo, response.data.damage_relations.no_damage_to)
                    this.addDamageInfo(this.noDmgFrom, response.data.damage_relations.no_damage_from)
                })
        }

        this.mergeTypes()
    },

    data() {
        return {
            types: this.pokemonTypes,
            doubleDmgTo: [],
            doubleDmgFrom: [],
            halfDmgTo: [],
            halfDmgFrom: [],
            noDmgTo: [],
            noDmgFrom: [],
            allTypes: [],
        }
    },

    methods: {
        addDamageInfo(array, info) {
            info.forEach(function(element) {
                array.push(element.name)
            })
        },

        mergeTypes() {
            console.log(this.doubleDmgTo)
        },
    },
}
</script>
