<template lang="pug">
  v-card(width="400" class="px-12")
    v-card-title( justify="center") {{editOrCreate}} people!
    v-card-text
      v-text-field( label="name" v-model="name" maxlength="50" counter="50" type="search" prepend-icon="mdi-alpha-n" )
      v-slider( label="height" v-model="height" min="0" max="150" thumb-label="always" :thumb-size="21" prepend-icon="mdi-human-male-height"  )
      v-slider( label="mass" v-model="mass" min="0" max="150" thumb-label="always" :thumb-size="21" prepend-icon="mdi-alpha-m" )
      v-text-field( label="skin color" v-model="skin_color" type="search" prepend-icon="mdi-face-recognition" )
      v-text-field( label="birth year" v-model="birth_year" type="search" prepend-icon="mdi-cake-layered" )
      v-radio-group( v-model="gender" label="gender: " prepend-icon="mdi-gender-male-female" rpw)
        v-radio( label='male' key="male" value="male" )
        v-radio( label='female' key="female" value="female" )
    v-card-actions
      v-btn( @click="$emit('closeDialog')" ) close
      v-spacer
      v-btn() {{editOrCreate}}
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
      gender: this.GENDER
    }
  },
  props: {
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
    }
  }
}
</script>
