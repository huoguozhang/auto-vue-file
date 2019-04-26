// generateComponent.js`
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const defaultTemplate = require('./template')
const resolve = (project, ...file) => path.resolve(project, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const generateFile = (path, data) => {
  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}
// 默认路径
const defaultPath = './src/components'
// 创建组件
function createComp (targetPath = defaultPath) {
  let vueTemplate, entryTemplate
  log('请输入要生成的组件名称') // 、如需生成全局组件，请加 global/ 前缀
  let componentName = ''
  const userProjectDirectory = process.cwd()
  let userTemplate = resolve(userProjectDirectory, 'auto-vue-file.template.js')
  // 判断用户自己是否有配置文件
  fs.exists(userTemplate, function(exists) {
    if (exists) {
       let userTemplateObj = require(userTemplate)
       if (userTemplateObj.vueTemplate && userTemplateObj.entryTemplate) {
         vueTemplate = userTemplateObj.vueTemplate
         entryTemplate = userTemplateObj.entryTemplate
       } else {
         errorLog('配置文件应该含有vueTemplate和entryTemplate属性')
         process.exit()
       }
    } else {
      vueTemplate = defaultTemplate.vueTemplate
      entryTemplate = defaultTemplate.entryTemplate
    }
  })
  process.stdin.on('data', async chunk => {
    const inputName = String(chunk).trim().toString()
    /**
     * 组件目录路径
     */
    const componentDirectory = resolve(userProjectDirectory, targetPath, inputName)
    const hasComponentDirectory = fs.existsSync(componentDirectory)
    if (hasComponentDirectory) {
      errorLog(`${inputName}组件目录已存在，请重新输入`)
      return
    } else {
      log(`正在生成目录 ${componentDirectory}`)
      await dotExistDirectoryCreate(componentDirectory)
      // fs.mkdirSync(componentDirectory);
    }
    try {
      if (inputName.includes('/')) {
        const inputArr = inputName.split('/')
        componentName = inputArr[inputArr.length - 1]
      } else {
        componentName = inputName
      }
      /**
       * vue组件路径
       */
      const componentVueName = resolve(componentDirectory, `${componentName}.vue`)
      /**
       * 入口文件路径
       */
      const entryComponentName = resolve(componentDirectory, 'index.js')
      log(`正在生成 vue 文件 ${componentVueName}`)
      await generateFile(componentVueName, vueTemplate(componentName))
      log(`正在生成 component 入口文件 ${entryComponentName}`)
      await generateFile(entryComponentName, entryTemplate(componentName))
      successLog('生成成功')
    } catch (e) {
      errorLog(e.message)
    }

    process.stdin.emit('end')
  })
  process.stdin.on('end', () => {
    log('exit')
    process.exit()
  })
}
function dotExistDirectoryCreate (directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs (directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}
module.exports = { createComp }
