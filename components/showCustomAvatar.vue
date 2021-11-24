<template lang="pug">
    v-avatar( :size="size")
        v-img( :src="require(`~/static/${isMale? 'male-avatar' : 'woman-avatar'}.jpg`)")
</template>
<script>
export default {
  props: {
    isMale: {
      type: Boolean,
      default: false
    },
    size: {
      type: Number,
      default: 35
    }
  }
}
</script>
