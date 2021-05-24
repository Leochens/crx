// console.log("this is index.js")
// console.log(document)
// console.log(location)
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
//创建页面函数
function createPage () {
  const page = $('<div id="cj_move_page"></div>')
  const h3 = $(`<h3 id="cj_move_h3">
  <h3 style="margin:8px;font-size: 14px">iPaiban Pro 采集器</h3>
  <div class="grid">
    <div class="row">
      <div class="item big" id="get_code" style="border: 1px solid #eee;">
        <div class="title">采集文章代码</div>
        <div class="tip">采集图文代码到剪贴板</div>
      </div>
    </div>
    <div class="row">
    <div class="item big" style="border: 1px solid #eee;">
      <div class="title">转换图文到可用格式</div>
      <div class="tip"> <a href="http://x.ipaiban.com/tools/translinks" target="_blank" >点我去转换</a></div>
    </div>
  </div>
  </div>
  </h3>`)
  page.append(h3)
  console.log($('body'))
  $('body').append(page)
  $('#get_code').click(e => {
    const html = document.getElementById('js_content').innerHTML
    // console.log(html);
    const input = document.createElement('input');
    input.value = html;
    document.body.appendChild(input);
    input.select();
    if (document.execCommand('Copy')) {
      document.execCommand('Copy');
      console.log('复制成功！');
      alertMsg("已复制到剪贴板！", 'success');

    } else {
      console.log('复制失败！');
      alertMsg("复制失败,请重试！");

    }
    input.style.display = 'none';
    // 要给content-srcipt 发送消息获得当前页面的dom
  });
  //拖拽
  // drag(cj_move_h3)
}
createPage()
// //拖拽
// function drag (ele) {
//   let oldX, oldY, newX, newY
//   ele.onmousedown = function (e) {
//     if (!cj_move_page.style.right && !cj_move_page.style.bottom) {
//       cj_move_page.style.top = "100px"
//       cj_move_page.style.left = "100px"
//     }
//     oldX = e.clientX
//     oldY = e.clientY
//     document.onmousemove = function (e) {
//       newX = e.clientX
//       newY = e.clientY
//       cj_move_page.style.left = parseInt(cj_move_page.style.left) + newX - oldX + 'px'
//       cj_move_page.style.top = parseInt(cj_move_page.style.top) + newY - oldY + 'px'
//       oldX = newX
//       oldY = newY
//     }
//     document.onmouseup = function () {
//       document.onmousemove = null
//       document.onmouseup = null
//     }
//   }
// }



