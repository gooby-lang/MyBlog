<template>
  <ContentBase>
    <div class="row">
      <div class="col-4">
        <UserProfileInfo/>
      </div>
      <div class="col-9">
      </div>
    </div>
  </ContentBase>
</template>

<script>
import ContentBase from "@/components/ContentBase";
import UserProfileInfo from "@/components/UserProfileInfo";

export default {
  name: "UserProfileView",
  components: {
    ContentBase,
    UserProfileInfo,
  },
}
</script>

<style scoped>

</style>