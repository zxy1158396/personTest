import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home.js";
import Quiz from "./pages/Quiz.js";
import Result from "./pages/Result.js";

const createQuestions = () => [
  {
    id: 1,
    title: "React 的主要作用是什么？",
    options: [
      "构建用户界面",
      "管理数据库连接",
      "提供操作系统内核",
      "搭建物联网硬件"
    ],
    answerIndex: 0,
    description: "React 关注视图层，通过组件化快速构建 UI。"
  },
  {
    id: 2,
    title: "下列哪一项最能描述 React 组件？",
    options: [
      "可重复使用的 UI 单元",
      "存储数据的服务器",
      "浏览器内核模块",
      "命令行工具"
    ],
    answerIndex: 0,
    description: "组件让复杂界面拆分成小块，便于组合和复用。"
  },
  {
    id: 3,
    title: "在 React 中用来保存本地交互状态的 Hook 是？",
    options: ["useState", "useNode", "useDatabase", "useServer"],
    answerIndex: 0,
    description: "useState 让函数组件持有和更新局部状态。"
  }
];

export default function App() {
  const questions = useMemo(() => createQuestions(), []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "简易答题站点";
  }, []);

  const handleSelect = (optionIndex) => {
    setAnswers((prev) => {
      const existing = prev.find((item) => item.questionId === questions[currentIndex].id);
      if (existing) {
        return prev.map((item) =>
          item.questionId === questions[currentIndex].id
            ? { ...item, selectedIndex: optionIndex }
            : item
        );
      }
      return [
        ...prev,
        { questionId: questions[currentIndex].id, selectedIndex: optionIndex }
      ];
    });
  };

  const handleNext = () => {
    const isLast = currentIndex === questions.length - 1;
    if (isLast) {
      navigate("/result");
      return;
    }
    setCurrentIndex((idx) => idx + 1);
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentIndex(0);
    navigate("/");
  };

  return React.createElement(Routes, null,
    React.createElement(Route, {
      path: "/",
      element: React.createElement(Home, { onStart: () => navigate("/quiz") })
    }),
    React.createElement(Route, {
      path: "/quiz",
      element: React.createElement(Quiz, {
        question: questions[currentIndex],
        total: questions.length,
        currentIndex: currentIndex,
        onSelect: handleSelect,
        onNext: handleNext,
        selectedOption: answers.find((item) => item.questionId === questions[currentIndex].id)
          ?.selectedIndex ?? null
      })
    }),
    React.createElement(Route, {
      path: "/result",
      element: React.createElement(Result, {
        questions: questions,
        answers: answers,
        onRestart: handleRestart,
        onRetake: () => {
          setAnswers([]);
          setCurrentIndex(0);
          navigate("/quiz");
        }
      })
    }),
    React.createElement(Route, {
      path: "*",
      element: React.createElement(Navigate, { to: "/", replace: true })
    })
  );
}

