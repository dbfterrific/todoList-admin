<template>
  <div class="dashboard-container">
    <div class="qr-cod">
      <vue-qr :logoSrc="imageUrl" text="xxx" :size="200"></vue-qr>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { qrCodeApi } from '@/api/order'
import vueQr from 'vue-qr'

export default {
  name: 'Dashboard',
  components: {
    vueQr
  },
  data() {
    return {
      imageUrl: '',
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.getQrcode()
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  },
  methods: {
    getQrcode() {
      let _time = null
      clearTimeout(_time)
      qrCodeApi().then(res => {
        this.imageUrl = res.data.url
      })
      _time = setTimeout(() => {
        this.getQrcode()
      }, 30000)
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
