<template>
  <v-menu
    ref="timeMenuRef"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="timeProp"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="timeProp"
        :rules="rules"
        :label="label"
        prepend-icon="mdi-clock-time-four-outline"
        readonly
        clearable
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-time-picker
      v-if="menu"
      v-model="timeProp"
      full-width
      :max="max"
      :min="min"
      @click:minute="timeMenuRef.save(timeProp)"
    />
  </v-menu>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Ref, Vue } from "nuxt-property-decorator"

@Component
export default class ScheduleFormTimePicker extends Vue {
  menu = false

  @Ref()
  timeMenuRef!: Vue & {
    save: (time: string) => void
  }

  @PropSync("time", { type: String })
  timeProp!: string

  @PropSync("validation", { type: Array, default: () => [] })
  rules!: Array<string>

  @Prop({ type: String, default: "" })
  label!: string

  @Prop({ type: String, default: "" })
  readonly max!: string

  @Prop({ type: String, default: "" })
  readonly min!: string
}
</script>
