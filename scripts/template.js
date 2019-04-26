// template.js you can generate
module.exports = {
  vueTemplate: componentName => {
    return `<template>
  <div class="${componentName}-comp-ct">
    ${componentName}组件
  </div>
</template>
<script>
export default {
  name: '${componentName}'
}
</script>
<style lang="scss" scoped>
.${componentName}-comp-ct {

}
</style>
`
  },
 entryTemplate:  componentName => {
    return `import ${componentName} from './${componentName}.vue'
export default ${componentName}`}
}
