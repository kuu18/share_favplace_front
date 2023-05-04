<template>
  <v-menu
    ref="refmenu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="syncedDate"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="syncedDate"
        :rules="rules"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        clearable
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="syncedDate"
      no-title
      scrollable
      :show-current="min || max"
      :max="max"
      :min="min"
    >
      <v-spacer></v-spacer>
      <v-btn
        text
        color="primary"
        @click="menu = false"
      >
        Cancel
      </v-btn>
      <v-btn
        text
        color="primary"
        @click="refmenu.save(syncedDate)"
      >
        OK
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue, Ref } from "nuxt-property-decorator"

@Component
export default class ScheduleFormDatePicker extends Vue {
  menu = false

  @PropSync("date", { type: String })
  syncedDate!: string

  @Prop({ type: String, default: "" })
  readonly label!: string

  @Prop({ type: String, default: "" })
  readonly max!: string

  @Prop({ type: String, default: "" })
  readonly min!: string

  @PropSync('validation', { type: Array, default: () => [] })
  rules!: Array<string>

  @Ref()
  refmenu!: HTMLMenuElement & {
    save: (syncedDate: string) => void
  }

}
</script>
