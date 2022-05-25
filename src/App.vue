<template>
  <div class="app">
    <div class="test1">My app</div>
    <div class="test2">My app 2</div>
    <img src="@/assets/images/helpbox-contact.jpeg" alt="image" />
    <Post v-for="i in 5" :key="i" />
  </div>
</template>

<script>
import Post from '@/components/Post'

export default {
  data() {
    return {
      helloWorld: 'Hello world'
    }
  },
  components: { Post }
}
</script>
<style lang="scss">
.app {
  background: orange;
  padding: 10px;
}
</style>
