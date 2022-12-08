<template>
  <div class="card">
    <div class="card-body">
      <div v-for="post in posts.posts" v-bind:key="post.id">
        <div class="card single-post">
          <div class="card-body">
            {{post.content}}
            <button @click="deletePost(post.id)" v-if="is_me" type="button" class="btn btn-danger btn-sm del_btn">
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";
import $ from "jquery";

export default {
  name: "UserProfilePost",
  props: {
    posts: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    }
  },
  setup(props, context) {
    const store = useStore();

    let is_me = computed(() => {
      return store.state.user.id === props.user.id;
    });

    const deletePost = function (post_id) {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "DELETE",
        headers: {
          "Authorization": "Bearer " + store.state.user.access,
        },
        data: {
          post_id,
        },
        success(resp) {
          if (resp.result === "success") {
            context.emit("deletePost", post_id);
          }
        }
      })
    }

    return {
      is_me,
      deletePost,

    }
  }
}
</script>

<style scoped>
.single-post {
  margin-top: 10px;
}
.del_btn {
  float: right;

}
</style>