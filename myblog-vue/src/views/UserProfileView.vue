<template>
  <ContentBase>
    <div class="row">
      <div class="col-3">
        <UserProfileInfo @follow="follow" @unfollow="unfollow" :user="user"/>
        <UserProfileWrite v-if="is_me" @submitPost="submitPost"/>
      </div>
      <div class="col-9">
        <UserProfilePost :posts="posts" :user="user" @deletePost="deletePost"/>
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import UserProfileInfo from "@/components/UserProfileInfo";
import UserProfilePost from "@/components/UserProfilePost";
import UserProfileWrite from "@/components/UserProfileWrite";
import {reactive} from "vue";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {computed} from "vue";
import $ from 'jquery';

export default {
  name: "UserProfileView",
  components: {
    UserProfileWrite,
    UserProfilePost,
    ContentBase,
    UserProfileInfo,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const userId = parseInt(route.params.userId);
    const user = reactive({});
    const posts = reactive({});

    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
      type: "GET",
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      data: {
        user_id: userId,
      },
      success(resp) {
        user.id = resp.id;
        user.username = resp.username;
        user.photo = resp.photo;
        user.followerCount = resp.followerCount;
        user.is_followed = resp.is_followed;
      }
    });

    $.ajax({
      url: "https://app165.acapp.acwing.com.cn/myspace/post/",
      type: "GET",
      headers: {
        'Authorization': "Bearer " + store.state.user.access,
      },
      data: {
        user_id: userId,
      },
      success(resp) {
        posts.count = resp.length;
        posts.posts = resp;
      }
    });
    const follow = function () {
      if (user.is_followed) return ;
      user.is_followed = true;
      user.followerCount ++;
    };

    const unfollow = function () {
      if (!user.is_followed) return ;
      user.is_followed = false;
      user.followerCount --;
    };

    const submitPost = function (content) {
      posts.count ++;
      posts.posts.unshift({
        id: posts.count,
        userId: 1,
        content: content,
      })
    };

    const deletePost = function (post_id) {
      posts.posts = posts.posts.filter(post => post.id !== post_id);
      posts.count = posts.posts.length;
    }

    const is_me = computed(() => {
      return userId === store.state.user.id;
    });

    return {
      user,
      follow,
      unfollow,
      posts,
      submitPost,
      is_me,
      deletePost,

    }
  }
}
</script>

<style scoped>

</style>