<template>
  <v-card-text>
    <v-sheet>
      <iframe
        :src="`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26356315.701909266!2d-113.65984645545673!3d36.25591957613731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited+States!5e0!3m2!1sen!2sus!4v1566158729223!5m2!1sen!2sus`"
        allowfullscreen
        frameborder="0"
        height="400"
        style="border:0"
        width="100%"
      />
    </v-sheet>
  </v-card-text>
</template>
<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class FavplaceMap extends Vue {

}
</script>
