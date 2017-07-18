<template>
  <el-form ref="form" :model="conf" label-width="80px">
    <el-form-item label="信息加密">
      <el-switch on-text="是" off-text="否" v-model="conf.isEncrypt"></el-switch>
    </el-form-item>
    <el-form-item label="信息密钥">
      <el-input type="textarea" v-model="conf.encryptKey" :rows="16"></el-input>
    </el-form-item>
    <el-form-item label="密码加密">
      <el-switch on-text="是" off-text="否" v-model="conf.isPwdEncrypt"></el-switch>
    </el-form-item>
    <el-form-item label="加密字段">
      <el-tag
        v-for="key in conf.keys"
        :key="key"
        :closable="false"
        type="primary"
        :close-transition="false"
      >
      {{key}}
      </el-tag>
    </el-form-item>
    <el-form-item label="密码密钥">
      <el-input type="textarea" v-model="conf.pwdEncryptKey" :rows="16"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        conf: {
          isEncrypt: this.getBooleanFromLocal('conf_isEncrypt', true),
          encryptKey: this.getFromLocal('conf_encryptKey', ''),
          isPwdEncrypt: this.getBooleanFromLocal('conf_isPwdEncrypt', true),
          keys: ['/user/encrypted_pay_pin'],
          pwdEncryptKey: this.getFromLocal('conf_pwdEncryptKey', '')
        },
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      onSubmit () {
        localStorage.setItem('conf_isEncrypt', this.conf.isEncrypt)
        localStorage.setItem('conf_encryptKey', this.conf.encryptKey)
        localStorage.setItem('conf_isPwdEncrypt', this.conf.isPwdEncrypt)
        localStorage.setItem('conf_pwdEncryptKey', this.conf.pwdEncryptKey)
        this.$message('保存设置成功!')
      },

      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      }
    }
  }
</script>
