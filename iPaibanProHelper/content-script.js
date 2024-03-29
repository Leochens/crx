﻿document.addEventListener('DOMContentLoaded', function () {
  console.log('我被执行了！');
});


function getBody() {
  console.log(document)
  const editor = document.getElementById('ueditor_0');
  const body = editor.contentWindow.document.getElementsByTagName('body')[0];
  return body;
}
var tipCount = 0;

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
// 接收来自后台的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log('收到来自 ' + (sender.tab ? "content-script(" + sender.tab.url + ")" : "popup或者background") + ' 的消息：', request);
  switch (request.cmd) {
    case 'get_img_btn': {
      sendResponse(false);
      return alertMsg("该页面不是微信推文页面，无法提取！");
      break;
    }
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
        const html = item.outerHTML;
        console.log(name, code);
        _audios.push({
          name,
          code,
          html
        });
      }
      console.log(_audios);
      sendResponse(JSON.stringify(_audios));
      break;
    }

    case 'get_audio_qqmusic': {
      const body = getBody();
      // 获取到的音频节点信息
      const audios = body.getElementsByClassName("js_editor_qqmusic qqmusic_iframe js_uneditable custom_select_card")
      console.log(audios);
      if (!audios.length) return alertMsg("未发现QQ音乐!");

      const _audios = [];
      for (let i = 0; i < audios.length; i++) {
        const item = audios[i]
        const code = item.getAttribute('mid');
        const name = item.getAttribute('music_name');
        const html = item.outerHTML;
        _audios.push({
          name,
          code,
          html
        });
      }
      console.log(_audios);
      sendResponse(JSON.stringify(_audios));
      break;
    }
    case 'get_open_account_id': {
      const body = getBody();
      const accs = body.getElementsByTagName("mpprofile")
      console.log(accs);
      if (!accs.length) return alertMsg("未发现公众号!");

      const _accs = [];
      for (let i = 0; i < accs.length; i++) {
        const item = accs[i]
        const code = item.getAttribute('data-id');
        if (!code) return alertMsg("未发现公众号!");
        const name = item.getAttribute('data-nickname');
        _accs.push({
          name,
          code
        });
      }
      console.log(_accs);
      sendResponse(JSON.stringify(_accs));
      break;
    }
    case 'get_open_account_code': {
      const body = getBody();
      // 获取到的音频节点信息
      const accs = body.getElementsByTagName("mpprofile")
      console.log(accs);
      if (!accs.length) return alertMsg("未发现公众号!");

      const _accs = [];
      for (let i = 0; i < accs.length; i++) {
        const item = accs[i]
        const code = item.outerHTML;
        if (!code) return alertMsg("未发现公众号!");
        const name = item.getAttribute('data-nickname');
        _accs.push({
          name,
          code
        });
      }
      console.log(_accs);
      sendResponse(JSON.stringify(_accs));
      break;
    }
    case 'get_video_account': {
      const body = getBody();
      // 获取到的音频节点信息
      const accs = body.getElementsByClassName("channels_iframe_wrp");
      console.log(accs);
      if (!accs.length) return alertMsg("未发现视频号!");

      const _accs = [];
      for (let i = 0; i < accs.length; i++) {
        const item = accs[i]
        const code = item.outerHTML;
        console.log(code);

        if (!code) return alertMsg("未发现视频号!");
        const name = item.children[0].getAttribute('data-desc');
        _accs.push({
          name,
          code
        });
      }
      console.log(_accs);
      sendResponse(JSON.stringify(_accs));
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
        _videos.push({
          cover,
          code
        });
      }
      console.log(_videos);
      sendResponse(JSON.stringify(_videos));
      break;
    }

    case 'get_video_tx': {
      const body = getBody();

      const videoFrames = document.getElementById("ueditor_0").contentWindow.document.getElementsByClassName("wx_video_iframe");

      if (!videoFrames.length) return alertMsg("未发现腾讯视频!");

      const _videos = [];
      for (let i = 0; i < videoFrames.length; i++) {
        const item = videoFrames[i];
        if (!item) return alertMsg("未发现腾讯视频!");
        const code = item.getAttribute('src');
        const match = /(?<=vid=)\S+/
        const res = match.exec(code);
        if (!res) return alertMsg("未发现腾讯视频或视频格式错误!");
        _videos.push({
          code: res[0]
        });
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
        _minis.push({
          appid,
          path,
          name
        });
      }
      console.log(_minis);
      sendResponse(JSON.stringify(_minis));
      break;
    }
    case 'get_mimi_card': {
      // 获取到的音频节点信息
      const minis = document.getElementById("ueditor_0").contentWindow.document.getElementsByClassName("weapp_app_iframe");

      console.log(minis);
      if (!minis.length) return alertMsg("未发现卡片小程序!");

      const _minis = [];
      for (let i = 0; i < minis.length; i++) {
        const item = minis[i];
        console.log(item);
        if (!item) return alertMsg("未发现文字小程序!");
        const appid = item.getAttribute('data-miniprogram-appid');
        const path = item.getAttribute('data-miniprogram-path');
        const name = item.getAttribute("data-miniprogram-nickname");
        const code = item.outerHTML;
        _minis.push({
          appid,
          path,
          name,
          code
        });
      }
      console.log(_minis);
      sendResponse(JSON.stringify(_minis));
      break;
    }

    case 'get_location': {
      const body = getBody();
      // 获取到的地理位置信息
      const items = body.getElementsByClassName("js_poi_entry ct_geography_loc_tip");
      if (!items.length) return alertMsg("未发现文字地理位置!");

      console.log(items);
      const _items = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(item);
        if (!item) return alertMsg("未发现文字地理位置!");
        const name = item.text;
        const code = item.outerHTML;
        _items.push({
          code,
          name
        });
      }
      console.log(_items);
      sendResponse(JSON.stringify(_items));
      break;
    }
    case 'get_red_packet': {
      const body = getBody();
      // 获取到的红包封面代码
      const items = body.getElementsByClassName("wx-edui-media-wrp custom_select_card_wrp");
      if (!items.length) return alertMsg("未发现红包封面!");
      console.log(items);
      const _items = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        console.log(item);
        if (!item) return alertMsg("未发现红包封面!");
        const name = i + 1;
        const code = item.outerHTML;
        _items.push({
          code,
          name
        });
      }
      console.log(_items);
      sendResponse(JSON.stringify(_items));
      break;
    }

    case 'import_code': {
      const body = getBody();

      const code = request.code;
      console.log(code);

      body.innerHTML = code;

      sendResponse(true);
      alertMsg("操作成功!", 'success');
      break;
    }

    case 'import_code_append': {
      const body = getBody();

      const code = request.code;
      console.log(code);

      body.innerHTML = body.innerHTML + code;

      sendResponse(true);
      alertMsg("操作成功!", 'success');
      break;
    }
    case 'import_code_insert': {
      const body = getBody();

      const code = request.code;
      console.log(code);
      const html = body.innerHTML;



      const match = /<p>([{#]code[}#][\s\S]*?)<\/p>/g
      console.log(html.match(match));
      if (html.match(match)) {
        body.innerHTML = html.replace(match, code);
        alertMsg("操作成功!", 'success');
      } else {
        let hasFlag = html.indexOf("{code}");
        if (hasFlag != -1) {
          body.innerHTML = html.replace("{code}", code);
          sendResponse(true);
          alertMsg("操作成功!", 'success');
        } else {
          let hasFlag2 = html.indexOf("#code#");
          if (hasFlag2 != -1) {
            body.innerHTML = html.replace("#code#", code);
            sendResponse(true);
            alertMsg("操作成功!", 'success');
          } else {
            sendResponse(false);
            alertMsg("没有找到标志#code#!");
          }
        }

      }



      break;
    }

    default: {
      // tip(JSON.stringify(request));
      sendResponse('我收到你的消息了：' + JSON.stringify(request));
    }
  }

});

// 主动发送消息给后台
// 要演示此功能，请打开控制台主动执行sendMessageToBackground()
function sendMessageToBackground(message) {
  chrome.runtime.sendMessage({
    greeting: message || '你好，我是content-script呀，我主动发消息给后台！'
  }, function (response) {
    tip('收到来自后台的回复：' + response);
  });
}