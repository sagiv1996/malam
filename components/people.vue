<template lang="pug">
    v-card
        v-form
            v-row
                v-col( cols="12")
                    v-text-field( v-model="people.name" maxlength="50" counter="50")
</template>
<script>
export default {
  props: {
    people: {
      type: Object,
      default: function () { 
        return {
          name: null,
          height: null,
          mass: null,
          skin_color: null,
          birth_year: null,
          gender: null 
        }
      }
    }
  }
}
</script>
