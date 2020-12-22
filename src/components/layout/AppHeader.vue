<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        color="secondary"
    >
      <v-list
          nav
          dense
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="font-weight-bold white--text">Menu</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
        <v-list-item-group v-model="group">
          <v-list-item
              v-for="link in links"
              :key="link.text"
              link
          >
            <v-list-item-icon>
              <v-icon color="white">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
        app
        flat
        hide-on-scroll
        class="d-sm-none"
    >
      <div class="d-flex justify-center align-center">
        <v-app-bar-nav-icon
            class="ma-2"
            @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-btn text>
          <v-img
              class="header__logo--xs"
              :src="logoSrc"
              alt="ListMaker"
          />
          <span class="header__title header__title--xs">ListMaker</span>
        </v-btn>
      </div>
    </v-app-bar>

    <v-app-bar
        app
        flat
        class="hidden-xs-only"
    >
      <v-container
          class="pa-0"
          fluid
      >
        <v-row align="center">
          <v-col cols="6">
            <v-btn
                text
                class="ma-6"
            >
              <v-img
                  class="header__logo--sm"
                  :src="logoSrc"
                  alt="ListMaker"
              />
              <span class="header__title header__title--sm">ListMaker</span>
            </v-btn>
          </v-col>
          <v-col
              cols="6"
              class="text-right"
          >
            <v-btn
                v-for="link in links"
                :key="link.text"
                icon
                color="primary"
            >
              <v-icon>{{ link.icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: "AppHeader",

  data: () => ({
    drawer: false,
    group: null,
    logoSrc: require('../../assets/logo.png'),
    links: [
      { text: 'Home', icon: 'mdi-home-outline' },
      { text: 'Docs', icon: 'mdi-file-document-multiple-outline' },
      { text: 'Github', icon: 'mdi-github'},
    ]
  }),
  watch: {
    group () {
      this.drawer = false
    },
  }
}
</script>

<style scoped>
.header__logo--sm {
  max-height: 60px;
  max-width: 60px;
}

.header__logo--xs {
  max-height: 40px;
  max-width: 40px;
}

.header__title {
  font-family: ngc, monospace;
}

.header__title--sm {
  font-size: 26px;
}

.header__title--xs {
  font-size: 18px;
}

@font-face {
  font-family: ngc;
  src: url("../../assets/Ngc292HalftoneSemiItalic-L3A0W.ttf") format("opentype");
}
</style>
