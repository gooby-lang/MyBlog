<template>
  <div class="card edit-field">
    <div class="card-body">
      <div class="mb-3">
        <label for="edit-post" class="form-label">编辑区</label>
        <textarea v-model="content" class="form-control" id="edit-post" rows="3"></textarea>
        <button @click="submitPost" type="button" class="btn btn-secondary post-button">发布</button>
      </div>
    </div>
  </div>
</template>

<script>
import {ref} from "vue";
import {useStore} from "vuex";
import $ from 'jquery';

export default {
  name: "UserProfileWrite",
  setup(props, context) {
    let content = ref("");
    const store = useStore();
    const submitPost = function () {
      $.ajax({
        url: "https://app165.acapp.acwing.com.cn/myspace/post/",
        type: "POST",
        data: {
          content: content.value,
        },
        headers: {
          'Authorization': "Bearer " + store.state.user.access,
        },
        success(resp) {
          if(resp.result === "success") {
            context.emit('submitPost', content.value);
            content.value = "";
          }
        }
      })
    }

    return {
      content,
      submitPost,

    }
  }
}
</script>

<style scoped>
.edit-field {
  margin-top: 10px;
}
.post-button {
  margin-top: 10px;
}
</style>