import React, { useState, useEffect } from "react";
import CompletedImg from "../public/Completed.jpg";
import PlannedImg from "../public/Planned.jpg";
import TelegramImg from "../public/Telegram.png";
import TwitterImg from "../public/Twitter.png";
import LiveImg from "../public/Live.png";
import FollowingImg from "../public/Following.png";
import MemeImg from "../public/Meme.png";
import SecuredImg from "../public/Secured.png";
import TaskImg from "../public/Task.png";
import { vaultsData, getRiskTypeClass } from "../data/vaultsData.js";

export default function Home({ onStart }) {
  // 随机获取指定数量的金库
  const getRandomVaults = (count) => {
    const shuffled = [...vaultsData].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };


  // 使用 useState 存储随机金库，确保只在组件首次加载时生成
  const [randomVaults, setRandomVaults] = useState([]);

  // 组件首次加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 在组件首次加载时生成随机金库
  useEffect(() => {
    setRandomVaults(getRandomVaults(6));
  }, []);


  // 获取当前页面的 URL
  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return baseUrl;
  };

  // 分享到 Twitter
  const handleTwitterShare = () => {
    const shareUrl = getShareUrl();
    const shareText = "Discover Your Trading DNA! Take the AI-powered assessment to find your Web3 persona and matched Hyperliquid vaults.";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  // 分享到 Telegram
  const handleTelegramShare = () => {
    const shareUrl = getShareUrl();
    const shareText = `Discover Your Trading DNA! Take the AI-powered assessment to find your Web3 persona and matched Hyperliquid vaults. ${shareUrl}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank', 'width=550,height=420');
  };

  return React.createElement("div", { className: "page-shell" },
    React.createElement("section", { className: "hero" },
      React.createElement("div", { className: "main-title" },
        React.createElement("span", { className: "title-part1" }, "Discover Your"),
        React.createElement("span", { className: "title-part2" }, "Trading DNA")
      ),
      React.createElement("p", { className: "sub" },
        "Are you a Guardian or a Daredevil? Take the AI-powered assessment to find your Web3 persona and matched Hyperliquid vaults."
      ),
      React.createElement("button", {
        className: "primary",
        onClick: onStart
      }, "Start AI Assessment")
    ),
    React.createElement("section", { className: "dashboard-container" },
      // 第一列 - Live Strategy
      React.createElement("div", { className: "dashboard-column" },
        React.createElement("div", { className: "dashboard-card live-strategy-card" },
          React.createElement("div", { className: "card-header" },
            React.createElement("div", { className: "card-header-left" },
              React.createElement("img", { 
                src: LiveImg, 
                alt: "Live", 
                className: "card-icon" 
              }),
              React.createElement("div", { className: "card-title-group" },
                React.createElement("h3", { className: "card-title" }, "LIVE STRATEGY"),
                React.createElement("p", { className: "card-subtitle" }, "Trading since Dec 2025")
              )
            ),
            React.createElement("span", { className: "status-badge active" }, "ACTIVE")
          ),
          React.createElement("div", { className: "pnl-section" },
            React.createElement("div", { className: "pnl-value" }, "+89%"),
            React.createElement("div", { className: "pnl-label" }, "TOTAL PNL")
          ),
          React.createElement("div", { className: "progress-bar" },
            React.createElement("div", { className: "progress-fill", style: { width: "89%" } })
          ),
          React.createElement("div", { className: "stats-row" },
            React.createElement("div", { className: "stat-item" },
              React.createElement("div", { className: "stat-label" }, "WIN RATE"),
              React.createElement("div", { className: "stat-value" }, "78.61%")
            ),
            React.createElement("div", { className: "stat-item" },
              React.createElement("div", { className: "stat-label" }, "DRAWDOWN"),
              React.createElement("div", { className: "stat-value" }, "4.22%")
            )
          )
        )
      ),
      
      // 第二列 - Following Vaults, Secured Chains (并排) + Meme Personality (下方)
      React.createElement("div", { className: "dashboard-column" },
        // Following 和 Secured 并排的行
        React.createElement("div", { className: "dashboard-row" },
          React.createElement("div", { className: "dashboard-card info-card" },
            React.createElement("img", { 
              src: FollowingImg, 
              alt: "Following", 
              className: "info-card-icon" 
            }),
            React.createElement("div", { className: "info-card-number" }, "3"),
            React.createElement("p", { className: "info-card-label" }, "FOLLOWING VAULTS")
          ),
          React.createElement("div", { className: "dashboard-card info-card" },
            React.createElement("img", { 
              src: SecuredImg, 
              alt: "Secured", 
              className: "info-card-icon" 
            }),
            React.createElement("div", { className: "info-card-number" }, "10"),
            React.createElement("p", { className: "info-card-label" }, "SECURED CHAINS")
          )
        ),
        // Meme Personality 在下方
        React.createElement("div", { className: "dashboard-card meme-card" },
          React.createElement("div", { className: "meme-content" },
            React.createElement("img", { 
              src: MemeImg, 
              alt: "Meme", 
              className: "meme-avatar" 
            }),
            React.createElement("div", { className: "meme-info" },
              React.createElement("h4", { className: "meme-title" }, "Meme Personality"),
              React.createElement("p", { className: "meme-subtitle" }, "High Affinity: $PEPE")
            )
          ),
          React.createElement("div", { className: "meme-score" },
            React.createElement("div", { className: "score-value" }, "92%"),
            React.createElement("div", { className: "score-label" }, "MATCH SCORE")
          )
        )
      ),
      
      // 第三列 - My Tasks
      React.createElement("div", { className: "dashboard-column" },
        React.createElement("div", { className: "dashboard-card tasks-card" },
          React.createElement("div", { className: "card-header" },
            React.createElement("div", { className: "card-header-left" },
              React.createElement("img", { 
                src: TaskImg, 
                alt: "Tasks", 
                className: "task-icon" 
              }),
              React.createElement("h3", { className: "card-title" }, "MY TASKS")
            )
          ),
          React.createElement("div", { className: "tasks-list" },
            React.createElement("div", { className: "task-item" },
              React.createElement("div", { className: "task-bullet completed" }),
              React.createElement("span", { className: "task-name" }, "Plan Persona")
            ),
            React.createElement("div", { className: "task-item" },
              React.createElement("div", { className: "task-bullet active" }),
              React.createElement("span", { className: "task-name" }, "Evaluate Vaults")
            ),
            React.createElement("div", { className: "task-item" },
              React.createElement("div", { className: "task-bullet" }),
              React.createElement("span", { className: "task-name" }, "Setup Portfolio")
            )
          ),
          React.createElement("div", { className: "completion-section" },
            React.createElement("div", { className: "completion-label" }, "COMPLETION"),
            React.createElement("div", { className: "completion-value" }, "78.61%")
          )
        )
      )
    ),
    React.createElement("section", { className: "content-section" },
      React.createElement("h2", { className: "section-title" }, "Trending Vaults"),
      React.createElement("p", { className: "section-subtitle" }, "Top performing strategies this week"),
      React.createElement("div", { className: "vaults-grid" },
        randomVaults.map((vault) =>
          React.createElement("div", { key: vault.id, className: "vault-card" },
            React.createElement("div", { className: "vault-header" },
              React.createElement("div", { className: "vault-title-group" },
                React.createElement("h3", { className: "vault-title" }, vault.name),
                React.createElement("p", { className: "vault-creator" }, `By ${vault.author}`)
              ),
              React.createElement("span", { 
                className: `risk-badge ${getRiskTypeClass(vault.riskType)}` 
              }, vault.riskType)
            ),
            React.createElement("div", { className: "vault-metrics" },
              React.createElement("div", { className: "metric" },
                React.createElement("span", { className: "metric-label" }, "APY"),
                React.createElement("span", { 
                  className: `metric-value ${vault.apy.startsWith('+') ? 'positive' : ''}` 
                }, vault.apy)
              ),
              React.createElement("div", { className: "metric" },
                React.createElement("span", { className: "metric-label" }, "TVL"),
                React.createElement("span", { className: "metric-value" }, vault.tvl)
              ),
              React.createElement("div", { className: "metric" },
                React.createElement("span", { className: "metric-label" }, "FOLLOWERS"),
                React.createElement("span", { 
                  className: `metric-value ${vault.followers.startsWith('+') ? '' : ''}` 
                }, vault.followers)
              )
            ),
            React.createElement("div", { className: "vault-tags" },
              vault.tags.map((tag, tagIdx) =>
                React.createElement("span", { key: tagIdx, className: "tag" }, tag)
              )
            ),
            React.createElement("button", { 
              className: "vault-btn",
              onClick: () => vault.url && window.open(vault.url, "_blank")
            }, "VIEW STRATEGY")
          )
        )
      )
    ),
    React.createElement("footer", { className: "footer" },
      React.createElement("p", { className: "join-us" }, "Join us"),
      React.createElement("div", { className: "social-buttons" },
        React.createElement("button", { 
          className: "social-btn",
          onClick: handleTwitterShare
        }, 
          React.createElement("img", { 
            src: TwitterImg, 
            alt: "Twitter", 
            style: { width: '20px', height: '20px', marginRight: '8px' } 
          }),
          "Twitter (X)"
        ),
        React.createElement("button", { 
          className: "social-btn",
          onClick: handleTelegramShare
        },
          React.createElement("img", { 
            src: TelegramImg, 
            alt: "Telegram", 
            style: { width: '20px', height: '20px', marginRight: '8px' } 
          }),
          "Telegram"
        )
      ),
    ),
    // React.createElement("p", { className: "copyright" }, "© 2025 HyperPersona")
  );
}
