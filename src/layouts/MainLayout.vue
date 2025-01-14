<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-h6">
          patient management system
        </q-toolbar-title>


      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="leftDrawerOpen"
      v-model="leftDrawerOpen"
      show-if-above
      bordered

    >
      <q-list>
        <q-item-label
          header
          class="text-blue-8 custom-menu-font"
        >
          Menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'http://localhost:9001/#/'
  },
  {
    title: 'Patient Editor',
    caption: 'github.com/quasarframework',
    icon: 'search',
    link: '/#/patient-table'
  },
  {
    title: 'Search Patient',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: '/#/search-patient'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },

]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}


</script>

<style scoped>
.custom-menu-font {
  font-family: 'Montserrat', sans-serif; /* You can choose any font */
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}
</style>
