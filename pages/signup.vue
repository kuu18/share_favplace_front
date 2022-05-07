<template>
  <bef-login-form-card>
    <template
      #form-card-content
    >
      <v-form
        v-model="isValid"
        ref="form"
      >
        <user-form-username :username.sync="params.user.username" />
        <user-form-email :email.sync="params.user.email" />
        <user-form-password :password.sync="params.user.password" />
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
import { UserData } from '@/types/user';

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
  params: UserData = { user: { username: '', email: '', password: '' } };

  signup () {
    this.loading = true;
    setTimeout(() => {
      this.formReset();
      this.loading = false;
    }, 1500);
  }

  formReset () {
    ( this.$refs as any ).form.reset();
    this.params = { user: { username: '', email: '', password: '' } };
  }
}
</script>