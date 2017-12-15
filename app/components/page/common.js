let fs = require('fs')
let path = require('path')
let moment = require('moment')

let logPath = 'logs'
let historyPath = 'history'

// 1.扫描文件
const scanDir = function (files, filePath) {
  // 是文件
  if (fs.statSync(filePath).isFile()) {
    // 是 json文件
    if (path.extname(filePath).toLowerCase() === '.json') {
      var tmp = {}
      tmp.value = path.basename(filePath, '.json')
      tmp.path = filePath
      return files.push(tmp)
    }
  } else {
    try {
      fs.readdirSync(filePath).forEach(function (file) {
        scanDir(files, filePath + '/' + file)
      })
    } catch (e) {
      llog(filePath + '不是文件路径')
    }
  }
  return files
}

// 2.判断是否空对象
const isEmptyObject = function (e) {
  var t
  for (t in e) {
    console.log(t)
    return !1
  }
  return !0
}

// 3.输出返回结果到文件中
const llog = function (content) {
  var timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  content = '[' + timestamp + ']:' + content + '\n'
  // 先判断日志文件夹是否存在
  if (!fs.existsSync(logPath)) {
    // 创建文件夹
    fs.mkdirSync(logPath)
  }
  // 默认输出文件
  fs.appendFile(logPath + '/script_log.log', content, 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
  // 追加返回结果
}

/**
 * 4.保存请求的内容至文件，在历史页面展示
 * 以时间(YYYY-MM-DD)作为文件名，以时间戳作为文件名（Req-HHmmssSSS.json）
 * 可能多个页面都会用到，所以就现在公共方法内
 */
const saveHistory = function (content) {
  let today = moment().format('YYYY-MM-DD')
  // 如果历史文件根目录不存在则创建
  if (!fs.existsSync(historyPath)) {
    // 创建文件夹
    fs.mkdirSync(historyPath)
  }
  if (!fs.existsSync(historyPath + '/' + today)) {
    // 创建今天的文件夹
    fs.mkdirSync(historyPath + '/' + today)
  }
  // 获取文件名
  let fileName = historyPath + '/' + today + '/Req-' + moment().format('HHmmssSSS') + '.json'

  // 默认输出文件
  fs.appendFile(fileName, content, 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
}

/**
 * 5.获取历史记录下的文件夹名
 */
const listHistoryDays = function () {
  let result = []
  try {
    fs.readdirSync(historyPath).forEach(function (file) {
      if (!fs.statSync(historyPath + '/' + file).isFile()) {
        let tmp = {}
        tmp.value = file
        result.push(tmp)
      }
    })
  } catch (e) {
    llog(historyPath + '文件夹不存在或下面无文件夹')
  }
  return result
}

/**
 * 6.获取该文件夹下的文件
 * @param {String} folder
 */
const listHistoryReqs = function (folder) {
  let filePath = historyPath + '/' + folder
  let result = []
  try {
    fs.readdirSync(filePath).forEach(function (file) {
      if (fs.statSync(filePath + '/' + file).isFile()) {
        // 是 json文件
        if (path.extname(file).toLowerCase() === '.json') {
          let tmp = {}
          tmp.name = path.basename(file, '.json')
          let fileData = fs.readFileSync(filePath + '/' + file)
          tmp.content = JSON.parse(fileData)
          result.push(tmp)
        }
      }
    })
  } catch (e) {
    llog(filePath + '文件夹不存在或下面无文件夹')
  }
  return result
}

// 以对象的属性输出
exports.llog = llog
exports.isEmptyObject = isEmptyObject
exports.scanDir = scanDir
exports.saveHistory = saveHistory
exports.listHistoryDays = listHistoryDays
exports.listHistoryReqs = listHistoryReqs
