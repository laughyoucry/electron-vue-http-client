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
    <el-form-item label="密码keys">
      <el-tag
        v-for="key in conf.keys"
        :key="key"
        :closable="true"
        type="primary"
        :close-transition="false"
        @close="handleClose(key)"
      >
      {{key}}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter.native="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新关键字</el-button>
    </el-form-item>
    <el-form-item label="密码密钥">
      <el-input type="textarea" v-model="conf.pwdEncryptKey" :rows="16"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        conf: {
          isEncrypt: true,
          encryptKey: '',
          isPwdEncrypt: true,
          keys: ['标签一', '标签二', '标签三'],
          pwdEncryptKey: ''
        },
        inputVisible: false,
        inputValue: ''
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      handleClose (tag) {
        this.conf.keys.splice(this.conf.keys.indexOf(tag), 1)
      },

      showInput () {
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },

      handleInputConfirm () {
        let inputValue = this.inputValue
        if (inputValue) {
          this.conf.keys.push(inputValue)
        }
        this.inputVisible = false
        this.inputValue = ''
      }
    }
  }
</script>
