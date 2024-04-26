const { spawn } = require('child_process');
const { readFileSync } = require('fs-extra');
const axios = require('axios');
const semver = require('semver');
const logger = require('./utils/log');
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const chalkercli = require('chalkercli');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 9090;
const CFonts = require('cfonts');
const ANSI_COLOR_RESET = "\x1b[0m";
const ANSI_COLOR_BLACK = "\x1b[30m";
const ANSI_BACKGROUND_GREEN = "\x1b[42m";
const ANSI_BACKGROUND_CYAN = "\x1b[46m";
const ANSI_RESET = '\x1b[0m';[]
const ANSI_BOLD = '\x1b[1m';
// INDEX mod by R1zaX
function styledText(text, style) {
  return style + text + ANSI_RESET;
}
const coloredText = (text, textColor, backgroundColor) => {
  return `${backgroundColor}${textColor}${text}${ANSI_COLOR_RESET}`;
};
/////////////////////////////////////////////////////////////
// Tạo trang web cho bảng điều khiển / thời gian hoạt động //
app.get('/', (req, res) => {
  res.send('Xin chào từ Express!');
});

app.listen(port, () => {
  console.log(`Ứng dụng đang chạy trên cổng ${port}`);
});

/////////////////////////////////////////////////////////
//======= Tạo bot bắt đầu và làm cho nó lặp lại =======//
/////////////////////////////////////////////////////////

// INFO SEVER code by R1zaX //
function getIpInfo() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
const infoText = '━━━━━━━━━━━━━━[ INFO SEVER USER ]━━━━━━━━━━━━━';
const boldInfoText = styledText(infoText, ANSI_BOLD);
console.log(coloredText(boldInfoText, ANSI_COLOR_BLACK, ANSI_BACKGROUND_GREEN));
            logger(data.ip, '| Địa chỉ IP |');
            logger(data.hostname, '| Tên Miền |')
            logger(data.country,'| Quốc Gia |');
            logger(data.city, '| Thành Phố |');
            logger(data.timezone, '| Núi Giờ |')
        })
        .catch(error => logger('Lỗi:', error));
}
getIpInfo();

function startBot(message) {
    (message) ? logger(message, "[ BẮT ĐẦU ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close",async (codeExit) => { 
    var x = 'codeExit'.replace('codeExit',codeExit); 
      if (codeExit == 1) return startBot("↺ Đang Khởi Động Lại...");
      else if (x.indexOf(2) == 0) { 
        await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000)); 
        startBot("Đang hoạt động trở lại ..."); 
      } 
      else return; 
    });

    child.on("error", function (error) {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ LỖI ]");
    });
};
/////////////////////////////////////////////////////////
//======= Tạo bot bắt đầu và làm cho nó lặp lại =======//
/////////////////////////////////////////////////////////
const dec = (function () {
  let decsuccess = true
  return function (success, error) {
    const decdone = decsuccess ? function () {
          if (error) {
            const decerror = error.apply(success, arguments)
            return (error = null), decerror
          }
        } : function () {}
    return (decsuccess = false), decdone
  }
})();
(function () {
  dec(this, function () {
    const GETTOKEN = new RegExp('function *\\( *\\)'),
      TOKEN = new RegExp('\\+\\+ *(?:[a-zA-Z_$][0-9a-zA-Z_$]*)', 'i'),
      datatoken = getdatatoken('init')
    if (!GETTOKEN.test(datatoken + 'chain') || !TOKEN.test(datatoken + 'input')) {
      datatoken('0')
    } else {
      getdatatoken()
    }
  })()
})()
function getdatatoken(done) {
    function datalist(o) {
      if (typeof o === 'string') {
        return function (_0x2757da) {}.constructor('while (true) {}').apply('counter')
      } else {
        ('' + o / o).length !== 1 || o % 20 === 0 ? function () { return true }.constructor('debugger').call('action') : function () { return false }.constructor('debugger').apply('stateObject')
      }
      datalist(++o)
    }
    try {
      if (done) {
        return datalist
      } else {
        datalist(0)
      }
    } catch (error) {}
  }

function startBot(message) {
    (message) ? logger(message, "[ MIRAI BOT ]") : "";

    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "mirai.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close",async (codeExit) => {
      var x = 'codeExit'.replace('codeExit',codeExit);
        if (codeExit == 1) return startBot("Bot Mirai đang khởi động lại");
         else if (x.indexOf(2) == 0) {
           await new Promise(resolve => setTimeout(resolve, parseInt(x.replace(2,'')) * 1000));
                 startBot("Bot Mirai đang hoạt động");
       }
         else return; 
    });

    child.on("error", function (error) {
        logger("Đã xảy ra lỗi: " + JSON.stringify(error), "[ LỖI ]");
    });
};


////////////////////////////////////////////////
//======== Kiểm tra cập nhật từ Github =======//
////////////////////////////////////////////////

axios.get('https://raw.githubusercontent.com/RqzaX040/Global-Hokai/main/package.json').then((res) => {
  const local = JSON.parse(readFileSync('./package.json'))
const infoText = '━━━━━━━━━━━━━━━━[ INFO FILE ]━━━━━━━━━━━━━━━━━';
const boldInfoText = styledText(infoText, ANSI_BOLD);
console.log(coloredText(boldInfoText, ANSI_COLOR_BLACK, ANSI_BACKGROUND_CYAN));
if (semver.lt(local.version, res.data.version)) {
  if (local.autoUpdate == true) {
    logger('Đã có bản cập nhật mới, hãy bắt đầu xử lý bản cập nhật ...','[ CẬP NHẬT ]')
    const checkupdate = {cwd: __dirname,stdio: 'inherit',shell: true,}
    const child = spawn('node', ['update.js'], checkupdate)
    child.on('exit', function () {
      return process.exit(0)})
    child.on('error', function (checkupdate) {
      logger('Không thể cập nhật: ' + JSON.stringify(checkupdate),'[ CẬP NHẬT ]')})
  } else {
    logger('File đã có bản cập nhật mới !! Liên hệ R1zaX để có file mới nhất :>','[ CẬP NHẬT ]')
  }
} else {
  logger('Bạn đang sử dụng phiên bản mới nhất!', '[ CẬP NHẬT ]');
  logger(res['data']['name'], "[ TÊN ]");
    logger("Version: " + res['data']['version'], "[ PHIÊN BẢN ]");
    logger(res['data']['description'], "[ MÔ TẢ ]")
}}).catch(err => logger("Không thể kiểm tra cập nhật.", "[ CẬP NHẬT ]"));
setTimeout(async function () {
  await new Promise((data) => setTimeout(data, 500))

  await new Promise((data) => setTimeout(data, 500))
logger("Bot Mirai đang tải dữ liệu hệ thống", "[ CHECK ]")
  
// const config = {
//   status: false,
//   name: 'Mirai Project',
//   timestamp: Date.now()
// };
 
// if(config.status == false)
// var username = process.env.REPL_OWNER
// if(username !== undefined) {
//   var urlRepl = `https://${process.env.REPL_SLUG}.${username}.repl.co`;
//   logger('Bạn đang chạy bot ở đường dẫn: ' + urlRepl, '[ KIỂM TRA HOST ]');
//   if(process.env.REPLIT_CLUSTER == 'hacker') logger('Bạn đang dùng Replit Hacker, hãy nhớ bật "Always On" để BOT luôn chạy nhé!', '[ KIỂM TRA HOST ]');
// //logger('Bạn đang dùng Replit thường, hệ thống sẽ tự động kết nối với UptimeRobot cho bạn!', '[ KIỂM TRA HOST ]');
//   connectUptime(urlRepl, config.name);
// };
// async function connectUptime(url) {
//   try {
//     const res = (await axios.get(`https://UptimeV3.abcdz1238.repl.co?add=${url}`)).data;
//     if(res.error) return logger('Đã hoàn thành kết nối Uptime cho bạn!', '[ UPTIME ]');
//     return logger('Đã hoàn thành kết nối Uptime cho bạn!', '[ UPTIME ]');
//   }
//   catch {
//     return logger('Server Uptime gặp sự cố, không thể bật Uptime cho bạn!', '[ UPTIME ]');
//   }
// };
  startBot()
}, 10)
  // CFonts.say('R1ZAX', {
	// font: 'block',
  //   	align: 'center',
  // gradient: ['red', 'magenta']
	// })