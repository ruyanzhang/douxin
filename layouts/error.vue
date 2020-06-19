<template>
  <div class="error">
    <div v-if="error.statusCode === 404">
      <img src="/404.jpg" />
    </div>
    <div v-else>
      <img src="/500.jpg" />
    </div>
    <nuxt-link to="/">返回首页</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

<style scoped lang="less">
  .error {
    height: 90vh;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    img {
      width: 100%;
    }
    a {
      margin-top: 30px;
      text-align: center;
      font-size: 40px;
      color: @blue-color;
      &:visited {
        color: @visited-blue-color
      }
    }
  }
</style>
