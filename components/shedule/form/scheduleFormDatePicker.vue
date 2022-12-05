<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template #activator="{ on, attrs }">
      <v-text-field
        v-model="dateProp"
        :label="label"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      />
    </template>
    <v-date-picker
      v-model="dateProp"
      @input="menu = false"
    />
  </v-menu>
</template>
<script lang="ts">
import { Component, Prop, PropSync, Vue } from 'nuxt-property-decorator'

@Component
export default class ScheduleFormDatePicker extends Vue {
  menu = false

  @PropSync('date', { type: String })
    dateProp!: string

  @Prop({ type: String, default: '' })
    label!: string
}
</script>
