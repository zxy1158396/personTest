import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Quiz({
  question,
  questions,
  total,
  currentIndex,
  round,
  answers,
  allRoundQuestions = [],
  allRoundAnswers = [],
  selectedOption,
  onSelect,
  onNext
}) {
  const [error, setError] = useState("");
  const [justAnswered, setJustAnswered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [shouldCenter, setShouldCenter] = useState(false);
  const navigate = useNavigate();
  const conversationHistoryRef = useRef(null);

  // 组件首次加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 检测窗口高度，决定是否居中显示答题卡片
  useEffect(() => {
    const checkHeight = () => {
      const windowHeight = window.innerHeight;
      // 如果窗口高度大于 800px，答题窗口居中显示
      setShouldCenter(windowHeight > 800);
    };

    checkHeight();
    window.addEventListener('resize', checkHeight);
    
    return () => window.removeEventListener('resize', checkHeight);
  }, []);

  useEffect(() => {
    setError("");
    setJustAnswered(false);
  }, [question?.id]);

  useEffect(() => {
    if (conversationHistoryRef.current) {
      setTimeout(() => {
        conversationHistoryRef.current.scrollTop = conversationHistoryRef.current.scrollHeight;
      }, 100);
    }
  }, [question?.id, selectedOption, currentIndex, answers.length]);

  if (!question) {
    return React.createElement("div", { className: "quiz-page-shell" },
      React.createElement("div", { className: "quiz-card" },
        React.createElement("p", null, "暂未找到题目，请返回首页重新开始。")
      )
    );
  }

  const getHistoryDialogs = () => {
    const previousRoundsDialogs = allRoundQuestions.map((q) => {
      const answer = allRoundAnswers.find(a => a.questionId === q.id);
      if (!answer) return null;
      return {
        question: q,
        answerIndex: answer.selectedIndex,
        answerText: q.options[answer.selectedIndex].text
      };
    }).filter(Boolean);
    
    const currentRoundDialogs = questions.slice(0, currentIndex).map((q) => {
      const answer = answers.find(a => a.questionId === q.id);
      if (!answer) return null;
      return {
        question: q,
        answerIndex: answer.selectedIndex,
        answerText: q.options[answer.selectedIndex].text
      };
    }).filter(Boolean);
    
    return [...previousRoundsDialogs, ...currentRoundDialogs];
  };

  const historyDialogs = getHistoryDialogs();
  const hasCurrentAnswer = selectedOption !== null;
  const showOptions = !hasCurrentAnswer && !justAnswered;

  // 处理选项点击
  const handleOptionClick = (idx) => {
    if (justAnswered || hasCurrentAnswer) return;
    
    onSelect(idx);
    setJustAnswered(true);
    setError("");
    
    setTimeout(() => {
      onNext();
    }, 1500);
  };

  return React.createElement("div", { 
    className: "quiz-page-shell",
    style: shouldCenter ? { 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '24px 20px'
    } : {}
  },
    React.createElement("div", { 
      className: "quiz-card-container",
      style: shouldCenter ? {
        width: '100%',
        maxWidth: '1200px'
      } : {}
    },
      React.createElement("div", { className: "quiz-card" },
        React.createElement("div", { className: "quiz-card-header" },
          React.createElement("div", { className: "quiz-status" },
            React.createElement("span", { className: "status-dot" }),
            React.createElement("span", { className: "status-text" }, "DNA ANALYSIS IN PROGRESS")
          ),
          React.createElement("div", { 
            className: "quiz-progress",
            style: { 
              margin: '0 16px',
              fontSize: '14px',
              color: '#6B7280',
              fontWeight: '500'
            }
          }, `Round ${round || 1} · ${currentIndex + 1} / ${total || 5}`),
          React.createElement("button", {
            className: "return-home-btn",
            onClick: () => navigate("/")
          },
            React.createElement("span", null, "RETURN HOME"),
            React.createElement("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              className: "arrow-icon"
            },
              React.createElement("path", {
                d: "M4.33327 2.66675L2 4.66675L4.33327 7.00008",
                stroke: "#9CA3AF",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }),
              React.createElement("path", {
                d: "M2 4.66675H9.6646C11.9589 4.66675 13.9074 6.54021 13.9968 8.83341C14.0913 11.2566 12.089 13.3334 9.6646 13.3334H3.99947",
                stroke: "#9CA3AF",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            )
          )
        ),
        
        React.createElement("div", { 
          ref: conversationHistoryRef,
          className: "conversation-history",
        },
          historyDialogs.map((dialog, idx) => 
            React.createElement(React.Fragment, { key: `dialog-${idx}-${dialog.question.id}` },
              React.createElement("div", { className: "dialog-message dialog-question" },
                React.createElement("p", { className: "dialog-text" }, dialog.question.title)
              ),
              React.createElement("div", { className: "dialog-message dialog-answer" },
                React.createElement("p", { className: "dialog-text" }, dialog.answerText)
              )
            )
          ),
          React.createElement("div", { className: "dialog-message dialog-question" },
            React.createElement("p", { className: "dialog-text" }, question.title)
          ),
          hasCurrentAnswer && React.createElement("div", { className: "dialog-message dialog-answer" },
            React.createElement("p", { className: "dialog-text" }, question.options[selectedOption].text)
          )
        ),

        showOptions && React.createElement("div", { className: "quiz-options-grid" },
          question.options.map((option, idx) => {
            // 如果未展开，只显示前4个选项
            if (!isExpanded && idx >= 4) {
              return null;
            }
            const isActive = selectedOption === idx;
            return React.createElement("button", {
              key: idx,
              className: `quiz-option ${isActive ? "active" : ""}`,
              onClick: () => handleOptionClick(idx)
            },
              React.createElement("span", { className: "option-text" }, option.text),
              React.createElement("div", { className: "option-arrow" },
                React.createElement("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "18",
                  height: "18",
                  viewBox: "0 0 18 18",
                  fill: "none"
                },
                  React.createElement("path", {
                    d: "M6.75 13.5L11.25 9L6.75 4.5",
                    stroke: "#6B7280",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                )
              )
            );
          }).filter(Boolean)
        ),
        !showOptions && React.createElement("div", {
          style: { height: '150px' }
        }),
        
        error ? React.createElement("p", { className: "quiz-error" }, error) : null,
        
        React.createElement("button", { 
          className: "view-less-btn",
          onClick: () => setIsExpanded(!isExpanded)
        },
          React.createElement("div", { className: "view-less-icon" },
            React.createElement("svg", {
              xmlns: "http://www.w3.org/2000/svg",
              width: "11",
              height: "6",
              viewBox: "0 0 11 6",
              fill: "none",
              style: isExpanded ? {} : { transform: 'rotate(180deg)' }
            },
              React.createElement("path", {
                d: "M0.75 0.75L5.25 5.25L9.75 0.75",
                stroke: "#C1C1C1",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            )
          ),
          React.createElement("span", null, isExpanded ? "VIEW LESS" : "VIEW MOEW")
        )
      )
    )
  );
}

