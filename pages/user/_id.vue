<template>
  <v-container fluid>
    <v-row>
      <v-img
        src="https://share-favplace-local.s3.ap-northeast-1.amazonaws.com/default/23648060_s.jpg"
        height="350"
        style="position: relative"
      >
        <v-row class="d-flex justify-end pa-10">
          <v-btn outlined rounded color="myblack">ChangeCover</v-btn>
        </v-row>
      </v-img>
    </v-row>
    <v-row>
      <v-col cols="12" xl="2" lg="4" md="4" sm="12">
        <v-card class="mx-10" elevation="12" :height="getHeight" style="margin-top: -250px">
          <v-card-actions class="d-flex justify-center pt-10">
            <v-avatar size="100">
              <v-img :src="getUser.avatarUrl" />
            </v-avatar>
          </v-card-actions>
          <v-card-title class="d-flex justify-center">{{ getUser.username }}</v-card-title>
          <v-card-sub-title v-if="isCurrentUser" class="d-flex justify-center">{{
            getUser.email
          }}</v-card-sub-title>
          <v-card-actions v-if="isCurrentUser" class="d-flex justify-center">
            <v-btn text nuxt to="/account/settings"
              ><v-icon class="mr-2">mdi-cog</v-icon>EditProfile</v-btn
            >
          </v-card-actions>
          <v-card-actions v-if="!isCurrentUser" class="d-flex justify-center">
            <v-btn class="white--text" color="myblack">Follow</v-btn>
            <v-btn outlined>Message<v-icon class="ml-2">mdi-send</v-icon></v-btn>
          </v-card-actions>
          <v-divider />
          <v-list v-for="list in lists" :key="list.title" nav dense>
            <v-list-item v-if="list.show" link :to="list.to">
              <v-list-item-content class="ml-5">
                <v-list-item-subtitle>{{ list.title }}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action class="mr-5">
                <v-list-item-title class="font-weight-black">{{ list.count }}</v-list-item-title>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" xl="10" lg="8" md="8" sm="12">
        <v-card class="mr-10 overflow-auto" :height="getHeight" style="margin-top: -250px">
          <v-tabs v-model="tab" background-color="mygrey" color="brown" light>
            <v-tab v-for="(item, i) in items" :key="`item-tab-${i}`">
              {{ item.tab }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="(item, i) in items"
              :key="`item-tab-${i}`"
            >
              <component :is="item.component" />
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator"
import { Context } from "@nuxt/types"
import { UsersStore, FavplacesStore } from "@/store"
import UserFavplaces from "@/components/user/favplaces.vue"

@Component({
  components: {
    UserFavplaces,
  },
  async asyncData(route: Context) {
    const id = await Number(route.params.id)
    await UsersStore.fetchUserById(id)
    await FavplacesStore.fetchFavplacesByUserId({ userId: id, pageIndex: 0 })
  },
})
export default class UserShow extends Vue {
  tab = null
  lists = [
    { title: "Follows", count: "633", to: `${this.$route.fullPath}/follows`, show: true },
    { title: "Followers", count: "833", to: `${this.$route.fullPath}/followers`, show: true },
    { title: "FavPlaces", count: "50", to: "", show: true },
    { title: "Schedules", count: "5", to: "", show: this.isCurrentUser },
  ]

  items = [{ tab: "favplaces", component: "user-favplaces" }]

  get getUser() {
    return UsersStore.getUser
  }

  get getHeight() {
    return window.innerHeight - 200
  }

  get isCurrentUser() {
    return this.$auth.currentUser.id === this.getUser.id
  }

}
</script>
