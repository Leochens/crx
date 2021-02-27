document.addEventListener('DOMContentLoaded', function () {
  console.log('我被执行了！');
});


function getBody () {
  console.log(document)
  const editor = document.getElementById('ueditor_0');
  const body = editor.contentWindow.document.getElementsByTagName('body')[0];
  return body;
}
var tipCount = 0;
function alertMsg (msg, type) {
  msg = msg || '';
  var ele = document.createElement('div');
  ele.className = 'chrome-plugin-simple-tip slideInLeft';
  if (type === 'success') {
    ele.className = 'chrome-plugin-simple-tip success slideInLeft';
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
// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
  switch (request.cmd) {
    case 'get_audio_upload': {
      const body = getBody();
      // 获取到的音频节点信息
      const audios = body.getElementsByClassName("js_editor_audio")
      console.log(audios);
      if (!audios.length) return alertMsg('未发现用户上传音乐')


      const _audios = [];
      for (let i = 0; i < audios.length; i++) {
        const item = audios[i]

        if (!item) return alertMsg("未发现用户上传音乐!");
        const code = item.getAttribute('voice_encode_fileid');
        const name = item.getAttribute('name');
        console.log(name, code);
        _audios.push({ name, code });
      }
      console.log(_audios);
      sendResponse(JSON.stringify(_audios));
      break;
    }
    case 'get_audio_qqmusic': {
      const body = getBody();
      // 获取到的音频节点信息
      const audios = body.getElementsByClassName("wx-edui-media-wrp")
      console.log(audios);
      if (!audios.length) return alertMsg("未发现QQ音乐!");

      const _audios = [];
      for (let i = 0; i < audios.length; i++) {
        const item = audios[i]
        const code = item.getElementsByClassName('js_editor_qqmusic')[0];
        if (!code) return alertMsg("未发现QQ音乐!");
        const name = code.getAttribute('music_name');
        _audios.push({ name, code: item.innerHTML });
      }
      console.log(_audios);
      sendResponse(JSON.stringify(_audios));
      break;
    }
    case 'get_video_upload': {
      const body = getBody();

      const videoFrames = body.getElementsByClassName("video_iframe");
      if (!videoFrames.length) return alertMsg("未发现用户上传视频!");

      const _videos = [];
      for (let i = 0; i < videoFrames.length; i++) {
        const item = videoFrames[i];
        if (!item) return alertMsg("未发现用户上传视频!");
        const code = item.getAttribute('data-mpvid');
        const cover = item.getAttribute('data-cover');
        _videos.push({ cover, code });
      }
      console.log(_videos);
      sendResponse(JSON.stringify(_videos));
      break;
    }
    case 'get_mimi_id': {
      const body = getBody();
      // 获取到的音频节点信息
      const minis = body.getElementsByClassName("weapp_text_link");
      if (!minis.length) return alertMsg("未发现文字小程序!");

      console.log(minis);
      const _minis = [];
      for (let i = 0; i < minis.length; i++) {
        const item = minis[i];
        console.log(item);
        if (!item) return alertMsg("未发现文字小程序!");
        const appid = item.getAttribute('data-miniprogram-appid');
        const path = item.getAttribute('data-miniprogram-path');
        const name = item.getAttribute("data-miniprogram-nickname");
        _minis.push({ appid, path, name });
      }
      console.log(_minis);
      sendResponse(JSON.stringify(_minis));
      break;
    }

    case 'import_code': {
      const body = getBody();
      // 获取到的音频节点信息
      const code = request.code;
      console.log(code);

      body.innerHTML = code;

      sendResponse(true);
      alertMsg("操作成功!", 'success');
      break;
    }

    default:
      {
        // tip(JSON.stringify(request));
        sendResponse('我收到你的消息了：' + JSON.stringify(request));
      }
  }

});

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground (message) {
  chrome.runtime.sendMessage({ greeting: message || '你好，我是content-script呀，我主动发消息给后台！' }, function (response) {
    tip('收到来自后台的回复：' + response);
  });
}
