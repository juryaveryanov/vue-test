<template>
  <TheHeader />
  <TheMain>
    <router-view></router-view>
  </TheMain>
  <TheFooter />
  <AppDialog :active="error ? true : false" @closeDialog="setError('')">
    {{ error }}
    <template v-slot:buttons>
      <div style="text-align: center">
        <AppButton @click="setError('')" v-focus> Ok </AppButton>
      </div>
    </template>
  </AppDialog>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import AppDialog from '@/components/UI/AppDialog'
import AppButton from '@/components/UI/AppButton'
import TheHeader from '@/components/TheHeader'
import TheMain from '@/components/TheMain'
import TheFooter from '@/components/TheFooter'

export default {
  name: 'App',
  components: {
    AppDialog,
    AppButton,
    TheHeader,
    TheMain,
    TheFooter
  },
  methods: {
    ...mapMutations({
      setError: 'setError'
    })
  },
  computed: {
    ...mapState({
      error: (state) => state.error,
      documentTitle: (state) => state.documentTitle
    })
  },
  watch: {
    documentTitle (title) {
      document.title = title
    }
  }
}
</script>

<style lang="scss">
html,
body {
  background-color: $background-body-color;
  color: $text-color;
  font-family: $main-font;
  line-height: $line-height-body-font;
  margin: 0;
  min-height: 100vh;
  overflow-x: hidden;
  padding: 0;
  width: 100%;
  font-size: 4.375vw;

  @media (min-width: $xs) {
    font-size: 16px;
  }
  @media (min-width: $sm) {
    font-size: 18px;
  }
  @media (min-width: $md) {
    font-size: 18px;
  }
  @media (min-width: $lg) {
    font-size: 16px;
  }
  @media (min-width: $xl) {
    font-size: 18px;
  }
}

* {
  box-sizing: border-box;
}

#app {
  min-height: 100vh;
  padding: 0;
}
</style>
