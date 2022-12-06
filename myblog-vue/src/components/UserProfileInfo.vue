<template>
  <div class="container">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-3">
            <img class="img-fluid" src="../assets/logo.png">
          </div>
          <div class="col-9">
            <div class="username">{{fullName}}</div>
            <div class="fansnumber">粉丝数：{{user.FollowerCount}}</div>
            <button v-if="!user.isFollowed" @click="follow" type="button" class="btn btn-success btn-sm">关注</button>
            <button v-if="user.isFollowed" @click="unfollow" type="button" class="btn btn-success btn-sm">取消关注</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  name: "UserProfileInfo",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },

  setup: function (props, context) {
    let fullName = computed(() => {
      return props.user.LastName + " " + props.user.FirstName;
    });

    const follow = function () {
      context.emit("follow");
      // console.log("follow");
    }

    const unfollow = function () {
      context.emit("unfollow");
      // console.log("unfollow");
    }

    return {
      fullName,
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