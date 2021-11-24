<template lang="pug">
    div {{$store.state.peopleSelected}}
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      getSelected: 'getSelected'
    })
  },
  mounted () {
    this.$store.dispatch('getPeopleById')
  }
}
</script>
