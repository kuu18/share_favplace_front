<template>
  <v-card class="ma-5" flat>
  <v-row>
      <v-col
        v-for="(favplace, i) in getFavplaces"
        :key="`favplace-${i}`"
        cols="12"
        sm="12"
        lg="4"
        xl="3"
      >
          <favplace-simple-card 
            :favplace="favplace"
          />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { FavplacesStore } from "@/store"

@Component({
  components: {
  },
})
export default class UserFavplaces extends Vue {
  get getFavplaces() {
    return FavplacesStore.getFavplaces
  }
}
</script>
