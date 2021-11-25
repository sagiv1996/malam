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
              v-btn( @click="newPeople = true") new
              v-spacer
              v-btn() edit
              v-spacer
              v-btn( @click.once="handlerDelete") delete
      v-col( cols="12")
        v-data-iterator( :items="$store.state.films" :items-per-page.sync="$store.state.films.length" hide-default-footer :search="search")
          template( v-slot:header)
            v-text-field( v-model="search" label="free search..." type="search" :placeholder="placeholder" prepend-icon="mdi-magnify-expand")
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
                v-snackbar( :value="modal.open" absolute top color="success" shaped @input="modal.open = false") {{modal.text}}
                v-dialog( :value="editPeople || newPeople" @click:outside="handlerCloseDialog" :editOrCreate="StringEditOrCreate")
                  people( @closeDialog="handlerCloseDialog")

</template>
<script>
export default {
  data () {
    return {
      modal: {
        open: false,
        text: null
      },
      newPeople: false,
      editPeople: false,
      search: null
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
      this.modal = { open: true, text: 'Successfully deleted. To see the results, the table in the previous screen must be interpreted!' }
    },
    handlerCloseDialog () {
      this.newPeople = false
      this.editPeople = false
    }
  },
  computed: {
    StringEditOrCreate () {
      return this.newPeople ? 'create' : this.editPeople ? 'edit' : null
    },
    placeholder () {
      return `exmple: ${this.$store.state.films[0] && this.$store.state.films[0].title ? this.$store.state.films[0].title : 'Attack of the Clones'}`
    }
  }
}
</script>
