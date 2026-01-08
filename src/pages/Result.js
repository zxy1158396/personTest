import React from "react";

export default function Result({ questions, answers, onRestart, onRetake }) {
  if (!answers.length) {
    return React.createElement("div", { className: "page-shell" },
      React.createElement("div", { className: "card" },
        React.createElement("p", null, "还没有答题记录，请返回重新开始。"),
        React.createElement("div", { className: "actions" },
          React.createElement("button", {
            className: "primary",
            onClick: onRestart
          }, "回到首页")
        )
      )
    );
  }

  const detail = questions.map((q) => {
    const answer = answers.find((item) => item.questionId === q.id);
    const selectedIndex = answer?.selectedIndex ?? -1;
    const isCorrect = selectedIndex === q.answerIndex;
    return { ...q, selectedIndex, isCorrect };
  });

  const score = detail.filter((item) => item.isCorrect).length;

  return React.createElement("div", { className: "page-shell" },
    React.createElement("div", { className: "card result-card" },
      React.createElement("div", { className: "score" },
        React.createElement("p", { className: "badge" }, "完成"),
        React.createElement("h2", null,
          `你的得分：${score} / ${questions.length}`
        ),
        React.createElement("p", { className: "sub" },
          "查看每题结果与解析，巩固记忆。"
        )
      ),
      React.createElement("div", { className: "result-list" },
        detail.map((item, idx) => {
          const selected = item.options[item.selectedIndex];
          const correct = item.options[item.answerIndex];
          return React.createElement("div", { key: item.id, className: "result-row" },
            React.createElement("div", { className: "result-header" },
              React.createElement("span", {
                className: `pill ${item.isCorrect ? "success" : "warn"}`
              }, item.isCorrect ? "回答正确" : "回答错误"),
              React.createElement("span", { className: "light" }, `第 ${idx + 1} 题`)
            ),
            React.createElement("p", { className: "question-title" }, item.title),
            React.createElement("p", { className: "answer" },
              `你的选择：${selected ?? "未选择"} | 正确答案：${correct}`
            ),
            React.createElement("p", { className: "desc" }, item.description)
          );
        })
      ),
      React.createElement("div", { className: "actions" },
        React.createElement("button", {
          className: "primary",
          onClick: onRetake
        }, "再答一次"),
        React.createElement("button", {
          className: "ghost",
          onClick: onRestart
        }, "返回首页")
      )
    )
  );
}

