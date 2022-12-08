<template>
  <ContentBase>
    <div class="row justify-content-center">
      <div class="col-3">
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="username" class="form-label">用户名</label>
            <input v-model="username" type="text" class="form-control" id="username">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">密码</label>
            <input v-model="password" type="password" class="form-control" id="password">
          </div>
          <div class="mb-3">
            <label for="password_confirm" class="form-label">确认密码</label>
            <input v-model="passwordConfirm" type="password" class="form-control" id="password_confirm">
          </div>
          <div class="error-message">
            {{ error_message }}
          </div>
          <button type="submit" class="btn btn-primary">注册</button>
        </form>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {ref} from "vue";
import {useStore} from 'vuex';
import $ from 'jquery';
import router from '@/router';

export default {
  name: "RegisterView",
  components: {ContentBase},
  setup() {
    const store = useStore();
    let username = ref('');
    let password = ref('');
    let passwordConfirm = ref('');
    let error_message = ref('');

    const register = function () {
      error_message.value = "";
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/user/",
        type: "POST",
        data: {
          username: username.value,
          password: password.value,
          password_confirm: passwordConfirm.value,
        },
        success(resp) {
          if (resp.result === "success") {
            // 如果注册成功则直接登录
            store.dispatch("login", {
              username: username.value,
              password: password.value,
              success() {
                router.push({name: 'userlist'});
              },
              error() {
                error_message.value = "系统异常";
              }
            })
          } else {
            error_message.value = resp.result;
          }
        }
      })
    }

    return {
      username,
      password,
      error_message,
      passwordConfirm,
      register,

    }
  }
}
</script>

<style scoped>
.error-message {
  color: red;
}
button {
  width: 100%;
}
</style>