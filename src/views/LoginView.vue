<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { notify } from 'notiwind'

import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useCurrentUser } from 'vuefire'

import { AppPage, AppText } from '@/components/ui'
import { AppBtn, AppLinkBtn } from '@/components/ui'

const userCreds = reactive({
  email: 'awais@task.do',
  password: '123456'
})

const user = useCurrentUser()
const error = ref<string | null>(null)
const loading = ref<boolean>(false)

const auth = getAuth()
const router = useRouter()

const handleLogin = () => {
  loading.value = true
  signInWithEmailAndPassword(auth, userCreds.email, userCreds.password)
    .then(() => {
      // Signed in
      loading.value = false

      notify(
        {
          group: 'success',
          title: 'Success',
          text: 'You have successfully logged in'
        },
        2000
      )

      setTimeout(() => {
        router.push('/app')
      }, 2000)
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      error.value = `Error: ${errorCode} - ${errorMessage}`
      loading.value = false

      notify(
        {
          group: 'error',
          title: 'Error',
          text: `Error: ${errorCode} - ${errorMessage}`
        },
        4000
      )
    })
}

// const isRoot = computed(() => route.fullPath === '/')

const onLogoutClick = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      router.push('/')
    })
    .catch((error) => {
      // An error happened.
      // eslint-disable-next-line no-alert
      alert(error.message)
    })
}
</script>

<template>
  <AppPage>
    <template v-if="!user">
      <form class="login-form" @submit.prevent="handleLogin">
        <AppText tag="h1" color="zinc-600" size="4xl" weight="bold"> TaskDo </AppText>

        <div class="w-80">
          <AppText tag="p" color="zinc-600" size="base" align="center">
            Login to be able to create and manage your tasks
          </AppText>
        </div>

        <input
          type="email"
          placeholder="email"
          class="input w-full input-bordered"
          v-model="userCreds.email"
        />
        <input
          type="password"
          placeholder="password"
          class="input w-full input-bordered"
          v-model="userCreds.password"
        />
        <AppBtn
          v-if="!error && !user && !loading"
          type="submit"
          :disabled="!userCreds.email || !userCreds.password"
          btn-block
        >
          Login
        </AppBtn>

        <AppBtn btn-block v-else type="button" loading> Authenticating </AppBtn>
      </form>
    </template>
    <template v-else>
      <div class="flex flex-col justify-center gap-y-2">
        <AppText tag="h1" color="zinc-600" size="3xl" weight="bold" align="center">
          TaskDo
        </AppText>
        <AppText tag="p" color="zinc-600" size="base" align="center">
          You are already logged in
        </AppText>
        <div class="flex justify-between">
          <AppBtn alert text-case="normal-case" size="sm" @click="onLogoutClick"> Logout </AppBtn>
          <AppLinkBtn alert text-case="normal-case" size="sm" to="/app"> Back to app </AppLinkBtn>
        </div>
      </div>
    </template>
  </AppPage>
</template>

<style scoped lang="scss">
.login-form {
  @apply flex flex-col items-center card p-10 bg-base-100 gap-y-5 border-purple-200 border-solid border-4;
}
</style>
