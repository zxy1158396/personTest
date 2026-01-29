import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UndoSvg from "../public/Undo.svg";
import ChromeSvg from "../public/chrome.svg";
import Result1Img from "../public/result1.png";
import Result2Img from "../public/result2.png";
import Result3Img from "../public/Result3.png";
import Result4Img from "../public/Result4.png";
import Result5Img from "../public/Result5.png";
import Result6Img from "../public/Result6.png";
import Result7Img from "../public/Result7.png";
import Result8Img from "../public/Result8.png";
import Result9Img from "../public/Result9.png";
import Result10Img from "../public/Result10.png";
import Result11Img from "../public/Result11.png";
import Result12Img from "../public/Result12.png";
import Result13Img from "../public/Result13.png";
import Result14Img from "../public/Result14.png";
import Result15Img from "../public/Result15.png";
import { vaultsData } from "../data/vaultsData.js";

export default function Result({ questions, answers, onRestart, onRetake }) {
  const navigate = useNavigate();

  // 组件首次加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!answers.length) {
      navigate("/quiz");
    }
  }, [answers.length, navigate]);

  if (!answers.length) {
    return React.createElement("div", { className: "result-empty-page" });
  }

  // 计算每轮答题的分数
  const calculateRoundScores = () => {
    const rounds = [];
    const questionsPerRound = 5;
    
    // 将题目和答案按轮次分组（每轮5题）
    for (let i = 0; i < questions.length; i += questionsPerRound) {
      const roundQuestions = questions.slice(i, i + questionsPerRound);
      const roundAnswers = answers.filter(a => 
        roundQuestions.some(q => q.id === a.questionId)
      );
      
      // 计算该轮分数
      const roundScore = roundQuestions.reduce((totalScore, question) => {
        const answer = roundAnswers.find(a => a.questionId === question.id);
        if (answer && question.options[answer.selectedIndex]) {
          return totalScore + question.options[answer.selectedIndex].score;
        }
        return totalScore;
      }, 0);
      
      rounds.push(roundScore);
    }
    
    // 确保有5轮数据，不足的用0填充
    while (rounds.length < 5) {
      rounds.push(0);
    }
    
    return rounds.slice(0, 5);
  };

  // 计算总分（用于结果类型判断）
  const calculateScore = () => {
    return questions.reduce((totalScore, question) => {
      const answer = answers.find(a => a.questionId === question.id);
      if (answer && question.options[answer.selectedIndex]) {
        // 使用选项的分数值
        return totalScore + question.options[answer.selectedIndex].score;
      }
      return totalScore;
    }, 0);
  };

  const score = calculateScore();
  const totalQuestions = questions.length;
  const roundScores = calculateRoundScores(); // 每轮分数数组，最大值为20

  // 根据分数匹配最接近的金库
  const getMatchedVault = () => {
    if (!vaultsData || vaultsData.length === 0) {
      return null;
    }
    
    // 找到与总分最接近的金库（按score字段匹配）
    let matchedVault = vaultsData[0];
    let minDiff = Math.abs(score - vaultsData[0].score);
    
    vaultsData.forEach(vault => {
      const diff = Math.abs(score - vault.score);
      if (diff < minDiff) {
        minDiff = diff;
        matchedVault = vault;
      }
    });
    
    return matchedVault;
  };

  const matchedVault = getMatchedVault();

  // 根据分数确定结果类型（15个分段）
  const getResultConfig = () => {
    // 15: 120分
    if (score >= 120) {
      return {
        image: Result15Img,
        color: "#FF4D50",
        name: "Crypto Gambler",
        description: `The "Moon Shot Chaser" of crypto. You go all-in on memecoins, 100x leverage—win big or go home.`,
        TradingVibe: `You’re the trader who lives for the "next 100x": memecoins, 100x futures, no stop-loss. Volatility is your playground, and you never fold.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **High-Risk Moon Vault**: a 50-100x leverage vault for memecoins & high-volatility assets (risk warning required).`,
      };
    }
    // 14: 112-119分
    else if (score >= 112) {
      return {
        image: Result14Img,
        color: "#FF3A9C",
        name: "Scalper Sniper",
        description: `The "Micro-Trend Hunter" of crypto. You catch 5-10 minute swings—high frequency, tiny gains, massive volume.`,
        TradingVibe: `You trade in seconds: technical indicators are your compass, 0.1% gains add up fast. Leverage (5-10x) turns small moves into big wins.`,
        Recommendation: `We’ve paired you with Hyperliquid’s **Scalper Sprint Vault**: a 5-10x leverage vault optimized for 5-15 minute micro-trades.`,
      };
    }
    // 13: 104-111分
    else if (score >= 104) {
      return {
        image: Result13Img,
        color: "#FFEB3A",
        name: "Futures Veteran",
        description: `The "Volatility Master" of crypto. You thrive in chaos—10-20x leverage, extreme swings, and you never panic.`,
        TradingVibe: `You’re the trader who laughs at red candles: 10-20x futures, dynamic hedging, and you turn crashes into gains. Risk is high, but so are your returns.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **Futures Pro Vault**: a 10-20x leverage vault built for experienced traders (volatility-adjusted positions).`,
      };
    }
    // 12: 96-103分
    else if (score >= 96) {
      return {
        image: Result12Img,
        color: "#61FF98",
        name: "Futures Novice",
        description: `The "Futures Learner" of crypto. Small leverage, practice trades—you’re testing the waters (not diving in).`,
        TradingVibe: `You dip into 1-3x futures, but only with tiny capital: strategy testing is your goal, not big gains. Mistakes are part of the process.`,
        Recommendation: `We’ve paired you with Hyperliquid’s **Futures Practice Vault**: a 1-2x low-leverage vault with $100 max position limits.`,
      };
    }
    // 11: 88-95分
    else if (score >= 88) {
      return {
        image: Result11Img,
        color: "#00A1FF",
        name: "Light Leverager",
        description: `The "Efficiency Expert" of crypto. Low leverage (2-5x) is your tool—boost gains without overexposing capital.`,
        TradingVibe: `You’re the trader who maximizes every dollar: 2-5x leverage on high-conviction spot/futures trades, strict position sizing. Gains are steady, risk is controlled.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **Leverage Efficiency Vault**: a 2-5x vault with dynamic position limits (based on volatility).`,
      };
    }
    // 10: 80-87分
    else if (score >= 80) {
      return {
        image: Result10Img,
        color: "#70FF61",
        name: "Chain Arbitrager",
        description: `The "Cross-Chain Opportunist" of crypto. You profit from price gaps across blockchains—fast, automated, no emotion.`,
        TradingVibe: `You’re the trader who lives between chains: spot gaps on Ethereum/Solana are your target, bots execute in milliseconds. Gains are high, correlation is zero.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **Cross-Chain Gap Vault**: an automated arbitrage vault that trades across 3+ blockchains.`,
      };
    }
    // 9: 72-79分
    else if (score >= 72) {
      return {
        image: Result9Img,
        color: "#FF753A",
        name: "Trend Rider",
        description: `The "Momentum Surfer" of crypto. You ride market trends hard—spot or futures, you follow where the price goes.`,
        TradingVibe: `You trade with the tide: if it’s up, you’re in; if it reverses, you’re out. Leverage (3-5x) amplifies gains, but you exit fast.`,
        Recommendation: `We’ve paired you with Hyperliquid’s **Trend Surf Vault**: a 3-5x leverage vault that tracks 24-hour market momentum (auto-exit on reversals).`,
      };
    }
    // 8: 64-71分
    else if (score >= 64) {
      return {
        image: Result8Img,
        color: "#7E61FF",
        name: "Value Investor",
        description: `The "Fundamental Scout" of crypto. You dig into whitepapers, not charts—buy undervalued gems, hold for months.`,
        TradingVibe: `You treat crypto like stock investing: project basics first, price second. Volatility doesn’t scare you—you’re betting on long-term potential.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **Value Pick Vault**: a spot vault focused on underrated, high-fundamental projects (6+ month holds).`,
      };
    }
    // 7: 56-63分
    else if (score >= 56) {
      return {
        image: Result7Img,
        color: "#FF3C00",
        name: "Market Forecaster",
        description: `The "Trend Prophet" of crypto. You bet big on your calls—all-in on high-conviction trends (and you’re usually right).`,
        TradingVibe: `You’re the trader who predicts moves before they happen: technical/fundamental deep dives, all-in positions, 20x leverage. Wins are massive, losses are rare.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **Trend Bet Vault**: a 20x leverage vault for high-conviction trend trades (manual entry, auto-stop-loss).`,
      };
    }
    // 6: 48-55分
    else if (score >= 48) {
      return {
        image: Result6Img,
        color: "#FF61F4",
        name: "Capital Player",
        description: `The "Big Bet Handler" of crypto. You deploy large capital into high-risk plays—futures, presales, you name it.`,
        TradingVibe: `You’re the trader who plays with big money: 20-50x leverage, presale allocations, and you chase 100%+ gains. Risk is off the charts, but so are your returns.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **Big Capital Vault**: a 20-50x leverage vault for large-position traders (KYC-verified only).`,
      };
    }
    // 5: 40-47分
    else if (score >= 40) {
      return {
        image: Result5Img,
        color: "#CBFF46",
        name: "News Chaser",
        description: `The "Hype Rider" of crypto. You follow the chatter—social posts, rumors, trends—then strike fast (and small).`,
        TradingVibe: `You trade on what’s trending: FOMO is your trigger, quick exits are your safety net. Gains are small, but the thrill keeps you coming back.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **Hype Spot Vault**: a short-term spot vault that tracks top trending assets (no leverage).`,
      };
    }
    // 4: 32-39分
    else if (score >= 32) {
      return {
        image: Result4Img,
        color: "#00FFD4",
        name: "Hedge Arbitrager",
        description: `The "Stability Seeker" of crypto. You hedge spot and futures to lock gains—no volatility, just steady returns.`,
        TradingVibe: `You’re the trader who hates surprises: spot-futures gaps are your playground, zero market exposure is your superpower. Gains are modest, but guaranteed.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **Arbitrage Shield Vault**: a spot-futures hedge vault that profits from price discrepancies (0x leverage).`,
      };
    }
    // 3: 24-31分
    else if (score >= 24) {
      return {
        image: Result3Img,
        color: "#FFFFFF",
        name: "Newbie Tester",
        description: `The "Careful Newcomer" of the market. Small spot trades, minimal risk—you’re here to learn first, profit second.`,
        TradingVibe: `You dip toes (never dive) into crypto: tiny positions, basic assets, and a hard line against leverage. Mistakes are lessons, not losses.`,
        Recommendation: `We’ve paired you with Hyperliquid’s **Newbie Safe Vault**: a micro-spot vault with pre-set small position limits (max $50 per trade).`,
      };
    }
    // 2: 16-23分
    else if (score >= 16) {
      return {
        image: Result2Img,
        color: "#00E5FF",
        name: "Swing Trader",
        description: `The "Timing Specialist" of crypto. You catch spot trends, lock gains fast, and stop-loss is your best friend.`,
        TradingVibe: `You’re the trader who lives for 24-48 hour spot swings: technicals guide you, strict limits protect you. No holding—just "in, out, repeat."`,
        Recommendation: `We’ve paired you with Hyperliquid’s **Swing Capture Vault**: a spot vault optimized for 1-3 day trend trades (auto stop-loss/take-profit).`,
      };
    }
    // 1: 8-15分（默认）
    else {
      return {
        image: Result1Img,
        color: "#E9DB1A",
        name: "HODL Monk",
        description: `The "Zen Holder" of crypto. Your playbook: buy, forget, and let time do the work—no noise, no stress.`,
        TradingVibe: `You’re the trader who treats spot assets like long-term savings: zero short-term checks, zero FOMO, just steady (slow) growth. Volatility? It’s background noise.`,
        Recommendation: `We’ve matched you with Hyperliquid’s **Calm HODL Vault**: a spot-only vault built for "set-it-and-forget-it" long-term holds.`,
      };
    }
  };

  const resultConfig = getResultConfig();

  // 根据结果类型获取阴影样式
  const getShadowStyle = () => {
    if (resultConfig.image === Result15Img) {
      return { marginTop: '-20px' };
    } else if (resultConfig.image === Result14Img) {
      return { marginTop: '-12px' };
    } else if (resultConfig.image === Result13Img) {
      return { marginTop: '-20px' };
    } else if (resultConfig.image === Result12Img) {
      return { marginTop: '-20px' };
    } else if (resultConfig.image === Result11Img) {
      return { opacity: 0 };
    } else if (resultConfig.image === Result10Img) {
      return { marginTop: '-20px' };
    } else if (resultConfig.image === Result9Img) {
      return { marginTop: '-20px' };
    } else if (resultConfig.image === Result8Img) {
      return { marginTop: '-32px' };
    } else if (resultConfig.image === Result7Img) {
      return { marginTop: '-20px' };
    } else if (resultConfig.image === Result6Img) {
      return { marginTop: '-32px' };
    } else if (resultConfig.image === Result5Img) {
      return { opacity: 0 };
    } else if (resultConfig.image === Result4Img) {
      return { marginTop: '-20px' };
    } else if (resultConfig.image === Result3Img) {
      return { marginTop: '-20px' };
    } else if (resultConfig.image === Result2Img) {
      return { marginTop: '-20px' };
    } else if (resultConfig.image === Result1Img) {
      return { marginTop: '-20px' };
    }
    return {};
  };

  // 根据结果类型获取图片样式
  const getImageStyle = () => {
    if (resultConfig.image === Result4Img) {
      return { marginRight: '20px' };
    }
    return {};
  };

  // 生成唯一标识（基于答案生成哈希）
  const generateShareId = () => {
    // 基于答案生成唯一标识
    const answerString = answers
      .sort((a, b) => a.questionId - b.questionId)
      .map(a => `${a.questionId}-${a.selectedIndex}`)
      .join('|');
    
    // 简单的哈希函数
    let hash = 0;
    for (let i = 0; i < answerString.length; i++) {
      const char = answerString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // 添加时间戳确保唯一性
    const timestamp = Date.now();
    return `${Math.abs(hash).toString(36)}-${timestamp.toString(36)}`;
  };

  const shareId = generateShareId();

  // 获取当前页面的 URL（包含唯一标识）
  const getShareUrl = () => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/?share=${shareId}`;
  };

  // 分享到 Twitter
  const handleTwitterShare = () => {
    const shareUrl = getShareUrl();
    const shareText = `I discovered my Trading DNA: ${resultConfig.name}! Discover yours:`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  // 分享到 Telegram
  const handleTelegramShare = () => {
    const shareUrl = getShareUrl();
    const shareText = `I discovered my Trading DNA: ${resultConfig.name}! Discover yours: ${shareUrl}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(telegramUrl, '_blank', 'width=550,height=420');
  };

  return React.createElement("div", { className: "result-page-shell" },
    React.createElement("div", { className: "result-container" },
      // 左侧主要区域
      React.createElement("div", { className: "result-left" },
        React.createElement("div", { className: "result-left-inner" },
          // 主结果卡片（带发光边框）
          React.createElement("div", { 
            className: "result-card-container",
            style: { 
              '--result-color': resultConfig.color 
            }
          },
            React.createElement("div", { className: "result-main-card" },
              React.createElement("h1", { className: "persona-title" }, resultConfig.name),
              React.createElement("div", { className: "persona-illustration" },
                React.createElement("img", {
                  src: resultConfig.image,
                  alt: resultConfig.name,
                  className: "persona-image",
                  style: getImageStyle()
                }),
                React.createElement("svg", {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "230",
                  height: "26",
                  viewBox: "0 0 230 26",
                  fill: "none",
                  className: "persona-shadow",
                  style: getShadowStyle()
                },
                  React.createElement("ellipse", {
                    cx: "115",
                    cy: "13",
                    rx: "115",
                    ry: "13",
                    fill: "black"
                  })
                )
              ),
              React.createElement("p", { className: "persona-description" }, resultConfig.description)
            )
          ),
          // 社交分享按钮
          React.createElement("div", { className: "result-social-buttons" },
            React.createElement("button", { 
              className: "social-share-btn",
              onClick: handleTwitterShare
            },
              React.createElement("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none"
              },
                React.createElement("path", {
                  d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  fill: "#000000"
                })
              ),
              React.createElement("span", null, "Twitter (X)")
            ),
            React.createElement("button", { 
              className: "social-share-btn",
              onClick: handleTelegramShare
            },
              React.createElement("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none"
              },
                React.createElement("path", {
                  d: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z",
                  fill: "#000000"
                })
              ),
              React.createElement("span", null, "Telegram")
            )
          ),
          // Retake Test按钮
          React.createElement("button", {
            className: "retake-test-btn",
            onClick: onRetake
          },
            React.createElement("img", {
              src: UndoSvg,
              alt: "Undo",
              className: "retake-icon"
            }),
            React.createElement("span", null, "Retake Test")
          )
        )
      ),
      // 右侧信息区域
      React.createElement("div", { className: "result-right" },
        // Trading Vibe区域
        React.createElement("div", { className: "trading-vibe-section" },
          React.createElement("h2", { className: "trading-vibe-title" }, "Your Trading Vibe"),
          React.createElement("p", { className: "trading-vibe-description" },
            resultConfig.TradingVibe
          ),
          // 雷达图（九边形）
          React.createElement("div", { 
            className: "radar-chart-container",
            style: { '--radar-color': resultConfig.color }
          },
            React.createElement("svg", {
              className: "radar-chart",
              width: "200",
              height: "200",
              viewBox: "0 0 200 200"
            },
              // 网格线（多边形，直线连接）
              React.createElement("g", { className: "radar-grid" },
                // 同心多边形（3层，五边形）
                Array.from({ length: 3 }).map((_, i) => {
                  const radius = 40 + i * 30;
                  const points = Array.from({ length: 5 }).map((_, j) => {
                    const angle = (j * 72 - 90) * (Math.PI / 180);
                    const x = 100 + radius * Math.cos(angle);
                    const y = 100 + radius * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' ');
                  return React.createElement("polygon", {
                    key: `grid-${i}`,
                    points: points,
                    fill: "none",
                    stroke: "#ffffff",
                    strokeWidth: "2"
                  });
                }),
                // 轴线（5条，五边形）
                Array.from({ length: 5 }).map((_, i) => {
                  const angle = (i * 72 - 90) * (Math.PI / 180);
                  const x = 100 + 100 * Math.cos(angle);
                  const y = 100 + 100 * Math.sin(angle);
                  return React.createElement("line", {
                    key: `axis-${i}`,
                    x1: "100",
                    y1: "100",
                    x2: x,
                    y2: y,
                    stroke: "#ffffff",
                    strokeWidth: "2"
                  });
                })
              ),
              // 数据区域（五边形）- 使用每轮答题分数
              React.createElement("g", { className: "radar-data-group" },
                React.createElement("polygon", {
                  className: "radar-data",
                  points: roundScores.map((roundScore, i) => {
                    const angle = (i * 72 - 90) * (Math.PI / 180);
                    // 每轮分数范围是 0-20，转换为半径值（映射到 0-100 的半径范围）
                    const value = roundScore * 5; // 0-20 映射到 0-100
                    const x = 100 + value * Math.cos(angle);
                    const y = 100 + value * Math.sin(angle);
                    return `${x},${y}`;
                  }).join(' '),
                  fill: resultConfig.color,
                  fillOpacity: "0.6",
                  stroke: resultConfig.color,
                  strokeWidth: "3"
                }),
                // 数据点标记（使用结果颜色）
                roundScores.map((roundScore, i) => {
                  const angle = (i * 72 - 90) * (Math.PI / 180);
                  const value = roundScore * 5; // 0-20 映射到 0-100
                  const x = 100 + value * Math.cos(angle);
                  const y = 100 + value * Math.sin(angle);
                  return React.createElement("circle", {
                    key: `point-${i}`,
                    cx: x,
                    cy: y,
                    r: "4",
                    fill: resultConfig.color,
                    stroke: "none"
                  });
                })
              )
            )
          )
        ),
        // Recommendation卡片（带发光边框）
        React.createElement("div", { className: "recommendation-card-container" },
          React.createElement("div", { className: "recommendation-card" },
            React.createElement("h2", { className: "recommendation-title" }, "Recommendation"),
            React.createElement("p", { className: "recommendation-description" },
              resultConfig.Recommendation
            ),
            React.createElement("button", { 
              className: "follow-vault-btn",
              onClick: () => matchedVault.url && window.open(matchedVault.url, '_blank')
            },
              React.createElement("img", {
                src: ChromeSvg,
                alt: "Chrome",
                className: "follow-icon"
              }),
              React.createElement("span", null, "One-Click Follow Vault")
            )
          )
        )
      )
    )
  );
}

