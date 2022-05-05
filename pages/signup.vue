<template>
  <bef-login-form-card>
    <template
      #form-card-content
    >
      <v-form
        v-model="isValid"
      >
        <user-form-name />
        <user-form-email />
        <user-form-password />
      </v-form>
      <v-btn
        :disabled="!isValid"
        block
        color="myred"
        class="white--text"
      >
        登録する
      </v-btn>
    </template>
  </bef-login-form-card>
</template>
<script lang = 'ts'>
import { Component, Vue } from 'vue-property-decorator';
import befLoginFormCard from '@/components/beforeLogin/befLoginFormCard.vue';
import userFormEmail from '@/components/user/userFormEmail.vue';
import userFormName from '@/components/user/userFormName.vue';
import userFormPassword from '@/components/user/userFormPassword.vue';

@Component({
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormEmail,
    userFormName,
    userFormPassword
  }
})
export default class Signup extends Vue{
  isValid: boolean = false;
}
</script>