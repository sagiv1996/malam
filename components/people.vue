<template lang="pug">
  v-card(width="600" class="px-12")
    v-card-title( justify="center") {{editOrCreate}} people!
    v-card-text
      v-text-field( label="name" v-model="name" maxlength="50" counter="50" prepend-icon="mdi-alpha-n"  clearable)
      v-slider( label="height" v-model="height" min="0" max="220" thumb-label="always" :thumb-size="21" prepend-icon="mdi-human-male-height" clearable  )
      v-slider( label="mass" v-model="mass" min="0" max="150" thumb-label="always" :thumb-size="21" prepend-icon="mdi-alpha-m" clearable )
      v-text-field( label="skin color" v-model="skin_color" prepend-icon="mdi-face-recognition" clearable )
      v-text-field( label="birth year" v-model="birth_year" prepend-icon="mdi-cake-layered" clearable )
      v-text-field( label="eye color" v-model="eye_color" prepend-icon="mdi-eye-settings-outline" clearable)
      v-autocomplete( label="Films" v-model="film" :items="films" item-text="title" item-value="episode_id" multiple clearable prepend-icon="mdi-movie-open-check-outline" deletable-chips small-chips :disabled="editOrCreate === 'update'")
      v-radio-group( v-model="gender" label="gender: " prepend-icon="mdi-gender-male-female")
        v-radio( label='male' key="male" value="male" )
        v-radio( label='female' key="female" value="female" )
    v-card-actions
      v-btn( @click="$emit('closeDialog')" ) close
      v-spacer
      v-btn( @click="handlerClick" :disabled="film && !film.length") {{editOrCreate}}
</template>
<script>
export default {
  data () {
    return {
      name: this.NAME,
      height: this.HEIGHT,
      mass: this.MASS,
      skin_color: this.SKIN_COLOR,
      birth_year: this.BIRTH_YEAR,
      gender: this.GENDER,
      film: this.FILM,
      eye_color: this.EYE_COLOR
    }
  },
  props: {
    url: {
      type: String,
      require: false
    },
    films: {
      type: Object
    },
    FILM: {
      type: String,
      require: false
    },
    editOrCreate: {
      type: String,
      require: true
    },
    NAME: {
      type: String,
      require: false
    },
    HEIGHT: {
      type: Number,
      default: 50,
      require: false
    },
    MASS: {
      type: Number,
      require: false
    },
    SKIN_COLOR: {
      type: String,
      require: false
    },
    BIRTH_YEAR: {
      type: String,
      require: false
    },
    GENDER: {
      type: String,
      validator: val => ['male', 'famale'].includes(val),
      default: 'male'
    },
    EYE_COLOR: {
      type: String,
      require: false
    }
  },
  methods: {
    handlerClick () {
      const people = {
        name: this.name,
        height: this.height,
        mass: this.mass,
        hair_color: this.skin_color,
        birth_year: this.birth_year,
        gender: this.gender,
        films: this.film,
        eye_color: this.eye_color,
        url: this.url
      }
      // create
      if (this.editOrCreate === 'create') {
        this.$store.commit('CREATE_PEOPLE', people)
        this.$emit('addPeople')
      } else if (this.editOrCreate === 'update') {
        this.$store.commit('EDIT_PEOPLE', people)
        this.$emit('updatePeople')
      }
    }
  }
}
</script>
