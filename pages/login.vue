<template>
  <bef-login-form-card >
    <template
      #form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-username
          :username.sync="params.username"
          no-validation
        />
        <user-form-password
          :password.sync="params.password"
          no-validation
        />
        <v-card-actions>
          <nuxt-link
            to="#"
            class="body-2 text-decoration-none"
          >
            パスワードを忘れた?
          </nuxt-link>
        </v-card-actions>
        <v-card-text class="px-0">
          <v-btn
            :disabled="!isValid || loading"
            :loading="loading"
            block
            color="myred"
            class="white--text"
            @click="login"
          >
            ログインする
          </v-btn>
        </v-card-text>
      </v-form>
    </template>
  </bef-login-form-card>
</template>

<script lang = 'ts'>
import { Component, Vue } from 'vue-property-decorator';
import befLoginFormCard from '@/components/beforeLogin/befLoginFormCard.vue';
import userFormPassword from '@/components/user/userFormPassword.vue';
import userFormUsername from '@/components/user/userFormUsername.vue';
import { GlobalStore } from '@/store';
import { AxiosError } from "axios";
import { User } from '@/types/user';

interface LoginResponse {
  access_token_exp: number,
  refresh_token_exp: number,
  user: User
}

@Component({ 
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormPassword,
    userFormUsername
  }
})
export default class Login extends Vue {
  isValid: boolean = false;
  loading: boolean = false;
  params:User = { username: '', password: '' };

  /**
   *ログイン処理 
   * 
   */
  async login () {
    this.loading = true;
    if (this.isValid) {
      await this.$axios.$post(
        '/api/v1/login',
        this.params
      )
      .then((response: LoginResponse) => this.authSuccessful(response))
      .catch((error: AxiosError) => this.authFailure(error));
    }
    this.loading = false;
  }
    
  /**
   * ログイン成功時の処理
   * 
   */
  async authSuccessful (response: LoginResponse) {
    await this.$auth.login(response.access_token_exp, response.refresh_token_exp, response.user);
    this.$router.push(GlobalStore.getRememberRoute);
  }

  /**
   * ログイン失敗時の処理
   * 
   */
  authFailure (error: AxiosError) {
    console.log(error);
  }
}
</script>
