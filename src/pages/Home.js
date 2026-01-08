import React from "react";

export default function Home({ onStart }) {
  return React.createElement("div", { className: "page-shell" },
    React.createElement("header", { className: "hero" },
      React.createElement("p", { className: "badge" }, "React 小练习"),
      React.createElement("h1", null, "欢迎来到简易答题站点"),
      React.createElement("p", { className: "sub" },
        "通过几个快速问题，看看你对 React 的理解程度。点击下方按钮开始吧。"
      ),
      React.createElement("button", {
        className: "primary",
        onClick: onStart
      }, "开始测试")
    ),
    React.createElement("section", { className: "card intro" },
      React.createElement("h2", null, "体验说明"),
      React.createElement("ul", null,
        React.createElement("li", null, "共 3 道单选题，每题 4 个选项。"),
        React.createElement("li", null, "答完自动跳转到结果页，显示分数与解析。"),
        React.createElement("li", null, "可随时重新开始，重新答题。")
      )
    )
  );
}

