﻿console.log('zhl test');

function init() {
  const content = $('#content');
  const current = $('#current');
  content.empty();
  current.empty();
}
//test
$('#get_audio_upload').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_audio_upload'
  }, function (response) {
    console.log('1111', response);
    const audios = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取音频(用户上传):</div>

        `))
    for (let i in audios) {
      const audio = audios[i];
      const item = $(`<div>
            <div>名称:<span style="color:orangered">${audio.name}</span> | 请复制完整下方代码↓</div>
            ID:<input style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px" value="${audio.code}" /> 
            代码:<textarea rows="6" style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px" > ${audio.html}</textarea>
            </div>`)
      content.append(item)
    }
  });
});

function alertMsg(msg, type) {
  msg = msg || '';
  var ele = document.createElement('div');
  ele.className = 'chrome-plugin-simple-tip slideInLeft';
  if (type === 'success') {
    ele.className = 'chrome-plugin-simple-tip success slideInLeft';
  } else {
    ele.className = 'chrome-plugin-simple-tip error slideInLeft';
  }
  ele.style.top = tipCount * 70 + 20 + 'px';
  ele.innerHTML = `<div>${msg}</div>`;
  document.body.appendChild(ele);
  ele.classList.add('animated');
  tipCount++;
  setTimeout(() => {
    ele.style.top = '-100px';
    setTimeout(() => {
      ele.remove();
      tipCount--;
    }, 400);
  }, 3000);
}

// $('#aaaa').click(e => {
//     console.log(document);

// });



$('#get_audio_qqmusic').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_audio_qqmusic'
  }, function (response) {
    console.log(response);
    const audios = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取音频(QQ音乐):</div>
        `))

    for (let i in audios) {
      const audio = audios[i];
      const item = $(`<div>
            <div>名称:<span style="color:orangered">${audio.name}</span> | 请复制完整下方代码↓</div>
            ID:<input style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px" value="${audio.code}" /> 
            代码:<textarea style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px;height:40px;">${audio.html}</textarea>
            </div>`)
      content.append(item)
    }

  });
});
$('#get_open_account_id').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_open_account_id'
  }, function (response) {
    console.log(response);
    const acc = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取公众号(公众号id):</div>

        `))

    for (let i in acc) {
      const ac = acc[i];
      const item = $(`<div>
            <div>名称:<span style="color:orangered">${ac.name}</span> | 请复制完整下方代码↓</div>

            <input style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px;" value="${ac.code}">

            </div>`)
      content.append(item)
    }

  });
});

$('#get_open_account_code').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_open_account_code'
  }, function (response) {
    console.log(response);
    const acc = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取公众号(公众号代码):</div>

        `))

    for (let i in acc) {
      const ac = acc[i];
      const item = $(`<div>
            <div>名称:<span style="color:orangered">${ac.name}</span> | 请复制完整下方代码↓</div>

            <textarea rows="6" style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px;">${ac.code}</textarea>

            </div>`)
      content.append(item)
    }

  });
});

$('#get_video_account').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_video_account'
  }, function (response) {
    console.log(response);
    const acc = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取视频号(公众号代码):</div>

        `))

    for (let i in acc) {
      const ac = acc[i];
      const item = $(`<div>
            <div>名称:<span style="color:orangered">${ac.name}</span> | 请复制完整下方代码↓</div>
            <textarea style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px;height:40px;">${ac.code}</textarea>
            </div>`)
      content.append(item)
    }

  });
});




$('#get_video_upload').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_video_upload'
  }, function (response) {
    console.log(response);
    const videos = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取视频(用户上传):</div>
        `))
    for (let i in videos) {
      const video = videos[i];
      const c = parseInt(i + 1);
      const item = $(`<div>
            <div>编号:${c},请复制完整下方代码↓</div>
            <input style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px;" value="${video.code}">
            </div>`)
      content.append(item)
    }

  });
});

$('#get_video_tx').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_video_tx'
  }, function (response) {
    console.log(response);
    const videos = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取视频(腾讯视频):</div>
        `))
    for (let i in videos) {
      const video = videos[i];
      const c = parseInt(i) + 1;
      const item = $(`<div>
            <div>编号:${c},请复制完整下方代码↓</div>
            <input style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px;" value="${video.code}">
            </div>`)
      content.append(item)
    }

  });
});



$('#get_mimi_id').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_mimi_id'
  }, function (response) {
    console.log(response);
    const minis = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取小程序(文字形式):</div>
        `))

    for (let i in minis) {
      const mini = minis[i];


      const item = $(`<div>
            <div>名称:<span style="color:orangered">${mini.name}</span> | 请复制完整下方代码↓</div>
            appid:
            <input style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px" value="${mini.appid}" /> 
            path:<input style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px" value="${mini.path}" /> 
            </div>`)
      content.append(item)

    }
  });
});

$('#get_mimi_card').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_mimi_card'
  }, function (response) {
    console.log(response);
    const minis = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取小程序(卡片形式):</div>
        `))

    for (let i in minis) {
      const mini = minis[i];


      const item = $(`<div>
            <div>名称:<span style="color:orangered">${mini.name}</span> | 请复制完整下方代码↓</div>
            代码:<textarea rows="6" style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px"  >${mini.code}</textarea> 
            </div>`)
      content.append(item)

    }
  });
});

$('#get_location').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_location'
  }, function (response) {
    console.log(response);
    const items = JSON.parse(response);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取地理位置(文字形式):</div>
        `))

    for (let i in items) {
      const location = items[i];
      const item = $(`<div>
            <div>名称:<span style="color:orangered">${ location.name}</span> | 请复制完整下方代码↓</div>
            代码:<textarea rows="6" style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px"  >${location.code}</textarea> 
            </div>`)
      content.append(item)

    }
  });
});
$('#get_red_packet').click(e => {
  console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  sendMessageToContentScript({
    cmd: 'get_red_packet'
  }, function (response) {
    const items = JSON.parse(response);
    console.log('提取红包结果', items);
    $('#import_code_block').css("display", 'none');
    const content = $('#content');
    const current = $('#current');
    init();
    current.append($(`
            <div>提取红包封面代码:</div>
        `))

    for (let i in items) {
      const red_packet = items[i];
      const item = $(`<div>
            <div>序号:<span style="color:orangered">${ red_packet.name}</span> | 请复制完整下方代码↓</div>
            代码:<textarea rows="6" style="margin-top:4px;display:inline-block;width:235px;outline:none;font-size:10px"  >${red_packet.code}</textarea> 
            </div>`)
      content.append(item)

    }
  });
});



$('#show_code_textarea').click(e => {
  const content = $('#content');
  init();

  $('#import_code_block').css("display", 'block');
})



// 尾部导入
$('#import_code_append').click(e => {
  // console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  const value = $('#import_code_area').val();
  console.log(value);
  const content = $('#content');
  content.empty();
  // if (!value) return alert("请输入代码！");
  sendMessageToContentScript({
    cmd: 'import_code_append',
    code: value
  }, function (response) {});
});
// 局部导入
$('#import_code_insert').click(e => {
  // console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  const value = $('#import_code_area').val();
  console.log(value);
  const content = $('#content');
  content.empty();
  // if (!value) return alert("请输入代码！");
  sendMessageToContentScript({
    cmd: 'import_code_insert',
    code: value
  }, function (response) {});
});


$('#import_code').click(e => {
  // console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  const value = $('#import_code_area').val();
  console.log(value);
  const content = $('#content');
  content.empty();
  // if (!value) return alert("请输入代码！");
  sendMessageToContentScript({
    cmd: 'import_code',
    code: value
  }, function (response) {});
});
$('#clear_code').click(e => {
  // console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  init();

  const value = '';
  sendMessageToContentScript({
    cmd: 'import_code',
    code: value
  }, function (response) {
    // $('import_code_block').css("display", 'none');
    // alert("清空成功")
  });
});
$('#append_code').click(e => {
  // console.log(document);
  // 要给content-srcipt 发送消息获得当前页面的dom
  const content = $('#content');
  init();

  $('#import_code_block').css("display", 'block');
  const value = '';
  sendMessageToContentScript({
    cmd: 'append_code',
    code: value
  }, function (response) {
    // $('import_code_block').css("display", 'none');
    // alert("清空成功")
  });
});

// $('#update_font_size').click(() => {
//     sendMessageToContentScript({ cmd: 'update_font_size', size: 42 }, function (response) { });
// });

// 获取当前选项卡ID
function getCurrentTabId(callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    if (callback) callback(tabs.length ? tabs[0].id : null);
  });
}

// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
  getCurrentTabId((tabId) => {
    chrome.tabs.sendMessage(tabId, message, function (response) {
      if (callback) callback(response);
    });
  });
}


$('#get_img_btn').click(e => {

  chrome.tabs.getSelected(null, function (tab) { // 先获取当前页面的tabID
    // alert(tab.url);
    if (tab.url.startsWith("https://mp.weixin.qq.com/s/")) {
      const str = tab.url.split("https://mp.weixin.qq.com/s/")[1];
      var bg = chrome.extension.getBackgroundPage();
      if (bg) {

        bg.toGetImgPage(str);
      }
    } else {
      alert("请在微信推文页面使用！");
    }
  });
});

// 模拟主分支bug修复


// test新功能开发