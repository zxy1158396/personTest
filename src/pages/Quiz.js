import React, { useEffect, useState } from "react";

export default function Quiz({
  question,
  total,
  currentIndex,
  selectedOption,
  onSelect,
  onNext
}) {
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [question?.id]);

  if (!question) {
    return React.createElement("div", { className: "page-shell" },
      React.createElement("div", { className: "card" },
        React.createElement("p", null, "暂未找到题目，请返回首页重新开始。")
      )
    );
  }

  const handleSubmit = () => {
    if (selectedOption === null) {
      setError("请选择一个选项后再继续");
      return;
    }
    onNext();
  };

  return React.createElement("div", { className: "page-shell" },
    React.createElement("div", { className: "card question-card" },
      React.createElement("div", { className: "card-header" },
        React.createElement("span", { className: "badge" },
          `问题 ${currentIndex + 1}/${total}`
        ),
        React.createElement("div", { className: "progress" },
          React.createElement("div", {
            className: "progress-bar",
            style: { width: `${((currentIndex + 1) / total) * 100}%` }
          })
        )
      ),
      React.createElement("h2", null, question.title),
      React.createElement("div", { className: "options" },
        question.options.map((option, idx) => {
          const isActive = selectedOption === idx;
          return React.createElement("button", {
            key: option,
            className: `option ${isActive ? "active" : ""}`,
            onClick: () => {
              onSelect(idx);
              setError("");
            }
          },
            React.createElement("span", { className: "option-index" },
              String.fromCharCode(65 + idx)
            ),
            React.createElement("span", null, option)
          );
        })
      ),
      error ? React.createElement("p", { className: "error" }, error) : null,
      React.createElement("div", { className: "actions" },
        React.createElement("button", {
          className: "primary",
          onClick: handleSubmit
        }, currentIndex + 1 === total ? "提交并查看结果" : "下一题")
      )
    )
  );
}

