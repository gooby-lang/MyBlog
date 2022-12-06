<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <UserProfileInfo @follow="follow" @unfollow="unfollow" v-bind:user="user"/>
        <UserProfileWrite @submitPost="submitPost" />
      </div>
      <div class="col-9">
        <UserProfilePost v-bind:posts="posts"/>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import UserProfileInfo from "@/components/UserProfileInfo";
import UserProfilePost from "@/components/UserProfilePost";
import {reactive} from "vue";
import UserProfileWrite from "@/components/UserProfileWrite";

export default {
  name: "UserProfileView",
  components: {
    UserProfileWrite,
    UserProfilePost,
    ContentBase,
    UserProfileInfo,
  },
  setup: function () {
    const user = reactive({
      id: 1,
      UserName: "JiangYinfan",
      LastName: "Jiang",
      FirstName: "Yinfan",
      FollowerCount: 0,
      isFollowed: false,
    });
    const posts = reactive({
      count: 0,
      posts: [

      ]
    });

    const follow = function () {
      if (user.isFollowed) return ;
      user.isFollowed = true;
      user.FollowerCount ++;
    };

    const unfollow = function () {
      if (!user.isFollowed) return ;
      user.isFollowed = false;
      user.FollowerCount --;
    };

    const submitPost = function (content) {
      posts.count ++;
      posts.posts.unshift({
        id: posts.count,
        userId: 1,
        content: content,

      })
    }

    return {
      user,
      follow,
      unfollow,
      posts,
      submitPost,

    }
  }
}
</script>

<style scoped>

</style>