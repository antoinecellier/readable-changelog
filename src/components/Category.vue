<template>
  <a-form>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="Category Name"
    >
      <a-input
        v-decorator="[
          'name',
          {
            rules: [{ required: true, message: 'Please input category name' }]
          }
        ]"
        placeholder="Input category name"
      />
    </a-form-item>
    <a-form-item
      label="Pattern"
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-select mode="tags" placeholder="Input pattern" />
    </a-form-item>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
    >
      <a-button type="danger">
        <a-icon type="delete" />
      </a-button>
      <a-button type="dashed">
        Disable
      </a-button>
      <a-button type="primary" html-type="submit">
        Add
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 50 },
  wrapperCol: { span: 80 }
}

export default {
  data() {
    return {
      formItemLayout
    }
  }
}
</script>
