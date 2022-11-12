<template>
  <v-card-text>
    <v-list class="transparent" min-height="400">
      <v-list-item>
        <v-card-subtitle class="font-weight-bold">
          {{ favplace.favplacename }}
        </v-card-subtitle>
        <v-spacer />
        <v-btn
          v-if="showBtn"
          icon
          nuxt
          :to="`/favplace/${favplace.id}`"
        >
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-map-marker
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Address</v-list-item-title>
          <v-list-item-subtitle>{{ favplace.address }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-phone
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Phone</v-list-item-title>
          <v-list-item-subtitle>999-9999-9999</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-tag
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Category</v-list-item-title>
          <v-list-item-subtitle>{{ getCategoryName }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-list-item>
        <v-list-item-icon>
          <v-icon color="indigo">
            mdi-web
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>URL</v-list-item-title>
          <v-list-item-subtitle><a :href="favplace.referenceUrl">{{ favplace.referenceUrl }}</a></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider inset />

      <v-expansion-panels accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header>More</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-subtitle>
              <v-icon color="indigo">
                mdi-tooltip-plus-outline
              </v-icon>
              Remarks
            </v-card-subtitle>
            <v-card-text>{{ favplace.remarks }}</v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-list>
  </v-card-text>
</template>
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Favplace } from '~/types/Favplace'

@Component
export default class FavplaceInformation extends Vue {
  @Prop({ type: Boolean, default: true })
    showBtn!: boolean

  @Prop({ type: Object, default: () => {}, required: true })
    favplace!: Favplace

  get getCategoryName () {
    return this.favplace.categoryName
      ? this.favplace.categoryName
      : '未設定'
  }
}
</script>
