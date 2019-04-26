# auto-vue-file

auto create *.vue file by shell command
通过终端自动创建*vue文件

### 前言：

**1**: 我们在写`xxx.vue`页面文件的时候，一般都要写这些重复的代码：
```
<template>
  <div class="zlj-comp-ct">
    zlj组件
  </div>
</template>
<script>
export default {
  name: 'zlj'
}
</script>
<style lang="scss" scoped>
.zlj-comp-ct {

}
</style>

```
**2**:写组件的时候可能还要在`components`目录下面新建一个目录:xxx,里面是xxx.vue和index.js

比如myForm组件

![image.png](https://upload-images.jianshu.io/upload_images/6036420-1db0e2394090f73d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```
// myForm.vue
<template>
  <div class="myForm-comp-ct">
    myForm组件
  </div>
</template>
<script>
export default {
  name: 'myForm'
}
</script>
<style lang="scss" scoped>
.myForm-comp-ct {

}
</style>
// index.js
import myForm from './myForm.vue'
export default myForm

```

每次都写这些代码,是不是很烦？

#### 主角登场：auto-vue-file

#### 安装

```$xslt
npm install auto-vue-file -g
```

#### 使用

```
 auto-vue-file -c
```

#### 结果

![image.png](https://upload-images.jianshu.io/upload_images/6036420-cbc01e3f811b4210.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这样在components目录下面生成myForm文件

#### 参数说明：

名称 | 说明 | 使用例子 
---- | ---  | ---
component | 创建一个vue组件, 默认在components目录下面 | auto-vue-file -c 或 auto-vue-file --component
page |  创建一个vue组件，默认在views目录 | auto-vue-file -p 或 auto-vue-file --page
path |  在指定目录创建vue组件，需要提供-c或-p参数|  auto-vue-file -c --path ./src/haha 或  auto-vue-file -p --path ./src/haha

#### 更多：

你也可以使用自己的vue模版文件，文件名为auto-vue-file.template.js，存放在项目根目录下面，内容如下

```
// template.js you can generate
//  auto-vue-file.template.js
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

```

你也可以执行

```$xslt
auto-vue-file --init
```

自动生成该配置文件：auto-vue-file.template.js

然后改成你自己需要的样子。


