// background.js
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.contentScriptQuery === 'notification') {
      const {
        options
      } = request;
      chrome.notifications.create('notify1', options, (id) => {
        console.log(chrome.runtime.lastError)
        // alert(JSON.stringify(chrome.runtime.lastError)); // 如果没调成功可以在这里看看报错，在生产环境别忘了注释掉
      });
    }
    console.log('Did not receive the response!!!');
  });

chrome.browserAction.onClicked.addListener(function sendData() {
  console.log("browserAction!!!");

  // url = "http://yoursite.com/yourpage.html?";
  // var params = [];
  // for (key in data)
  //   params.push(encodeURIComponent(key) + "=" + data[key]);
  // url = url + params.join("&");
  chrome.tabs.create({
    url: "http://baidu.com"
  });
});

function toGetImgPage(url) {
  chrome.tabs.create({
    url:'chrome-extension://' + chrome.runtime.id + '/imgdld/download.html?code='+url
  });


}