<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-3">
            <img class="img-fluid" v-bind:src="user.photo">
          </div>
          <div class="col-9">
            <div class="username">{{user.username}}</div>
            <div class="fansnumber">粉丝数：{{user.followerCount}}</div>
            <button v-if="!user.is_followed" @click="follow" type="button" class="btn btn-success btn-sm">关注</button>
            <button v-if="user.is_followed" @click="unfollow" type="button" class="btn btn-success btn-sm">取消关注</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import {useStore} from "vuex";

export default {
  name: "UserProfileInfo",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  setup(props, context) {
    const store = useStore();
    const follow = function () {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "POST",
        headers: {
          "Authorization": "Bearer " + store.state.user.access,
        },
        data: {
          target_id: props.user.id,
        },
        success(resp) {
          if (resp.result === "success") {
            context.emit("follow");
          }
        }
      });
    }

    const unfollow = function () {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/follow/",
        type: "POST",
        headers: {
          "Authorization": "Bearer " + store.state.user.access,
        },
        data: {
          target_id: props.user.id,
        },
        success(resp) {
          if (resp.result === "success") {
            context.emit("unfollow");
          }
        }
      });
    }

    return {
      follow,
      unfollow,

    }
  }
}

</script>

<style scoped>
.username {
  font-weight: bold;
}
</style>