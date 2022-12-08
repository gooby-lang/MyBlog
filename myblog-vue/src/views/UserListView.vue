<template>
  <ContentBase>
    <div class="card" v-for="user in users" v-bind:key="user.id" @click="openUserProfile(user.id)">
      <div class="card-body" style="cursor: pointer">
        <div class="row">
          <div class="col-2">
            <img class="img-fluid" :src="user.photo" alt="头像">
          </div>
          <div class="col-11">
            <div class="username">{{user.username}}</div>
            <div class="follow-count">粉丝数：{{user.followerCount}}</div>
          </div>
        </div>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import {ref} from "vue";
import $ from 'jquery';
import router from "@/router/index";
import {useStore} from "vuex";

export default {
  name: "UserListView",
  components: {
    ContentBase
  },
  setup: function () {
    const store = useStore();
    let users = ref([]);
    $.ajax({
      url: 'https://app165.acapp.acwing.com.cn/myspace/userlist/',
      type: "get",
      success(resp) {
        users.value = resp;
      }
    });

    const openUserProfile = function (userId) {
      if (store.state.user.is_login) {
        router.push({
          name: "userprofile",
          params: {
            userId,
          }
        })
      } else {
        router.push({
          name: "login",
        })
      }
    }

    return {
      users,
      openUserProfile,

    }
  }
}
</script>

<style scoped>
.card {
  margin-top: 20px;
}
</style>