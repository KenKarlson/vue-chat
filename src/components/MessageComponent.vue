<template>
  <div class="message">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'MessageComponent',
  props: {
    message: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.message {
  margin-bottom: 5px;
}
</style>