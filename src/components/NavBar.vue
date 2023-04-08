<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useCurrentUser } from 'vuefire'

const router = useRouter()
const user = useCurrentUser()

const onLogoutClick = () => {
  console.log('onLogoutClick')
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
  <div class="navbar px-3" :class="[user ? 'justify-between' : 'justify-center']">
    <div class="space-x-2" v-if="user">
      <RouterLink class="menu-item" to="/"> Home </RouterLink>
      <RouterLink class="menu-item" to="/app"> App </RouterLink>
    </div>

    <RouterLink
      class="btn btn-ghost normal-case font-bold hover:bg-transparent text-4xl px-0 text-zinc-600"
      to="/"
    >
      TaskDo
    </RouterLink>

    <div class="dropdown dropdown-end" v-if="user">
      <div class="flex items-center gap-x-2">
        <div class="flex flex-col">
          <span class="text-sm">Hi, {{ user?.email }}</span>
          <span class="text-xs text-red-400 font-medium">4 tasks pending</span>
        </div>
        <label class="btn btn-ghost btn-circle avatar" tabindex="0">
          <div class="w-10 rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </label>
      </div>
      <ul
        tabindex="0"
        class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li @click="onLogoutClick">
          <span class="logout-btn"> Logout </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.logout-btn {
  @apply active:bg-neutral-200 focus:active:bg-neutral-200 active:text-neutral-900 focus:active:text-neutral-900;
}
.menu-item {
  @apply btn btn-ghost normal-case text-xl px-0 hover:bg-transparent hover:text-neutral-400 text-neutral-500;
}

.router-link-active {
  @apply text-neutral-900;
}
</style>
