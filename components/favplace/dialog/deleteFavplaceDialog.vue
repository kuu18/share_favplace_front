<template>
  <v-dialog v-model="syncedDialog" max-width="400">
    <v-card>
      <v-card-title>
        Favplaceを削除しますか？
      </v-card-title>
      <v-card-subtitle>
        このFavplaceを削除しますか？
      </v-card-subtitle>
      <v-list rounded color="grey darken-3" dark>
        <v-list-item-group>
          <v-list-item>
              <v-list-item-title @click="deleteFavplace()">
                削除
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title @click="syncedDialog = false">
                キャンセル
              </v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { AxiosError } from 'axios'
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'
import { Favplace } from '@/types/Favplace'
import UpdateFavplaceDialog from '@/components/favplace/dialog/updateFavplaceDialog.vue'
import { MessageResponse } from '@/types/messageResponse'
import { ErrorResponse } from '@/types/ErrorResponse'
import { GlobalStore, FavplacesStore, SchedulesStore } from '@/store'

@Component({
  components: {
    UpdateFavplaceDialog
  }
})
export default class DeleteFavplaceDialog extends Vue {
  loading = false

  @Prop({ type: Object, default: () => ({}), required: true })
    favplace!: Favplace

  @PropSync('dialog', { type: Boolean, default: false })
    syncedDialog!: boolean

  async deleteFavplace() {
    this.loading = true
    await this.$axios.$delete(
      '/api/v1/favplaces/delete',
      { data: this.favplace }
    )
      .then((response: MessageResponse) => this.success(response))
      .catch((error: AxiosError<ErrorResponse>) => this.failure(error))
    this.loading = false
  }

  success ({ message }: MessageResponse) {
    this.syncedDialog = false
    FavplacesStore.deleteFavplace(this.favplace.id)
    const schedule = this.favplace.schedule
    if(schedule) SchedulesStore.deleteSchedule(schedule.id)
    GlobalStore.commitToast({ msg: message, color: 'success' })
  }

  failure (error: AxiosError<ErrorResponse>) {
    this.syncedDialog = false
    GlobalStore.commitToast({ msg: error.response?.data.message })
  }
}
</script>
