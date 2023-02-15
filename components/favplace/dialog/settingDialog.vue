<template>
  <v-dialog v-model="syncedDialog" max-width="400">
    <v-card>
      <v-list rounded color="grey darken-3" dark>
        <v-list-item-group>
          <v-list-item
            v-for="(menu, i) in menues"
            :key="`menu-divider-${i}`"
            @click.stop="clickAction(menu)"
          >
            <v-list-item-icon>
              <v-icon v-text="menu.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{
                  $t(`favplace.menus.${menu.text}`)
                }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <update-favplace-dialog
            :key="`updateform-divider-${updateFromresetKey}`"
            :dialog.sync="updateDialog"
            :favplace="favplace"
          />
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'
import { Favplace } from '@/types/Favplace'
import UpdateFavplaceDialog from '@/components/favplace/dialog/updateFavplaceDialog.vue'

interface Item {
  text: string;
  icon: string;
}

@Component({
  components: {
    UpdateFavplaceDialog
  }
})
export default class SettingDialog extends Vue {
  menues: Array<Item> = [
    { text: 'Edit', icon: 'mdi-pencil' },
    { text: 'Delete', icon: 'mdi-trash-can' },
    { text: 'ShowFavplace', icon: 'mdi-map-marker' },
    { text: 'ShowAccount', icon: 'mdi-account' }
  ]

  updateDialog = false
  updateFromresetKey = 0

  @Prop({ type: Object, default: () => {}, required: true })
    favplace!: Favplace

  @PropSync('dialog', { type: Boolean, default: false })
    syncedDialog!: boolean

  clickAction (menu: Item) {
    switch (menu.text) {
      case 'Edit':
        this.updateDialog = true
        this.updateFromresetKey++
        this.syncedDialog = false
        break
      case 'ShowFavplace':
        this.$router.push(`/favplace/${this.favplace.id}`)
        break
    }
  }
}
</script>
