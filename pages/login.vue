<template>
  <bef-login-form-card >
    <template
      #form-card-content
    >
      <toaster />
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
import Toaster from '@/components/ui/toaster.vue';
import { GlobalStore } from '@/store';
import { AxiosResponse, AxiosError } from "axios";
import { User } from '@/types/user';
import { ErrorResponse } from '@/types/errorResponse';


interface LoginResponse extends AxiosResponse{
  access_token_exp: number,
  refresh_token_exp: number,
  user: User
}

@Component({ 
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormPassword,
    userFormUsername,
    Toaster
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
      .then((response: AxiosResponse<LoginResponse>) => this.authSuccessful(response))
      .catch((error: AxiosError<ErrorResponse>) => this.authFailure(error));
    }
    this.loading = false;
  }
    
  /**
   * ログイン成功時の処理
   * 
   */
  async authSuccessful (response: AxiosResponse<LoginResponse>) {
    await this.$auth.login(response.data.access_token_exp, response.data.refresh_token_exp, response.data.user);
    this.$router.push(GlobalStore.getRememberRoute);
  }

  /**
   * ログイン失敗時の処理
   * 
   */
  authFailure (error: AxiosError<ErrorResponse>) {
    if (error.response?.status === 401) {
      GlobalStore.commitToast({ msg: error.response.data.error_messages })
    }
  }
}
</script>
