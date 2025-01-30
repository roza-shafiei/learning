<script>
import TheLogo from '@/components/global/TheLogo.vue'

export default {
  components: {
    TheLogo
  },
  computed: {
    footerLinks() {
      return [
        {
          label: 'Company',
          vertical: true,
          links: [
            {
              title: 'Home',
              icon: '',
              path: '/',
              isLocal: false
            },
            {
              title: 'Faq',
              icon: '',
              path: '/faq',
              isLocal: false
            },
            {
              title: 'About',
              icon: '',
              path: '/about',
              isLocal: false
            }
          ]
        },

        {
          label: 'Fake Links',
          vertical: true,
          links: [
            {
              title: 'Fake 1',
              path: '',
              isLocal: true
            },
            {
              title: 'Fake 2',
              path: '',
              isLocal: true
            }
          ]
        },

        {
          label: 'Stay in touch',
          vertical: true,
          links: [
            {
              title: 'Fake Link 3',
              icon: '',
              path: '',
              isLocal: true
            },
            {
              title: 'Fake Link 4',
              icon: '',
              path: '',
              isLocal: true
            }
          ]
        }
      ]
    },
    terms() {
      return [
        {
          title: 'Terms and conditions',
          path: ''
        },
        {
          title: 'Privacy Policy',
          path: ''
        },
        {
          title: 'Cookie Policy',
          path: ''
        },
        {
          title: 'Disclaimer',
          path: ''
        }
      ]
    }
  }
}
</script>

<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <div class="footer__middle max-content">
        <div
          class="logo__container"
        >
          <TheLogo text="EduPress" />
          <p>
            Vivamus tristique odio sit amet velit semper, eu posuere turpis interdum. Cras egestas
            purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="links">
          <div v-for="(nav, index) in footerLinks" :key="index" class="links__item">
            <p>
              {{ nav.label }}
            </p>
            <div :class="nav.vertical ? 'flex-col' : 'flex-row'" class="sub-link">
              <div v-for="(link, i) in nav.links" :key="i" class="mb-2">
                <!--Local Links-->
                <RouterLink v-if="link.isLocal" :to="link.path">
                  <i v-if="link.icon" :class="link.icon" class="text-lg me-1" />
                  <span
                    v-if="link.title"
                    class="text-lg font-light text-light-black-900 dark:text-dark-black-900"
                  >
                    {{ link.title }}
                  </span>
                </RouterLink>
                <!--External Links-->
                <a v-else :href="link.path">
                  <i v-if="link.icon" :class="link.icon" class="text-lg me-1" />

                  <span
                    v-if="link.title"
                    class="text-lg font-light text-light-black-900 dark:text-dark-black-900"
                  >
                    {{ link.title }}
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="divider" />
      <p class="copyright">Copyright © 2024 LearnPress LMS | Powered by ThimPress</p>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
.footer {
  margin-top: toRem(90);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__wrapper {
    background: var(--color-white-200);
    border-radius: toRem(8);
    padding: toRem(16);
    width: 100%;
    height: 100%;
    z-index: 0;
    @include mq(sm) {
      padding: toRem(32);
    }
  }

  &__middle {
    padding-bottom: toRem(32);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @include mq(sm) {
      flex-direction: row;
    }
  }

  .logo__container {
    display: flex;
    flex-direction: row;
    align-items: start;
    gap: toRem(8);
    margin-bottom: toRem(24);
    max-width: 100%;

    @include mq(sm) {
      flex-direction: column;
      margin-bottom: 0;
      max-width: 24%;
    }

    p {
      font-size: toRem(14);
      color: var(--color-black-300);
    }
  }

  .links {
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    color: var(--color-black-300);
    align-items: start;

    @include mq(sm) {
      flex-direction: row;
      margin-bottom: 0;
      max-width: 70%;
    }

    &__item {
      display: flex;
      flex-direction: column;

      p {
        font-weight: bold;
        margin-bottom: toRem(16);
        margin-top: toRem(24);
        color: var(--color-black-400);
        @include mq(sm) {
          margin-top: 0;
        }
      }
    }

    .sub-link {
      display: flex;
    }
  }

  .copyright {
    text-align: center;
    font-size: toRem(12);
    margin-top: toRem(10);
  }
}

.flex-col {
  flex-direction: column;
}

.flex-row {
  flex-direction: row;
}

.divider {
  content: '';
  width: 100%;
  height: 1px;
  background: var(--color-white-400);
}

</style>
