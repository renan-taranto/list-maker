<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
        absolute
        temporary
        class="navigation-menu"
    >
      <v-list
          nav
          dense
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn
                  color="white"
                  depressed
                  :ripple="false"
                  class="header__btn"
                  to="/"
              >
                <v-img
                    class="header__logo--xs"
                    :src="logoSrc"
                    alt="ListMaker"
                />
                <span class="header__title header__title--xs">ListMaker</span>
              </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider/>
        <v-list-item-group v-model="group">
          <v-list-item
              v-for="link in links"
              :key="link.text"
              :to="link.to"
              :href="link.href"
          >
            <v-list-item-icon>
              <v-icon color="primary">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="primary--text">{{ link.text }}</v-list-item-title>
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
      <v-app-bar-nav-icon
          class="ma-2"
          @click.stop="drawer = !drawer"
      />
      <v-btn
          depressed
          :ripple="false"
          class="header__btn pa-0"
          to="/"
      >
        <v-img
            class="header__logo--xs"
            :src="logoSrc"
            alt="ListMaker"
        />
        <span class="header__title header__title--xs">ListMaker</span>
      </v-btn>
      <template v-slot:extension>
        <slot name="subheader"></slot>
      </template>
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
                depressed
                :ripple="false"
                class="header__btn"
                to="/"
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
                :to="link.to"
                :href="link.href"
                icon
                color="primary"
            >
              <v-icon>{{ link.icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:extension>
        <slot name="subheader"></slot>
      </template>
    </v-app-bar>
  </div>
</template>

<script>

export default {
  name: 'AppHeader',

  data: () => ({
    drawer: false,
    group: null,
    logoSrc: require('../../assets/logo.png'),
    links: [
      { text: 'Home', icon: 'mdi-home-outline', to: '/', href: null },
      { text: 'Github', icon: 'mdi-github', to: null, href: 'https://github.com/renan-taranto/cqrs-event-sourcing-example' }
    ]
  }),
  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>

<style scoped>
.navigation-menu {
  will-change: initial; /* Fix for chrome blurry fonts: https://github.com/vuetifyjs/vuetify/issues/12890 */
}

.header__btn:before {
  display: none; /* Removes v-btn's box shadow on hover */
}

.header__logo--sm {
  max-height: 60px;
  max-width: 60px;
}

.header__logo--xs {
  max-height: 45px;
  max-width: 45px;
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
