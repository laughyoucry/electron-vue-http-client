var fs = require('fs')
var path = require('path')
var moment = require('moment')

// 1.扫描文件
var scanDir = function (files, filePath) {
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
var isEmptyObject = function (e) {
  var t
  for (t in e) {
    console.log(t)
    return !1
  }
  return !0
}

// 3.输出返回结果到文件中
var llog = function (content) {
  var timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
  content = '[' + timestamp + ']:' + content + '\n'
  // 默认输出文件
  fs.appendFile('logs/script_log.log', content, 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })
  // 追加返回结果
}

// 以对象的属性输出
exports.llog = llog
exports.isEmptyObject = isEmptyObject
exports.scanDir = scanDir
