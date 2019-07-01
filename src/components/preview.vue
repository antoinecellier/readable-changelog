<template>
  <div>
    <h3>Preview</h3>
    <div v-html="changeLogPreviewForHtml"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters('commits', ['changeLogPreviewForHtml'])
}
</script>
