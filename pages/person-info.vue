<template lang="pug">
    v-row( fill-height align="center" justify="cetner")
      v-col( cols="12")
        v-card( hover)
          v-card-title info about:  {{$store.state.selected.name}}
          v-divider
          v-list
            v-list-item
              v-list-item-avatar
                v-icon mdi-human-male-height
              v-list-item-content
                v-list-item-title {{$store.state.selected.height}}
                v-list-item-subtitle height
            v-list-item
              v-list-item-icon
                v-icon mdi-alpha-m
              v-list-item-content
                v-list-item-title {{$store.state.selected.mass}}
                v-list-item-subtitle mass
            v-list-item
              v-list-item-avatar
                v-icon mdi-face-recognition
              v-list-item-content
                v-list-item-title {{$store.state.selected.skin_color}}
                v-list-item-subtitle skin color
            v-list-item
              v-list-item-avatar
                v-icon mdi-cake-layered
              v-list-item-content
                v-list-item-title {{$store.state.selected.birth_year}}
                v-list-item-subtitle birth year
            v-list-item
              v-list-item-avatar
                show-custom-avatar( :isMale="$store.state.selected === 'male'" )
              v-list-item-content
                v-list-item-title {{$store.state.selected.gender}}
                v-list-item-subtitle gender
            v-card-actions
              v-dialog
                  template( v-slot:activator="{ on, attrs }")
                    v-btn( v-bind="attrs" v-on="on")
                      v-icon( left) mdi-pencil
                      span edit
                  template( v-slot:default="dialog")
                    people( @closeDialog="dialog.value=false" editOrCreate="update" @updatePeople="[snackbar = true, dialog.value=false]" :NAME="$store.state.selected.name" :HEIGHT="$store.state.selected.height" :MASS="$store.state.selected.mass" :SKIN_COLOR="$store.state.selected.skin_color" :BIRTH_YEAR="$store.state.selected.birth_year" :GENDER="$store.state.selected.gender" :films="$store.state.selected.films" :FILM="$store.state.selected.films" :EYE_COLOR="$store.state.selected.eye_color" :url="$store.state.selected.url" )
              v-spacer
              v-btn( @click="handlerDelete")
                v-icon( left) mdi-delete
                span delete
      v-col( cols="12")
        v-data-iterator( :items="$store.state.films" :items-per-page.sync="$store.state.films.length" hide-default-footer)
          template( v-slot:default="props")
            v-row( justify="center")
              v-col( cols="12" md="6" lg="4"  v-for="(film, index) in $store.state.films")
                v-card( hover)
                  v-card-title {{film.title}}
                  v-card-subtitle created time {{film.created.slice(0, 10)}}
                  v-divider
                  v-list
                    v-list-item
                      v-list-item-avatar R
                      v-list-item-content
                        v-list-item-title {{film.release_date}}
                        v-list-item-subtitle release date
                    v-list-item
                      v-list-item-avatar O
                      v-list-item-content
                        v-list-item-title {{film.opening_crawl.length}}
                        v-list-item-subtitle opening crawl length
                    v-list-item
                      v-list-item-avatar C
                      v-list-item-content
                        v-list-title {{film.characters.length}}
                        v-list-item-subtitle characters length
                    v-list-item
                      v-list-item-avatar P
                      v-list-item-content
                        v-list-item-title {{film.planets.length}}
                        v-list-item-subtitle planets length
                    v-list-item
                      v-list-item-avatar S
                      v-list-item-content
                        v-list-item-title {{film.starships.length}}
                        v-list-item-subtitle starships length
                    v-list-item
                      v-list-item-avatar V
                      v-list-item-content
                        v-list-item-title {{film.vehicles.length}}
                        v-list-item-subtitle vehicles length
                    v-list-item
                      v-list-item-avatar S
                      v-list-item-content
                        v-list-item-title {{film.species.length}}
                        v-list-item-subtitle species length
              v-col
                v-snackbar( v-model="snackbar" absolute top color="success" shaped @input="snackbar = false") successful actions. in the next search the value will be update

</template>
<script>
export default {
  data () {
    return {
      snackbar: false,
      editPeople: false
    }
  },
  middleware ({ redirect, store }) {
    if (!store.state.selected || !store.state.films) {
      redirect('/people-list')
    }
  },
  methods: {
    handlerDelete () {
      this.$store.commit('REMOVE_PEOPLE')
      this.snackbar = true
    }
  },
  computed: {
    placeholder () {
      return `exmple: ${this.$store.state.films[0] && this.$store.state.films[0].title ? this.$store.state.films[0].title : 'Attack of the Clones'}`
    }
  }
}
</script>
