<template lang="pug">
    v-data-table( :headers='th' :items="pepoleFilter" :server-item-length="pepoleFilter.length")
        template(v-slot:top)
            v-form( ref="form" @submit="filterData")
                v-row( align="center")
                    v-col( cols="5")
                        v-text-field( label="name" v-model="name" maxlength="50" clearable :counter="50" @keyup.enter="filterData")
                    v-col( cols="3")
                        v-autocomplete( label="Films" v-model="film" :items="films" item-text="title" :rules="[v => !!v || 'name is required']" required item-value="episode_id" clearable @keyup.enter="filterData" )
                    v-col( cols="3")
                        v-autocomplete( label="Species" v-model="specie" :items="speciesFilter" item-text="homeworld" item-value="title" clearable :disabled="speciesFilter.length<1" @keyup.enter="filterData" )
                    v-col(cols="1")
                        v-tooltip( top)
                            template(v-slot:activator="{ on, attrs } ")
                                v-btn( @click="filterData" fab small v-bind="attrs" v-on="on" )
                                    v-icon mdi-account-search
                            span search
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
      store.commit('setPeople', people)
      const films = await $axios.$get('films')
      const species = await $axios.$get('species')
      return { films, species }
    }
  },
  data () {
    return {
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
        // alert(JSON.stringify(row))
        // await this.$store.commit('setSelected', row.url)
        this.selectedRow = row.url
        await this.$store.dispatch('loadData', row.url)
        console.log(this.$store.state)
        this.$router.push({ path: '/person-info' })
        // this.$nuxt.$options.router.push({ path: '/person-info ' })
      } catch (error) {
        alert(error)
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
