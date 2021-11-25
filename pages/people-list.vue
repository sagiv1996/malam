<template lang="pug">
    v-data-table( :headers='th' :items="pepoleFilter" :server-item-length="pepoleFilter.length")
        template(v-slot:top)
            v-form( ref="form" @submit.prevent="filterData" )
                v-row( align="baseline" class="mx-3")
                    v-col( cols="3")
                        v-text-field( label="name" v-model="name" maxlength="50" clearable :counter="50" @keyup.enter="filterData" placeholder="exmple: luk" solo)
                    v-col( cols="4")
                        v-autocomplete( label="Films" v-model="film" :items="films" item-text="title" :rules="[v => !!v || 'film is required']" required item-value="episode_id" clearable @keyup.enter="filterData" solo)
                    v-col( cols="3")
                        v-autocomplete( label="Species" v-model="specie" :items="speciesFilter" item-text="homeworld" item-value="title" clearable :disabled="speciesFilter.length<1" @keyup.enter="filterData" solo )
                    v-col(cols="1")
                        v-tooltip( top)
                            template(v-slot:activator="{ on, attrs } ")
                                v-btn( @click="filterData" fab small v-bind="attrs" v-on="on" type="submit")
                                    v-icon mdi-account-search
                            span search
                    v-col( cols="1")
                      v-dialog
                        template( v-slot:activator="{ on, attrs }")
                          v-btn(small v-bind="attrs" v-on="on")
                            v-icon mdi-plus
                            span new
                        template( v-slot:default="dialog")
                          people( @closeDialog="dialog.value=false" editOrCreate="create" :films="films" @addPeople="[snackbar = true, dialog.value=false]" :url="new Date().getTime()")
                      v-snackbar( :value="snackbar" absolute top color="success" shaped @input="snackbar = false") the transaction completed successfully :)
        template( v-slot:body="{ items }")
          tbody
            tr(v-for="(item, key) in items" @click="handlerClick(item)" :class="item.url === selectedRow ? 'blue-grey' : ''")
              td {{item.name}}
              td {{item.height}}
              td {{item.hair_color}}
              td {{item.eye_color}}
              td {{item.birth_year}}
              td
                show-custom-avatar( :isMale="item.gender === 'male'" )
</template>
<script>
export default {
  async asyncData ({ $axios, store }) {
    if (store.state.people.length === 0) {
      const people = await $axios.$get('people')
      store.commit('SET_PEOPLE', people)
      const films = await $axios.$get('films')
      const species = await $axios.$get('species')
      return { films, species }
    }
  },
  data () {
    return {
      snackbar: false,
      selectedRow: null,
      pepoleFilter: [],
      name: null,
      film: null,
      specie: null,
      th: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Height',
          value: 'height'
        },
        {
          text: 'Hair Color',
          value: 'hair_color'
        },
        {
          text: 'Eye color',
          value: 'eye_color'
        },
        {
          text: 'Birth year',
          value: 'birth_year'
        },
        {
          text: 'Avatar',
          value: 'gender'
        }
      ]
    }
  },
  methods: {
    filterData () {
      if (this.$refs.form.validate()) {
        this.pepoleFilter = this.$store.getters.getPeople(this.name, this.film, this.specie)
      }
    },
    async handlerClick (row) {
      try {
        this.selectedRow = row.url
        await this.$store.dispatch('loadData', row.url)
        console.log(this.$store.state)
        this.$router.push({ path: '/person-info' })
      } catch (error) {
        alert('data didnt found. change your filter')
      }
    }
  },
  computed: {
    speciesFilter () {
      // return empty array if is null
      if (!this.film) {
        return []
      }
      // find this in array
      const temp = this.films.find(film => film.episode_id === this.film)?.characters
      const d = []
      temp.forEach((key) => {
        if (this.species[key]) {
          d.push(this.species[key])
        }
      })
      return d
    }
  }
}
</script>
