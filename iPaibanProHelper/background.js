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