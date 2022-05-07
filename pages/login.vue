<template>
  <bef-login-form-card >
    <template
      #form-card-content
    >
      <v-form
        ref="form"
        v-model="isValid"
      >
        <user-form-email
          :email.sync="params.auth.email"
          no-validation
        />
        <user-form-password
          :password.sync="params.auth.password"
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
import { AuthData } from '@/types/auth';
import befLoginFormCard from '@/components/beforeLogin/befLoginFormCard.vue';
import userFormPassword from '@/components/user/userFormPassword.vue';
import userFormEmail from '@/components/user/userFormEmail.vue';
import { GlobalStore } from '~/store';

@Component({ 
  layout: 'beforeLogin',
  components: {
    befLoginFormCard,
    userFormPassword,
    userFormEmail
  }
})
export default class Login extends Vue {
  isValid: boolean = false;
  loading: boolean = false;
  params:AuthData = { auth: { email: '', password: '' } };

  login () {
    this.loading = true
    setTimeout(() => {
      GlobalStore.login()
      this.$router.replace('/')
      this.loading = false
    }, 1500)
  }
}
</script>
