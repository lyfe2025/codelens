/**
 * 移动开发课程数据
 * TODO: 后续开发
 */
export const mobileLessons = [
  {
    title: '移动开发概述',
    desc: '了解移动应用开发的主流方案',
    theory: `
      <p>原生开发：iOS (Swift)、Android (Kotlin)</p>
      <p>跨平台：React Native、Flutter、uni-app</p>
      <p>混合应用：Cordova、Capacitor</p>
    `,
    html: `<div id="output"></div>`,
    css: `#output { font-family: system-ui; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 16px; text-align: center; }`,
    js: `document.getElementById("output").innerHTML = "📱<br><br>移动开发课程<br>正在开发中...<br><br>敬请期待！";`,
    task: '课程开发中，敬请期待',
    hints: ['课程即将上线'],
    solution: {},
    check: () => true
  }
]
