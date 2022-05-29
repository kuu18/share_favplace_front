<template>
  <bef-login-form-card>
    <template
      #form-card-content
    >
      <v-form
        v-model="isValid"
        ref="form"
      >
        <user-form-username :username.sync="params.username" />
        <user-form-email :email.sync="params.email" />
        <user-form-password :password.sync="params.password" />
      </v-form>
      <v-btn
        block
        color="myred"
        class="white--text"
        :disabled="!isValid || loading"
        :loading="loading"
        @click="signup"
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
import userFormUsername from '~/components/user/userFormUsername.vue';
import userFormPassword from '@/components/user/userFormPassword.vue';
import { User } from '@/types/user';
import { AxiosResponse, AxiosError } from "axios";

@Component({
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormEmail,
    userFormUsername,
    userFormPassword
  }
})
export default class Signup extends Vue{
  isValid: boolean = false;
  loading: boolean = false;
  params: User = { username: '', email: '', password: '' };

  async signup () {
    await this.$axios.$post(
      '/api/v1/user/create',
      this.params
    )
    .then((response: AxiosResponse) => this.authSuccessful(response))
    .catch((error: AxiosError) => this.authFailure(error));
    this.loading = false;
  }

  // ログイン成功
  authSuccessful (response: AxiosResponse) {
    console.log(response);
  }
  

  // ログイン失敗
  authFailure (error: AxiosError) {
    console.log(error);
  }

  formReset () {
    ( this.$refs as any ).form.reset();
    this.params = { username: '', email: '', password: '' };
  }
}
</script>