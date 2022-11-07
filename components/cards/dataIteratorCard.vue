<template>
  <v-card-text>
    <v-data-iterator
      :items="getCurrenUserFavplaces"
      :items-per-page.sync="itemsPerPage"
      :page.sync="page"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template #header>
        <v-toolbar
          color="transparent"
          class="mb-1"
          flat
        >
          <v-text-field
            v-model="search"
            color="yellow darken-2"
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          />
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer />
            <v-select
              v-model="sortBy"
              color="yellow darken-2"
              flat
              solo-inverted
              hide-details
              :items="getSortKeys"
              item-text="label"
              item-value="value"
              prepend-inner-icon="mdi-magnify"
              label="Sort by"
            />
            <v-spacer />
            <v-btn-toggle
              v-model="sortDesc"
              mandatory
              dark
            >
              <v-btn
                large
                depressed
                color="indigo"
                :value="false"
              >
                <v-icon class="font-weight-bold">
                  mdi-arrow-up
                </v-icon>
              </v-btn>
              <v-btn
                large
                depressed
                color="indigo"
                :value="true"
              >
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template #default="props">
        <v-row>
          <v-col
            v-for="item in props.items"
            :key="item.favplacename"
            cols="12"
            sm="12"
            md="6"
            xl="3"
          >
            <v-card>
              <favplace-information
                :favplace="item"
              />
            </v-card>
          </v-col>
        </v-row>
      </template>

      <template #footer>
        <v-row
          class="mt-2"
          align="center"
          justify="center"
        >
          <span class="grey--text">Items per page</span>
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn
                dark
                text
                color="primary"
                class="ml-2"
                v-bind="attrs"
                v-on="on"
              >
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer />

          <span
            class="mr-4
            grey--text"
          >
            {{ page }} / {{ numberOfPages }}
          </span>
          <v-btn
            fab
            icon
            color="blue darken-3"
            @click="formerPage"
          >
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn
            fab
            icon
            color="blue darken-3"
            @click="nextPage"
          >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-card-text>
</template>
<script lang='ts'>
import { Component, Vue } from 'nuxt-property-decorator'
import FavplaceInformation from './favplace/favplaceInformation.vue'
import { FavplacesStore } from '~/store'

@Component({
  components: {
    FavplaceInformation
  }
})
export default class DataIteratorCard extends Vue {
  itemsPerPageArray = this.$vuetify.breakpoint.xlOnly ? [4, 8, 12] : [2, 4, 6]
  search = ''
  filter = {}
  sortDesc = false
  page = 1
  itemsPerPage = this.$vuetify.breakpoint.xlOnly ? 4 : 2
  sortBy = ''
  sortKeys = [
    {
      label: this.$t('favplace.favplacename'),
      value: 'favplacename'
    },
    {
      label: this.$t('favplace.prefecture'),
      value: 'prefecture'
    },
    {
      label: this.$t('favplace.category'),
      value: 'categories'
    }
  ]

  get numberOfPages () {
    return Math.ceil(this.getCurrenUserFavplaces.length / this.itemsPerPage)
  }

  nextPage () {
    if (this.page + 1 <= this.numberOfPages) { this.page += 1 }
  }

  formerPage () {
    if (this.page - 1 >= 1) { this.page -= 1 }
  }

  updateItemsPerPage (number: number) {
    this.itemsPerPage = number
  }

  get getCurrenUserFavplaces () {
    return FavplacesStore.getCurrenUserFavplaces
  }

  get getSortKeys () {
    return this.sortKeys
  }
}
</script>
