import React, { useEffect, useMemo, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home.js";
import Quiz from "./pages/Quiz.js";
import Result from "./pages/Result.js";
import Navbar from "./components/Navbar.js";

const createQuestions = () => [
  {
    id: 1,
    title: "Imagine pushing open the door to the crypto world—what's the first sound you hear behind it?",
    options: [
      { text: "Noisy pump-and-dump shouts", score: 1 },
      { text: "Community discussions", score: 1 },
      { text: "Rhythmic K-line beeps", score: 2 },
      { text: "Project roadshow announcements", score: 2 },
      { text: "Roar of mining rigs", score: 3 },
      { text: "On-chain confirmation sounds", score: 3 },
      { text: "Exchange broadcast announcements", score: 4 },
      { text: "Wallet deposit notifications", score: 4 }
    ],
  },
  {
    id: 2,
    title: "If your crypto wallet became an animal, what would it most resemble now?",
    options: [
      { text: "A frightened rabbit", score: 1 },
      { text: "A timid squirrel", score: 1 },
      { text: "A hibernating brown bear", score: 2 },
      { text: "A lazy cat", score: 2 },
      { text: "A patrolling wild wolf", score: 3 },
      { text: "A steady leopard", score: 3 },
      { text: "A soaring eagle", score: 4 },
      { text: "A massive elephant", score: 4 }
    ],
  },
  {
    id: 3,
    title: "Seeing your holdings drop 20% with a big red candle, what's your first physical reaction?",
    options: [
      { text: "Stomach pain and anxiety", score: 1 },
      { text: "Sweaty palms", score: 1 },
      { text: "Close the app", score: 2 },
      { text: "Frustrated complaints", score: 2 },
      { text: "Feel numb", score: 3 },
      { text: "Calm calculation", score: 3 },
      { text: "Excited to add more", score: 4 },
      { text: "Calmly average down", score: 4 }
    ],
  },
  {
    id: 4,
    title: "Someone in the community posts 'Insider tip: a coin will double tomorrow', you would?",
    options: [
      { text: "Go all in immediately", score: 1 },
      { text: "Small amount follow", score: 1 },
      { text: "Forward to verify", score: 2 },
      { text: "Wait for verification", score: 2 },
      { text: "Suspect a scam", score: 3 },
      { text: "Block the poster", score: 3 },
      { text: "Check on-chain fund flows", score: 4 },
      { text: "Research project background", score: 4 }
    ],
  },
  {
    id: 5,
    title: "What role do you most resemble in the crypto market?",
    options: [
      { text: "Tourist", score: 1 },
      { text: "Casual observer", score: 1 },
      { text: "Being hunted", score: 2 },
      { text: "Following retail trader", score: 2 },
      { text: "Treasure hunter", score: 3 },
      { text: "Short-term hunter", score: 3 },
      { text: "Ecosystem maintainer", score: 4 },
      { text: "Professional trader", score: 4 }
    ],
  },
  {
    id: 6,
    title: "For your first crypto purchase, which method would you prioritize?",
    options: [
      { text: "Follow influencer recommendations", score: 1 },
      { text: "Buy with friends", score: 1 },
      { text: "Check trending rankings", score: 2 },
      { text: "Choose top 10 by market cap", score: 2 },
      { text: "Review project whitepaper", score: 3 },
      { text: "Reference exchange recommendations", score: 3 },
      { text: "Analyze on-chain contracts", score: 4 },
      { text: "Research sector logic", score: 4 }
    ],
  },
  {
    id: 7,
    title: "When the exchange shows 'Network congestion, withdrawal delayed', you would?",
    options: [
      { text: "Panic and lose sleep", score: 1 },
      { text: "Ask community for help", score: 1 },
      { text: "Keep refreshing", score: 2 },
      { text: "Contact customer service", score: 2 },
      { text: "Wait calmly", score: 3 },
      { text: "Check block height", score: 3 },
      { text: "Switch to on-chain wallet", score: 4 },
      { text: "Cross-chain withdrawal operation", score: 4 }
    ],
  },
  {
    id: 8,
    title: "What's your attitude toward 'private keys'?",
    options: [
      { text: "Store in phone notes", score: 1 },
      { text: "Save in phone contacts", score: 1 },
      { text: "Write on paper and hide it", score: 2 },
      { text: "Give to family for safekeeping", score: 2 },
      { text: "Store in hardware wallet", score: 3 },
      { text: "Encrypt and store in multiple places", score: 3 },
      { text: "Manage with multisig wallet", score: 4 },
      { text: "Cold wallet offline storage", score: 4 }
    ],
  },
  {
    id: 9,
    title: "When you hear the word 'decentralization', your first reaction is?",
    options: [
      { text: "Sounds impressive but unclear", score: 1 },
      { text: "Marketing hype", score: 1 },
      { text: "Secure and reliable", score: 2 },
      { text: "Freedom and equality", score: 2 },
      { text: "Technical concept", score: 3 },
      { text: "Future trend", score: 3 },
      { text: "Regulatory avoidance", score: 4 },
      { text: "Technological innovation", score: 4 }
    ],
  },
  {
    id: 10,
    title: "Your holdings are up 10%, you would?",
    options: [
      { text: "Sell immediately", score: 1 },
      { text: "Convert to stablecoin", score: 1 },
      { text: "Sell when target is reached", score: 2 },
      { text: "Continue holding and wait", score: 2 },
      { text: "Add more and chase", score: 3 },
      { text: "Partial profit taking", score: 3 },
      { text: "Set take-profit", score: 4 },
      { text: "Raise original take-profit point", score: 4 }
    ],
  },
  {
    id: 11,
    title: "How do you view 'leverage trading'?",
    options: [
      { text: "A dangerous beast", score: 1 },
      { text: "Touching it means loss", score: 1 },
      { text: "Won't touch it", score: 2 },
      { text: "Only watch others do it", score: 2 },
      { text: "Try with small capital", score: 3 },
      { text: "Occasionally play low leverage", score: 3 },
      { text: "Main profit tool", score: 4 },
      { text: "Risk hedging tool", score: 4 }
    ],
  },
  {
    id: 12,
    title: "Seeing a high-yield 'liquidity mining' ad, you would?",
    options: [
      { text: "Jump in without thinking", score: 1 },
      { text: "Participate immediately", score: 1 },
      { text: "Ask friends if it's reliable", score: 2 },
      { text: "Check platform endorsement", score: 2 },
      { text: "Check project TVL", score: 3 },
      { text: "Small amount trial", score: 3 },
      { text: "Audit the contract code", score: 4 },
      { text: "Check project team background", score: 4 }
    ],
  },
  {
    id: 13,
    title: "How often do you check the crypto market?",
    options: [
      { text: "Once a day", score: 1 },
      { text: "Once a week", score: 1 },
      { text: "Check when free", score: 2 },
      { text: "Occasionally check during market open", score: 2 },
      { text: "Scheduled monitoring", score: 3 },
      { text: "Only check evening recap", score: 3 },
      { text: "Use bots to monitor", score: 4 },
      { text: "24-hour monitoring tools", score: 4 }
    ],
  },
  {
    id: 14,
    title: "When someone asks 'what coin to buy', you would?",
    options: [
      { text: "Recommend directly", score: 1 },
      { text: "Say what you bought", score: 1 },
      { text: "Ask about their needs", score: 2 },
      { text: "Recommend popular coins", score: 2 },
      { text: "Analyze market then suggest", score: 3 },
      { text: "Share coin selection methods", score: 3 },
      { text: "Warn about risks", score: 4 },
      { text: "Refuse to recommend and educate on risk control", score: 4 }
    ],
  },
  {
    id: 15,
    title: "What's your understanding of 'bear market'?",
    options: [
      { text: "A nightmare of losses", score: 1 },
      { text: "The end of the industry", score: 1 },
      { text: "Afraid to enter", score: 2 },
      { text: "Cut losses and exit immediately", score: 2 },
      { text: "A chance to buy the dip", score: 3 },
      { text: "A window to accumulate", score: 3 },
      { text: "A cycle for positioning", score: 4 },
      { text: "Industry reshuffle period", score: 4 }
    ],
  },
];

const createVeteranQuestions = () => [
  {
    id: 101,
    title: "In the crypto battlefield, what tactics are you best at?",
    options: [
      { text: "Build fortresses and accumulate coins", score: 1 },
      { text: "Deep cultivation and hold coins", score: 1 },
      { text: "Lightning raids and swing trading", score: 2 },
      { text: "Quick in and out short-term trading", score: 2 },
      { text: "Quantitative arbitrage harvesting", score: 3 },
      { text: "Cross-market low-risk arbitrage", score: 3 },
      { text: "Hedge risks and preserve capital", score: 4 },
      { text: "Long-short combination hedging", score: 4 }
    ],
  },
  {
    id: 102,
    title: "Facing perpetual contract funding rate settlement, you would?",
    options: [
      { text: "Close positions early to avoid", score: 1 },
      { text: "Pause operations and wait", score: 1 },
      { text: "Treat it as payday", score: 2 },
      { text: "Open positions with trend to earn funding", score: 2 },
      { text: "Open reverse positions for arbitrage", score: 3 },
      { text: "Cross-contract funding rate arbitrage", score: 3 },
      { text: "Adjust positions based on funding rate", score: 4 },
      { text: "Dynamic position adjustment to adapt to funding rate", score: 4 }
    ],
  },
  {
    id: 103,
    title: "Which profit logic do you believe in more?",
    options: [
      { text: "Compound interest over time", score: 1 },
      { text: "Long-term coin appreciation", score: 1 },
      { text: "Leverage of speed", score: 2 },
      { text: "High leverage gambling", score: 2 },
      { text: "Information advantage", score: 3 },
      { text: "Precise information arbitrage", score: 3 },
      { text: "Scale of capital", score: 4 },
      { text: "Market making with large capital", score: 4 }
    ],
  },
  {
    id: 104,
    title: "How do you handle 'futures contract expiration'?",
    options: [
      { text: "Close positions early, no rollover", score: 1 },
      { text: "Liquidate before expiration", score: 1 },
      { text: "Rollover and continue holding", score: 2 },
      { text: "Direct rollover to maintain trend", score: 2 },
      { text: "Roll to next month", score: 3 },
      { text: "Opportunistic rollover to adjust entry point", score: 3 },
      { text: "Hedge rollover risks", score: 4 },
      { text: "Combined strategy to hedge rollover", score: 4 }
    ],
  },
  {
    id: 105,
    title: "How often do you use 'on-chain data'?",
    options: [
      { text: "Occasionally check", score: 1 },
      { text: "Check during market volatility", score: 1 },
      { text: "Must check before trading", score: 2 },
      { text: "Deep analysis before opening positions", score: 2 },
      { text: "Real-time monitoring", score: 3 },
      { text: "Watch data synchronously while monitoring market", score: 3 },
      { text: "Data source for quantitative strategies", score: 4 },
      { text: "Algorithmic trading data support", score: 4 }
    ],
  },
  {
    id: 106,
    title: "Which trading instrument do you prefer?",
    options: [
      { text: "BTC/ETH spot", score: 1 },
      { text: "Mainstream value coin spot", score: 1 },
      { text: "Mainstream coin futures", score: 2 },
      { text: "Mainstream coin low-leverage futures", score: 2 },
      { text: "Altcoin leverage", score: 3 },
      { text: "Potential altcoin high-leverage futures", score: 3 },
      { text: "Cross-chain arbitrage pairs", score: 4 },
      { text: "Cross-platform arbitrage instruments", score: 4 }
    ],
  },
  {
    id: 107,
    title: "Facing 'wick manipulation', your response is?",
    options: [
      { text: "Stop loss and exit", score: 1 },
      { text: "Decisive stop loss to prevent deep losses", score: 1 },
      { text: "Hold and add positions", score: 2 },
      { text: "Add positions against trend to bet on rebound", score: 2 },
      { text: "Hedge and lock positions", score: 3 },
      { text: "Long-short lock to control risk", score: 3 },
      { text: "Quantitative bot auto-handles", score: 4 },
      { text: "Algorithmic strategy to handle wicks", score: 4 }
    ],
  },
  {
    id: 108,
    title: "How do you view 'liquidity depth'?",
    options: [
      { text: "Not much impact", score: 1 },
      { text: "Never paid attention", score: 1 },
      { text: "Must check before opening positions", score: 2 },
      { text: "Verify before large position opening", score: 2 },
      { text: "Core strategy indicator", score: 3 },
      { text: "Core reference for trading decisions", score: 3 },
      { text: "Arbitrage profit point", score: 4 },
      { text: "Core basis for low-risk arbitrage", score: 4 }
    ],
  },
  {
    id: 109,
    title: "What analysis tools do you commonly use?",
    options: [
      { text: "Candlestick charts", score: 1 },
      { text: "Basic market candlestick charts", score: 1 },
      { text: "Technical indicators", score: 2 },
      { text: "Multi-indicator combination analysis", score: 2 },
      { text: "On-chain data dashboards", score: 3 },
      { text: "Full-dimensional on-chain analysis", score: 3 },
      { text: "Quantitative backtesting platforms", score: 4 },
      { text: "Strategy modeling and backtesting tools", score: 4 }
    ],
  },
  {
    id: 110,
    title: "Which profit structure do you prefer?",
    options: [
      { text: "Long-term holding appreciation", score: 1 },
      { text: "Value coin long-term appreciation", score: 1 },
      { text: "Short-term swing profits", score: 2 },
      { text: "Futures short-term swing returns", score: 2 },
      { text: "Fee rebates", score: 3 },
      { text: "Market maker fee rebates", score: 3 },
      { text: "Stable arbitrage returns", score: 4 },
      { text: "Cross-market stable arbitrage returns", score: 4 }
    ],
  },
];

const createNewbieQuestions = () => [
  {
    id: 201,
    title: "If you were given a crypto seed, what would you hope it grows into?",
    options: [
      { text: "A slowly fruiting money tree", score: 1 },
      { text: "An evergreen pine tree", score: 1 },
      { text: "A dandelion drifting in the wind", score: 2 },
      { text: "Wildflowers blooming by the roadside", score: 2 },
      { text: "A fruit tree with hanging fruits", score: 3 },
      { text: "An instantly blooming firework", score: 3 },
      { text: "Bamboo that keeps climbing higher", score: 4 },
      { text: "Bubbles floating in the sky", score: 4 }
    ],
  },
  {
    id: 202,
    title: "Playing crypto games, which equipment would you choose?",
    options: [
      { text: "Heavy shield", score: 1 },
      { text: "Hard armor", score: 1 },
      { text: "Long-range bow", score: 2 },
      { text: "Precise crossbow", score: 2 },
      { text: "Sharp longsword", score: 3 },
      { text: "Deadly dagger", score: 3 },
      { text: "Invisibility cloak", score: 4 },
      { text: "Teleportation boots", score: 4 }
    ],
  },
  {
    id: 203,
    title: "Which pleasure do you care about more?",
    options: [
      { text: "The security of owning tokens", score: 1 },
      { text: "The peace of mind from hoarding coins waiting for gains", score: 1 },
      { text: "The achievement of buying low and selling high", score: 2 },
      { text: "The satisfaction of swing trading profits", score: 2 },
      { text: "The excitement of doubling profits", score: 3 },
      { text: "The thrill of high-leverage contracts", score: 3 },
      { text: "The small happiness of airdrop farming", score: 4 },
      { text: "The sense of gain from airdrop hunting", score: 4 }
    ],
  },
  {
    id: 204,
    title: "Seeing a hot Meme coin surge, you would?",
    options: [
      { text: "Absolutely won't touch it", score: 1 },
      { text: "Block related information", score: 1 },
      { text: "Try with small amount", score: 2 },
      { text: "Light position follow", score: 2 },
      { text: "Wait for pullback then buy", score: 3 },
      { text: "Buy in batches at low prices", score: 3 },
      { text: "Jump in immediately", score: 4 },
      { text: "Go all in and chase high", score: 4 }
    ],
  },
  {
    id: 205,
    title: "Where would you prefer to put your money?",
    options: [
      { text: "Stablecoin wallet", score: 1 },
      { text: "Cold wallet offline storage", score: 1 },
      { text: "Exchange current account", score: 2 },
      { text: "Platform savings account", score: 2 },
      { text: "Hot coin holdings", score: 3 },
      { text: "Potential Meme coin", score: 3 },
      { text: "High-yield pool", score: 4 },
      { text: "Liquidity mining pool", score: 4 }
    ],
  },
  {
    id: 206,
    title: "A friend recommends you play contracts, you would?",
    options: [
      { text: "Directly refuse", score: 1 },
      { text: "Clearly state you won't touch it", score: 1 },
      { text: "Learn knowledge first then play", score: 2 },
      { text: "Watch tutorials and do homework", score: 2 },
      { text: "Try with small capital", score: 3 },
      { text: "Test water with low leverage", score: 3 },
      { text: "Play with friend", score: 4 },
      { text: "Follow friend and go all in", score: 4 }
    ],
  },
  {
    id: 207,
    title: "What's your understanding of 'stop loss'?",
    options: [
      { text: "Cutting losses hurts too much", score: 1 },
      { text: "Absolutely won't stop loss", score: 1 },
      { text: "Don't know how to set", score: 2 },
      { text: "Don't know how to set it", score: 2 },
      { text: "Decide by mood", score: 3 },
      { text: "Set by feeling", score: 3 },
      { text: "Life-saving tool", score: 4 },
      { text: "Core of risk control", score: 4 }
    ],
  },
  {
    id: 208,
    title: "Which trading rhythm do you prefer?",
    options: [
      { text: "Buy and forget", score: 1 },
      { text: "Hold for more than half a year", score: 1 },
      { text: "Research and analyze yourself", score: 2 },
      { text: "Deep research and strategic positioning", score: 2 },
      { text: "Trade several times daily", score: 3 },
      { text: "Intraday short-term operations", score: 3 },
      { text: "Follow influencers", score: 4 },
      { text: "Copy influencer trades", score: 4 }
    ],
  },
  {
    id: 209,
    title: "Your holding coin has been flat for a month, you would?",
    options: [
      { text: "Continue holding", score: 1 },
      { text: "Firmly hold and wait for pump", score: 1 },
      { text: "Add more to average down", score: 2 },
      { text: "DCA to lower average cost", score: 2 },
      { text: "Convert to stablecoins", score: 3 },
      { text: "Switch to current account and wait for opportunity", score: 3 },
      { text: "Sell and switch to hot coins", score: 4 },
      { text: "Liquidate and chase Meme coins", score: 4 }
    ],
  },
  {
    id: 210,
    title: "What do you think 'risk' is?",
    options: [
      { text: "Losing principal to zero", score: 1 },
      { text: "Losing everything", score: 1 },
      { text: "Losing money", score: 2 },
      { text: "Small losses", score: 2 },
      { text: "Getting trapped", score: 3 },
      { text: "Long-term being trapped", score: 3 },
      { text: "Missing doubles", score: 4 },
      { text: "Missing big market moves", score: 4 }
    ],
  },
];

const createVeteranRound3Questions = () => [
  {
    id: 301,
    title: "Trading contracts is like racing—which speed would you choose?",
    options: [
      { text: "50x sonic boom speed", score: 1 },
      { text: "30x extreme speed sprint", score: 1 },
      { text: "10x safe cruising", score: 2 },
      { text: "8x steady speed driving", score: 2 },
      { text: "3x low-speed cruising", score: 3 },
      { text: "5x light speed commuting", score: 3 },
      { text: "Dynamically adjust speed", score: 4 },
      { text: "Flexibly change speed based on road conditions", score: 4 }
    ],
  },
  {
    id: 402,
    title: "Contract floating loss 10% (vehicle out of control), you would?",
    options: [
      { text: "Step on gas and hold, add positions", score: 1 },
      { text: "Go all in and add positions to bet on rebound", score: 1 },
      { text: "Jump out and stop loss to escape", score: 2 },
      { text: "Decisively liquidate to avoid deep losses", score: 2 },
      { text: "Brake and reduce positions, wait and see", score: 3 },
      { text: "Reduce positions by half and wait for stabilization", score: 3 },
      { text: "Lock positions and hedge risks", score: 4 },
      { text: "Long-short lock to control losses", score: 4 }
    ],
  },
  {
    id: 403,
    title: "Which trading race do you prefer?",
    options: [
      { text: "100m sprint intraday ultra-short", score: 1 },
      { text: "Short track speed skating ultra-short", score: 1 },
      { text: "Relay race swing trading", score: 2 },
      { text: "Middle distance running swing", score: 2 },
      { text: "Marathon trend long-term", score: 3 },
      { text: "Long distance running to hold trend", score: 3 },
      { text: "Obstacle course hedging arbitrage", score: 4 },
      { text: "Composite strategy arbitrage", score: 4 }
    ],
  },
  {
    id: 404,
    title: "What's your attitude toward 'margin ratio'?",
    options: [
      { text: "The lower the better", score: 1 },
      { text: "Press to minimum to bet on returns", score: 1 },
      { text: "Maintain safety line", score: 2 },
      { text: "Keep minimum safety ratio", score: 2 },
      { text: "Dynamic adjustment", score: 3 },
      { text: "Adjust margin based on market conditions", score: 3 },
      { text: "Automated monitoring", score: 4 },
      { text: "Intelligent early warning and ratio adjustment", score: 4 }
    ],
  },
  {
    id: 405,
    title: "What contract strategy do you commonly use?",
    options: [
      { text: "Naked long/short one-way", score: 1 },
      { text: "Full position one-way bet on direction", score: 1 },
      { text: "Grid trading", score: 2 },
      { text: "Range grid for swing trading", score: 2 },
      { text: "Calendar spread arbitrage", score: 3 },
      { text: "Cross-contract spread arbitrage", score: 3 },
      { text: "Delta Neutral neutral", score: 4 },
      { text: "Long-short hedging neutral strategy", score: 4 }
    ],
  },
  {
    id: 406,
    title: "How do you set 'take-profit and stop-loss'?",
    options: [
      { text: "Set by feeling", score: 1 },
      { text: "Set points by intuition", score: 1 },
      { text: "Fixed ratio setting", score: 2 },
      { text: "Set by fixed profit-loss ratio", score: 2 },
      { text: "Dynamically adjust based on market", score: 3 },
      { text: "Adjust stop-profit-loss with trend", score: 3 },
      { text: "Quantitative strategy auto-execute", score: 4 },
      { text: "Algorithm model intelligent point setting", score: 4 }
    ],
  },
  {
    id: 407,
    title: "Which contract indicator do you focus on more?",
    options: [
      { text: "Price rise and fall", score: 1 },
      { text: "Real-time price volatility", score: 1 },
      { text: "Funding rate", score: 2 },
      { text: "Long-short funding rate difference", score: 2 },
      { text: "Open interest changes", score: 3 },
      { text: "Long-short open interest increase/decrease", score: 3 },
      { text: "OI position structure", score: 4 },
      { text: "Full-dimensional OI distribution", score: 4 }
    ],
  },
  {
    id: 408,
    title: "Facing 'contract liquidation', you would?",
    options: [
      { text: "Immediately deposit and fight again", score: 1 },
      { text: "Add funds immediately and go all in", score: 1 },
      { text: "Switch to lower leverage", score: 2 },
      { text: "Reduce leverage and try again", score: 2 },
      { text: "Pause trading and rest", score: 3 },
      { text: "Stop trading and calmly review", score: 3 },
      { text: "Reflect and adjust strategy", score: 4 },
      { text: "Optimize strategy and re-enter", score: 4 }
    ],
  },
  {
    id: 409,
    title: "Which opening timing do you prefer?",
    options: [
      { text: "Chase when trend starts", score: 1 },
      { text: "Chase up and kill down for short-term", score: 1 },
      { text: "Ambush at key levels", score: 2 },
      { text: "Position at support/resistance levels", score: 2 },
      { text: "Position before data release", score: 3 },
      { text: "Pre-position before good/bad news", score: 3 },
      { text: "Triggered by quantitative signals", score: 4 },
      { text: "Automatic opening by algorithm signals", score: 4 }
    ],
  },
  {
    id: 410,
    title: "What's your understanding of 'hedge trading'?",
    options: [
      { text: "Not necessary", score: 1 },
      { text: "Think hedging is meaningless", score: 1 },
      { text: "Use occasionally", score: 2 },
      { text: "Only use in extreme market conditions", score: 2 },
      { text: "Common strategy", score: 3 },
      { text: "Must use in daily trading", score: 3 },
      { text: "Core profit method", score: 4 },
      { text: "Institutional-level core profit method", score: 4 }
    ],
  },
  {
    id: 411,
    title: "How do you handle 'profit adding positions'?",
    options: [
      { text: "Go all in at once", score: 1 },
      { text: "Full position add to maximize returns", score: 1 },
      { text: "No adding, only take profit", score: 2 },
      { text: "Take profit and secure gains", score: 2 },
      { text: "Add positions in batches", score: 3 },
      { text: "Add gradually in tiers", score: 3 },
      { text: "Add positions with profit portion", score: 4 },
      { text: "Use profits to roll and add positions", score: 4 }
    ],
  },
  {
    id: 412,
    title: "Which analysis method do you rely on more?",
    options: [
      { text: "News and sentiment", score: 1 },
      { text: "Market rumors", score: 1 },
      { text: "Technical indicators", score: 2 },
      { text: "Multi-indicator combination analysis", score: 2 },
      { text: "On-chain funds", score: 3 },
      { text: "On-chain fund flow analysis", score: 3 },
      { text: "Quantitative models", score: 4 },
      { text: "Algorithm quantitative backtesting models", score: 4 }
    ],
  },
];

const createNewbieRound3Questions = () => [
  {
    id: 401,
    title: "Which type of gardener are you when managing assets?",
    options: [
      { text: "Plant and forget, wait passively", score: 1 },
      { text: "Sow seeds and wait for harvest", score: 1 },
      { text: "Water daily and watch growth", score: 2 },
      { text: "Observe morning and evening, monitor changes", score: 2 },
      { text: "Regularly prune branches", score: 3 },
      { text: "Manage as needed to control positions", score: 3 },
      { text: "Change varieties by season", score: 4 },
      { text: "Adjust positions and switch tracks opportunistically", score: 4 }
    ],
  },
  {
    id: 402,
    title: "Your holding coin drops 10%, you would?",
    options: [
      { text: "Wait and see, no action", score: 1 },
      { text: "Lie flat and ignore volatility", score: 1 },
      { text: "Cut bad branches and stop loss", score: 2 },
      { text: "Decisively cut losses and exit", score: 2 },
      { text: "Fertilize and add positions to average down", score: 3 },
      { text: "Buy in batches at low prices to lower average", score: 3 },
      { text: "Switch to stronger coins", score: 4 },
      { text: "Adjust positions and switch to hot tracks", score: 4 }
    ],
  },
  {
    id: 403,
    title: "Which 'asset store' do you prefer?",
    options: [
      { text: "Busy Meme market", score: 1 },
      { text: "Trendy niche coin market", score: 1 },
      { text: "Convenient stablecoin supermarket", score: 2 },
      { text: "Low-risk financial convenience store", score: 2 },
      { text: "Professional blue-chip gallery", score: 3 },
      { text: "High-end mainstream coin exhibition hall", score: 3 },
      { text: "Quiet value antique shop", score: 4 },
      { text: "Deep fundamental collection shop", score: 4 }
    ],
  },
  {
    id: 404,
    title: "What's your attitude toward 'DCA (Dollar Cost Averaging)'?",
    options: [
      { text: "Too troublesome, won't participate", score: 1 },
      { text: "Think it's unnecessary and give up", score: 1 },
      { text: "Try with small amount", score: 2 },
      { text: "Light position participation to test", score: 2 },
      { text: "Main investment method", score: 3 },
      { text: "Core asset DCA", score: 3 },
      { text: "Combine with grid strategy", score: 4 },
      { text: "DCA + swing trading combination", score: 4 }
    ],
  },
  {
    id: 405,
    title: "How do you handle 'profit taking'?",
    options: [
      { text: "Sell when earn a little", score: 1 },
      { text: "Take small profits and secure gains", score: 1 },
      { text: "Sell when reach target", score: 2 },
      { text: "Take profit and exit according to plan", score: 2 },
      { text: "Consider only when double", score: 3 },
      { text: "Sell when reach expectations", score: 3 },
      { text: "Never sell, just accumulate", score: 4 },
      { text: "Long-term hold without taking profit", score: 4 }
    ],
  },
  {
    id: 406,
    title: "Which project dimension do you focus on more?",
    options: [
      { text: "Community popularity", score: 1 },
      { text: "Market sentiment atmosphere", score: 1 },
      { text: "Price trend", score: 2 },
      { text: "K-line volatility trend", score: 2 },
      { text: "Team background", score: 3 },
      { text: "Project team qualifications", score: 3 },
      { text: "Technical implementation", score: 4 },
      { text: "Fundamental implementation progress", score: 4 }
    ],
  },
  {
    id: 407,
    title: "What's your view on 'airdrops'?",
    options: [
      { text: "Must participate for farming", score: 1 },
      { text: "Sign up for all airdrops", score: 1 },
      { text: "Decide based on project quality", score: 2 },
      { text: "Screen and participate in quality projects", score: 2 },
      { text: "Supplementary income for DCA", score: 3 },
      { text: "Farming to increase holding returns", score: 3 },
      { text: "Too lazy to do", score: 4 },
      { text: "Ignore all airdrop information", score: 4 }
    ],
  },
  {
    id: 408,
    title: "Your holding coin releases bad news, you would?",
    options: [
      { text: "Ignore the news", score: 1 },
      { text: "Firmly hold without action", score: 1 },
      { text: "Sell immediately to avoid risk", score: 2 },
      { text: "Decisively liquidate to prevent risk", score: 2 },
      { text: "Analyze if bad news is real", score: 3 },
      { text: "Verify news before making decision", score: 3 },
      { text: "Add positions and buy the dip", score: 4 },
      { text: "Buy in batches at low prices to bet on rebound", score: 4 }
    ],
  },
  {
    id: 409,
    title: "Which asset allocation ratio do you prefer?",
    options: [
      { text: "Single coin heavy position", score: 1 },
      { text: "Full position in single coin for favored track", score: 1 },
      { text: "Stablecoins account for half", score: 2 },
      { text: "Half position in stablecoins for defense", score: 2 },
      { text: "Multiple coins diversified", score: 3 },
      { text: "Cross-track diversified holdings", score: 3 },
      { text: "Mainstream coins mainly", score: 4 },
      { text: "Core allocation in mainstream value coins", score: 4 }
    ],
  },
  {
    id: 410,
    title: "What's your attitude toward 'cross-chain transfers'?",
    options: [
      { text: "Fees too expensive, won't transfer", score: 1 },
      { text: "Too troublesome, never cross-chain", score: 1 },
      { text: "Transfer only when necessary", score: 2 },
      { text: "Operate only in essential scenarios", score: 2 },
      { text: "Transfer for higher returns", score: 3 },
      { text: "Actively cross-chain to chase high returns", score: 3 },
      { text: "Frequently cross-chain arbitrage", score: 4 },
      { text: "Cross-chain arbitrage to earn spreads", score: 4 }
    ],
  },
  {
    id: 411,
    title: "How do you view 'staking mining'?",
    options: [
      { text: "Afraid of lock-up, won't participate", score: 1 },
      { text: "Worried about risk and give up", score: 1 },
      { text: "Try with small amount", score: 2 },
      { text: "Light position trial experience", score: 2 },
      { text: "Combine with accumulation strategy", score: 3 },
      { text: "Stake while accumulating to earn interest", score: 3 },
      { text: "Main income source", score: 4 },
      { text: "Heavy position staking to earn returns", score: 4 }
    ],
  },
  {
    id: 412,
    title: "Which holding period do you prefer?",
    options: [
      { text: "Days to weeks", score: 1 },
      { text: "Intraday short-term to swing", score: 1 },
      { text: "Months to a year", score: 2 },
      { text: "Medium-term holding for trend", score: 2 },
      { text: "More than a year", score: 3 },
      { text: "Long-term hold for value", score: 3 },
      { text: "Long-term hold, don't watch time", score: 4 },
      { text: "Passive holding without time cycle", score: 4 }
    ],
  },
];

const createVeteranRound4Questions = () => [
  {
    id: 501,
    title: "What's your attitude toward 'funding rate arbitrage'?",
    options: [
      { text: "Main profit method", score: 1 },
      { text: "Core arbitrage income source", score: 1 },
      { text: "Supplementary income source", score: 2 },
      { text: "Complementary arbitrage income", score: 2 },
      { text: "Participate occasionally", score: 3 },
      { text: "Participate when market conditions are suitable", score: 3 },
      { text: "Not interested", score: 4 },
      { text: "Completely avoid this strategy", score: 4 }
    ],
  },
  {
    id: 502,
    title: "Two trading opportunities, which one would you choose?",
    options: [
      { text: "Perpetual contract 50x leverage one-way", score: 1 },
      { text: "Perpetual contract 30x leverage one-way", score: 1 },
      { text: "Calendar spread arbitrage 20% APY", score: 2 },
      { text: "Cross-market arbitrage 18% APY", score: 2 },
      { text: "Delta Neutral neutral 15% APY", score: 3 },
      { text: "Long-short neutral strategy 12% APY", score: 3 },
      { text: "Spot DCA 10% APY", score: 4 },
      { text: "Value coin spot DCA 8% APY", score: 4 }
    ],
  },
  {
    id: 503,
    title: "Late night watching the market, what worries you more?",
    options: [
      { text: "Funding rate sudden change", score: 1 },
      { text: "Long-short funding rate severe inversion", score: 1 },
      { text: "Exchange wick manipulation liquidation", score: 2 },
      { text: "Extreme market wick sweep stop loss", score: 2 },
      { text: "Black swan event", score: 3 },
      { text: "Industry systemic black swan", score: 3 },
      { text: "On-chain contract vulnerability", score: 4 },
      { text: "DeFi contract security vulnerability", score: 4 }
    ],
  },
  {
    id: 504,
    title: "What's the 'maximum drawdown' you can accept?",
    options: [
      { text: "More than 50%", score: 1 },
      { text: "Drawdown 50%-80%", score: 1 },
      { text: "30%-50%", score: 2 },
      { text: "Drawdown 30%-49%", score: 2 },
      { text: "10%-30%", score: 3 },
      { text: "Drawdown 10%-29%", score: 3 },
      { text: "Within 10%", score: 4 },
      { text: "Drawdown within 5%", score: 4 }
    ],
  },
  {
    id: 505,
    title: "Which 'profit structure' do you prefer?",
    options: [
      { text: "High volatility high returns", score: 1 },
      { text: "Extreme volatility for ultra-high returns", score: 1 },
      { text: "Stable compound returns", score: 2 },
      { text: "Long-term compound appreciation returns", score: 2 },
      { text: "Fee rebate returns", score: 3 },
      { text: "Market maker fee sharing", score: 3 },
      { text: "Arbitrage spread returns", score: 4 },
      { text: "Cross-period cross-chain spread arbitrage", score: 4 }
    ],
  },
  {
    id: 506,
    title: "What's your core requirement for 'vault strategy'?",
    options: [
      { text: "Maximize returns", score: 1 },
      { text: "Pursue maximum return ceiling", score: 1 },
      { text: "Controllable risk", score: 2 },
      { text: "Returns match risks", score: 2 },
      { text: "Strategy transparency", score: 3 },
      { text: "Full transparency of underlying strategy", score: 3 },
      { text: "High liquidity", score: 4 },
      { text: "Deposit and withdraw anytime with high flexibility", score: 4 }
    ],
  },
  {
    id: 507,
    title: "Facing 'new vault launch', you would?",
    options: [
      { text: "Jump in blindly for high returns", score: 1 },
      { text: "Full position participate in high-yield new vault", score: 1 },
      { text: "Check strategy historical backtest", score: 2 },
      { text: "Deep analysis of backtest data", score: 2 },
      { text: "Try with small amount", score: 3 },
      { text: "Light position participation to test", score: 3 },
      { text: "Wait for market validation", score: 4 },
      { text: "Wait for long-term market validation", score: 4 }
    ],
  },
  {
    id: 508,
    title: "How do you view 'leverage stacking'?",
    options: [
      { text: "The higher the better", score: 1 },
      { text: "Extreme stacking for high returns", score: 1 },
      { text: "Stack within reasonable range", score: 2 },
      { text: "Stack according to strategy adaptation", score: 2 },
      { text: "Single leverage only", score: 3 },
      { text: "Single-tier leverage operation", score: 3 },
      { text: "Don't use leverage", score: 4 },
      { text: "Zero leverage risk-free operation", score: 4 }
    ],
  },
  {
    id: 509,
    title: "What's your acceptance of 'vault management fees'?",
    options: [
      { text: "High fees high returns acceptable", score: 1 },
      { text: "Ultra-high fees for ultra-high returns", score: 1 },
      { text: "Low fees medium returns", score: 2 },
      { text: "Low fees match medium returns", score: 2 },
      { text: "No fees low returns", score: 3 },
      { text: "Zero fees accept low returns", score: 3 },
      { text: "Profit sharing model", score: 4 },
      { text: "Profit-sharing model after gains", score: 4 }
    ],
  },
  {
    id: 510,
    title: "Which vault indicator do you focus on more?",
    options: [
      { text: "Historical maximum returns", score: 1 },
      { text: "Historical peak return data", score: 1 },
      { text: "Sharpe ratio", score: 2 },
      { text: "Risk-adjusted Sharpe ratio", score: 2 },
      { text: "Drawdown rate", score: 3 },
      { text: "Historical maximum drawdown data", score: 3 },
      { text: "Fund size", score: 4 },
      { text: "Vault managed fund volume", score: 4 }
    ],
  },
  {
    id: 511,
    title: "What's your risk perception of 'liquidity mining'?",
    options: [
      { text: "Main risk is impermanent loss", score: 1 },
      { text: "Core risk is trading pair impermanent loss", score: 1 },
      { text: "Smart contract risk", score: 2 },
      { text: "Core risk is contract security vulnerability", score: 2 },
      { text: "Market volatility risk", score: 3 },
      { text: "Core risk is significant market volatility", score: 3 },
      { text: "Regulatory risk", score: 4 },
      { text: "Core risk is industry policy regulation", score: 4 }
    ],
  },
  {
    id: 512,
    title: "Which 'vault type' are you more willing to participate in?",
    options: [
      { text: "One-way long/short vault", score: 1 },
      { text: "Extreme one-way directional vault", score: 1 },
      { text: "Arbitrage strategy vault", score: 2 },
      { text: "Cross-period cross-chain arbitrage vault", score: 2 },
      { text: "Hedging vault", score: 3 },
      { text: "Long-short hedging vault", score: 3 },
      { text: "DCA accumulation vault", score: 4 },
      { text: "Value coin long-term DCA vault", score: 4 }
    ],
  },
];

const createNewbieRound4Questions = () => [
  {
    id: 601,
    title: "What's your ultimate goal in the crypto market?",
    options: [
      { text: "Don't want to work, achieve financial freedom", score: 1 },
      { text: "Achieve wealth freedom through trading", score: 1 },
      { text: "Earn some pocket money to buy toys", score: 2 },
      { text: "Earn side income to supplement life", score: 2 },
      { text: "Prove I'm smarter than others", score: 3 },
      { text: "Prove ability through profitable strategies", score: 3 },
      { text: "Follow the trend, don't lose money", score: 4 },
      { text: "Passive participation, not losing is winning", score: 4 }
    ],
  },
  {
    id: 602,
    title: "Two buttons, which one would you press?",
    options: [
      { text: "Red: 50% double / 50% zero", score: 1 },
      { text: "Purple: 70% up 50% / 30% zero", score: 1 },
      { text: "Green: 80% earn 5% / 20% lose 2%", score: 2 },
      { text: "Yellow: 90% earn 3% / 10% lose 1%", score: 2 },
      { text: "Blue: 100% earn 10%", score: 3 },
      { text: "Orange: 100% earn 8% stable income", score: 3 },
      { text: "Don't press", score: 4 },
      { text: "Give up all choices and don't participate", score: 4 }
    ],
  },
  {
    id: 603,
    title: "Late night checking holdings, what scares you more?",
    options: [
      { text: "Miss doubling", score: 1 },
      { text: "Miss big market moves and lose returns", score: 1 },
      { text: "Assets go to zero", score: 2 },
      { text: "Lose all principal and everything", score: 2 },
      { text: "Get trapped", score: 3 },
      { text: "Long-term trapped unable to exit", score: 3 },
      { text: "Can't withdraw", score: 4 },
      { text: "Assets cannot be withdrawn with security risks", score: 4 }
    ],
  },
  {
    id: 604,
    title: "What's the maximum loss you can accept?",
    options: [
      { text: "Lose all principal", score: 1 },
      { text: "Lose more than 80%", score: 1 },
      { text: "Lose 50%", score: 2 },
      { text: "Lose 40%-60%", score: 2 },
      { text: "Lose 20%", score: 3 },
      { text: "Lose 15%-25%", score: 3 },
      { text: "Lose within 10%", score: 4 },
      { text: "Lose within 5%", score: 4 }
    ],
  },
  {
    id: 605,
    title: "What's your desired investment return cycle?",
    options: [
      { text: "Within a day", score: 1 },
      { text: "Intraday ultra-short profit", score: 1 },
      { text: "Within a week", score: 2 },
      { text: "Weekly swing profit", score: 2 },
      { text: "Within a month", score: 3 },
      { text: "Monthly medium-term returns", score: 3 },
      { text: "Within a year", score: 4 },
      { text: "Annual long-term appreciation", score: 4 }
    ],
  },
  {
    id: 606,
    title: "What's your definition of 'high returns'?",
    options: [
      { text: "Monthly return 100%+", score: 1 },
      { text: "Monthly return double or more", score: 1 },
      { text: "Monthly return 50%-100%", score: 2 },
      { text: "Monthly return 50%-99%", score: 2 },
      { text: "Monthly return 10%-50%", score: 3 },
      { text: "Monthly return 10%-49%", score: 3 },
      { text: "Monthly return 5%-10%", score: 4 },
      { text: "Monthly return 5%-9%", score: 4 }
    ],
  },
  {
    id: 607,
    title: "Which type of team are you more willing to invest in?",
    options: [
      { text: "High popularity Meme team", score: 1 },
      { text: "High community popularity niche Meme team", score: 1 },
      { text: "Well-backed capital team", score: 2 },
      { text: "Team backed by well-known capital", score: 2 },
      { text: "Strong technical development team", score: 3 },
      { text: "Development team with solid core technology", score: 3 },
      { text: "Large community operations team", score: 4 },
      { text: "Team with mature community operations", score: 4 }
    ],
  },
  {
    id: 608,
    title: "How do you view 'losses'?",
    options: [
      { text: "Add positions when lose to break even", score: 1 },
      { text: "Immediately add positions to average down and break even", score: 1 },
      { text: "Cannot accept", score: 2 },
      { text: "Cannot tolerate any loss", score: 2 },
      { text: "Small losses acceptable", score: 3 },
      { text: "Can calmly face small losses", score: 3 },
      { text: "Losses are part of trading", score: 4 },
      { text: "Rationally view losses as trading costs", score: 4 }
    ],
  },
];

const createVeteranRound5Questions = () => [
  {
    id: 701,
    title: "If your trading career were made into a movie, it would be?",
    options: [
      { text: "Thriller (arbitrage setup)", score: 1 },
      { text: "Brain-burning spy film (calendar spread arbitrage)", score: 1 },
      { text: "War film (long-short battle)", score: 2 },
      { text: "Epic war film (contract gambling)", score: 2 },
      { text: "Documentary (value investment)", score: 3 },
      { text: "Realistic documentary (long-term value)", score: 3 },
      { text: "Sci-fi (quantitative algorithms)", score: 4 },
      { text: "Future tech film (intelligent algorithms)", score: 4 }
    ],
  },
  {
    id: 702,
    title: "What's the key to surviving in the crypto market?",
    options: [
      { text: "Risk control system", score: 1 },
      { text: "Full-dimensional risk control system", score: 1 },
      { text: "Strategy iteration", score: 2 },
      { text: "Dynamic strategy iteration", score: 2 },
      { text: "Information advantage", score: 3 },
      { text: "Precisely capture information advantage", score: 3 },
      { text: "Capital management", score: 4 },
      { text: "Institutional-level capital management", score: 4 }
    ],
  },
  {
    id: 703,
    title: "What does your trading style resemble?",
    options: [
      { text: "Sniper (swing ambush)", score: 1 },
      { text: "Precise sniper (point ambush)", score: 1 },
      { text: "General (macro positioning)", score: 2 },
      { text: "Strategic general (global positioning)", score: 2 },
      { text: "Engineer (quantitative strategy)", score: 3 },
      { text: "Algorithm engineer (model building)", score: 3 },
      { text: "Merchant (arbitrage low risk)", score: 4 },
      { text: "Shrewd merchant (cross-market arbitrage)", score: 4 }
    ],
  },
  {
    id: 704,
    title: "Facing 'black swan events', you would?",
    options: [
      { text: "Stop loss and exit, wait and see", score: 1 },
      { text: "Decisively stop loss to avoid risk", score: 1 },
      { text: "Hedge risks and preserve capital", score: 2 },
      { text: "Long-short hedge to lock positions", score: 2 },
      { text: "Add positions against trend, buy the dip", score: 3 },
      { text: "Buy in batches at low prices to bottom fish", score: 3 },
      { text: "Quantitative strategy auto-responds", score: 4 },
      { text: "Algorithm model intelligent handling", score: 4 }
    ],
  },
  {
    id: 705,
    title: "What's your attitude toward 'strategy backtesting'?",
    options: [
      { text: "Must do before trading", score: 1 },
      { text: "Deep backtest for every strategy", score: 1 },
      { text: "Do occasionally", score: 2 },
      { text: "Backtest only when market changes", score: 2 },
      { text: "Not necessary", score: 3 },
      { text: "Think backtesting is meaningless", score: 3 },
      { text: "Continuously optimize backtesting", score: 4 },
      { text: "Iterate strategies and continuously backtest", score: 4 }
    ],
  },
  {
    id: 706,
    title: "Which 'decision basis' do you rely on more?",
    options: [
      { text: "Technical analysis", score: 1 },
      { text: "Multi-indicator technical analysis", score: 1 },
      { text: "On-chain data", score: 2 },
      { text: "Full-dimensional on-chain data", score: 2 },
      { text: "Macro economy", score: 3 },
      { text: "Global macroeconomic analysis", score: 3 },
      { text: "Quantitative models", score: 4 },
      { text: "Intelligent quantitative models", score: 4 }
    ],
  },
  {
    id: 707,
    title: "What's your understanding of 'capital management'?",
    options: [
      { text: "Position control", score: 1 },
      { text: "Dynamic precise position control", score: 1 },
      { text: "Risk diversification", score: 2 },
      { text: "Cross-track risk diversification", score: 2 },
      { text: "Leverage adjustment", score: 3 },
      { text: "Adjust leverage with market conditions", score: 3 },
      { text: "Strategy allocation", score: 4 },
      { text: "Multi-strategy capital allocation", score: 4 }
    ],
  },
  {
    id: 708,
    title: "What do you think is the core of trading?",
    options: [
      { text: "Predict market", score: 1 },
      { text: "Precisely predict market trends", score: 1 },
      { text: "Respond to market", score: 2 },
      { text: "Dynamically respond to market changes", score: 2 },
      { text: "Follow trend", score: 3 },
      { text: "Go with the flow and follow trends", score: 3 },
      { text: "Create returns", score: 4 },
      { text: "Arbitrage strategies to create returns", score: 4 }
    ],
  },
  {
    id: 709,
    title: "How do you view 'high-frequency trading'?",
    options: [
      { text: "Main profit method", score: 1 },
      { text: "High-frequency trading core profit", score: 1 },
      { text: "Supplementary income", score: 2 },
      { text: "High-frequency trading supplementary income", score: 2 },
      { text: "Not suitable for me", score: 3 },
      { text: "Style doesn't match, won't participate", score: 3 },
      { text: "Retail traders can't participate", score: 4 },
      { text: "Think retail traders have no advantage", score: 4 }
    ],
  },
  {
    id: 710,
    title: "What's your attitude toward 'DAO governance'?",
    options: [
      { text: "Actively participate in voting", score: 1 },
      { text: "Vote on all proposals", score: 1 },
      { text: "Follow governance proposals", score: 2 },
      { text: "Deeply focus on key proposals", score: 2 },
      { text: "Not interested", score: 3 },
      { text: "Completely ignore governance", score: 3 },
      { text: "Governance arbitrage", score: 4 },
      { text: "Participate in governance arbitrage returns", score: 4 }
    ],
  },
  {
    id: 711,
    title: "Do you prefer 'active trading' or 'passive allocation'?",
    options: [
      { text: "Active high-frequency trading", score: 1 },
      { text: "Intraday extreme high-frequency trading", score: 1 },
      { text: "Active swing trading", score: 2 },
      { text: "Medium-short cycle swing trading", score: 2 },
      { text: "Passive index allocation", score: 3 },
      { text: "Mainstream coin index allocation", score: 3 },
      { text: "Passive strategy following", score: 4 },
      { text: "Professional strategy one-click following", score: 4 }
    ],
  },
  {
    id: 712,
    title: "What do you think is the highest realm of trading?",
    options: [
      { text: "Unity of knowledge and action", score: 1 },
      { text: "High unity of trading knowledge and action", score: 1 },
      { text: "Peaceful mindset", score: 2 },
      { text: "Ignore volatility with peaceful mindset", score: 2 },
      { text: "Invincible strategy", score: 3 },
      { text: "Quantitative strategy ultimate invincibility", score: 3 },
      { text: "Simplicity is the ultimate sophistication", score: 4 },
      { text: "Value investment simplicity is the ultimate sophistication", score: 4 }
    ],
  },
];

const createNewbieRound5Questions = () => [
  {
    id: 801,
    title: "If your trading career were made into a movie, it would be?",
    options: [
      { text: "Thriller", score: 1 },
      { text: "Suspense thriller with twists", score: 1 },
      { text: "Action film", score: 2 },
      { text: "High-speed action film", score: 2 },
      { text: "Documentary", score: 3 },
      { text: "Realistic documentary", score: 3 },
      { text: "Comedy", score: 4 },
      { text: "Light-hearted comedy", score: 4 }
    ],
  },
  {
    id: 802,
    title: "What's the key to surviving in the crypto market?",
    options: [
      { text: "Luck", score: 1 },
      { text: "Extreme luck", score: 1 },
      { text: "Courage", score: 2 },
      { text: "All-or-nothing courage", score: 2 },
      { text: "Patience", score: 3 },
      { text: "Patience for long-term holding", score: 3 },
      { text: "Well-informed", score: 4 },
      { text: "Timely capture of information", score: 4 }
    ],
  },
  {
    id: 803,
    title: "What does your trading style resemble?",
    options: [
      { text: "Brave warrior", score: 1 },
      { text: "Warrior charging into battle", score: 1 },
      { text: "Cautious hunter", score: 2 },
      { text: "Precise ambush hunter", score: 2 },
      { text: "Passive hermit", score: 3 },
      { text: "Hermit holding coins in seclusion", score: 3 },
      { text: "Following commoner", score: 4 },
      { text: "Commoner going with the flow", score: 4 }
    ],
  },
  {
    id: 804,
    title: "Your holding coin doubles, you would?",
    options: [
      { text: "Sell immediately to show off", score: 1 },
      { text: "Liquidate and cash out to show off", score: 1 },
      { text: "Add positions and continue holding", score: 2 },
      { text: "Full position add and chase the pump", score: 2 },
      { text: "Partial profit taking", score: 3 },
      { text: "Take profit in batches and keep positions", score: 3 },
      { text: "Forget about it", score: 4 },
      { text: "Passive holding and ignore", score: 4 }
    ],
  },
  {
    id: 805,
    title: "What's your attitude toward 'insider information'?",
    options: [
      { text: "Fully believe", score: 1 },
      { text: "Believe completely and execute", score: 1 },
      { text: "Half-believe", score: 2 },
      { text: "Hesitate then try with light position", score: 2 },
      { text: "For reference only", score: 3 },
      { text: "Reference then make independent judgment", score: 3 },
      { text: "Disdainful", score: 4 },
      { text: "Completely ignore and don't look", score: 4 }
    ],
  },
  {
    id: 806,
    title: "Which type of person are you more willing to communicate with?",
    options: [
      { text: "Big V influencers", score: 1 },
      { text: "Top influencer big Vs", score: 1 },
      { text: "Same-level beginners", score: 2 },
      { text: "Same-age same-frequency beginners", score: 2 },
      { text: "Veteran traders", score: 3 },
      { text: "Practical veteran traders", score: 3 },
      { text: "Don't communicate, play alone", score: 4 },
      { text: "Research alone without socializing", score: 4 }
    ],
  },
  {
    id: 807,
    title: "What's your execution level of 'stop loss'?",
    options: [
      { text: "Firmly execute", score: 1 },
      { text: "Strictly execute at set points", score: 1 },
      { text: "Occasionally hesitate", score: 2 },
      { text: "Hesitate then passively execute", score: 2 },
      { text: "Can't bear to cut losses", score: 3 },
      { text: "Hesitate then give up stop loss", score: 3 },
      { text: "Never stop loss", score: 4 },
      { text: "Hold firm and refuse to stop loss", score: 4 }
    ],
  },
  {
    id: 808,
    title: "What do you think is the most important quality in trading?",
    options: [
      { text: "Decisiveness", score: 1 },
      { text: "Ruthless decisiveness", score: 1 },
      { text: "Patience", score: 2 },
      { text: "Long-term patience", score: 2 },
      { text: "Greed", score: 3 },
      { text: "Reasonable control of greed", score: 3 },
      { text: "Fear", score: 4 },
      { text: "Moderate fear", score: 4 }
    ],
  },
  {
    id: 809,
    title: "How do you view 'high-frequency trading'?",
    options: [
      { text: "Main profit method", score: 1 },
      { text: "Supplementary income", score: 2 },
      { text: "Not suitable for me", score: 3 },
      { text: "Retail traders can't participate", score: 4 }
    ],
  },
  {
    id: 810,
    title: "What's your attitude toward 'DAO governance'?",
    options: [
      { text: "Actively participate in voting", score: 1 },
      { text: "Follow governance proposals", score: 2 },
      { text: "Not interested", score: 3 },
      { text: "Governance arbitrage", score: 4 }
    ],
  },
  {
    id: 811,
    title: "Do you prefer 'active trading' or 'passive allocation'?",
    options: [
      { text: "Active high-frequency trading", score: 1 },
      { text: "Active swing trading", score: 2 },
      { text: "Passive index allocation", score: 3 },
      { text: "Passive strategy following", score: 4 }
    ],
  },
  {
    id: 812,
    title: "What do you think is the highest realm of trading?",
    options: [
      { text: "Unity of knowledge and action", score: 1 },
      { text: "Peaceful mindset", score: 2 },
      { text: "Invincible strategy", score: 3 },
      { text: "Simplicity is the ultimate sophistication", score: 4 }
    ],
  },
];

// 计算当前轮次的分数
const calculateRoundScore = (questions, answers) => {
  return questions.reduce((totalScore, question) => {
    const answer = answers.find(a => a.questionId === question.id);
    if (answer && question.options[answer.selectedIndex]) {
      return totalScore + question.options[answer.selectedIndex].score;
    }
    return totalScore;
  }, 0);
};

// 打乱数组函数
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// 随机选择5道题（不重复），并打乱每道题的选项
const getRandomQuestions = (allQuestions, count = 5) => {
  const shuffled = shuffleArray(allQuestions);
  const selectedQuestions = shuffled.slice(0, count);
  // 对每道题的选项进行打乱
  return selectedQuestions.map(question => ({
    ...question,
    options: shuffleArray(question.options)
  }));
};

export default function App() {
  const allQuestions = useMemo(() => createQuestions(), []);
  const veteranQuestions = useMemo(() => createVeteranQuestions(), []);
  const newbieQuestions = useMemo(() => createNewbieQuestions(), []);
  const veteranRound3Questions = useMemo(() => createVeteranRound3Questions(), []);
  const newbieRound3Questions = useMemo(() => createNewbieRound3Questions(), []);
  const veteranRound4Questions = useMemo(() => createVeteranRound4Questions(), []);
  const newbieRound4Questions = useMemo(() => createNewbieRound4Questions(), []);
  const veteranRound5Questions = useMemo(() => createVeteranRound5Questions(), []);
  const newbieRound5Questions = useMemo(() => createNewbieRound5Questions(), []);
  
  const [round, setRound] = useState(1); // 当前轮次
  const [userType, setUserType] = useState(null); // 'veteran' 或 'newbie'
  const [questions, setQuestions] = useState(() => getRandomQuestions(allQuestions, 5));
  const [allRoundQuestions, setAllRoundQuestions] = useState([]); // 保存所有轮次的题目
  const [allRoundAnswers, setAllRoundAnswers] = useState([]); // 保存所有轮次的答案
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "HyperPersona";
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
      // 保存当前轮次的题目和答案
      const updatedAllQuestions = [...allRoundQuestions, ...questions];
      const updatedAllAnswers = [...allRoundAnswers, ...answers];
      
      // 如果是第一轮（前5题）完成，判断类型并加载第二轮
      if (round === 1) {
        const roundScore = calculateRoundScore(questions, answers);
        const type = roundScore >= 10 ? 'veteran' : 'newbie';
        setUserType(type);
        
        setAllRoundQuestions([...questions]);
        setAllRoundAnswers([...answers]);
        
        const round2Questions = type === 'veteran' 
          ? getRandomQuestions(veteranQuestions, 5)
          : getRandomQuestions(newbieQuestions, 5);
        
        setQuestions(round2Questions);
        setCurrentIndex(0);
        setRound(2);
        
        setAnswers([]);
        return;
      }
      // 如果是第二轮完成，根据类型加载第三轮
      if (round === 2) {
        // 保存前两轮的题目和答案
        setAllRoundQuestions(updatedAllQuestions);
        setAllRoundAnswers(updatedAllAnswers);
        
        // 根据类型选择第三轮题库
        const round3Questions = userType === 'veteran' 
          ? getRandomQuestions(veteranRound3Questions, 5)
          : getRandomQuestions(newbieRound3Questions, 5);
        
        setQuestions(round3Questions);
        setCurrentIndex(0);
        setRound(3);
        setAnswers([]);
        return;
      }
      // 如果是第三轮完成，根据类型加载第四轮
      if (round === 3) {
        // 保存前三轮的题目和答案
        setAllRoundQuestions(updatedAllQuestions);
        setAllRoundAnswers(updatedAllAnswers);
        
        // 根据类型选择第四轮题库
        const round4Questions = userType === 'veteran' 
          ? getRandomQuestions(veteranRound4Questions, 5)
          : getRandomQuestions(newbieRound4Questions, 5);
        
        setQuestions(round4Questions);
        setCurrentIndex(0);
        setRound(4);
        setAnswers([]);
        return;
      }
      // 如果是第四轮完成，根据类型加载第五轮
      if (round === 4) {
        // 保存前四轮的题目和答案
        setAllRoundQuestions(updatedAllQuestions);
        setAllRoundAnswers(updatedAllAnswers);
        
        // 根据类型选择第五轮题库
        const round5Questions = userType === 'veteran' 
          ? getRandomQuestions(veteranRound5Questions, 5)
          : getRandomQuestions(newbieRound5Questions, 5);
        
        setQuestions(round5Questions);
        setCurrentIndex(0);
        setRound(5);
        setAnswers([]);
        return;
      }
      // 如果是第五轮（最后一轮），跳转到结果页
      if (round === 5) {
        setAllRoundQuestions(updatedAllQuestions);
        setAllRoundAnswers(updatedAllAnswers);
        navigate("/result");
        return;
      }
    }
    setCurrentIndex((idx) => idx + 1);
  };

  const handleStart = () => {
    const newQuestions = getRandomQuestions(allQuestions, 5);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setAnswers([]);
    setRound(1);
    setUserType(null);
    setAllRoundQuestions([]);
    setAllRoundAnswers([]);
    navigate("/quiz");
  };

  const handleRestart = () => {
    // 重新随机选择5道题
    const newQuestions = getRandomQuestions(allQuestions, 5);
    setQuestions(newQuestions);
    setAnswers([]);
    setCurrentIndex(0);
    setRound(1);
    setUserType(null);
    setAllRoundQuestions([]);
    setAllRoundAnswers([]);
    navigate("/");
  };

  // 判断答题是否完成：所有5轮都完成（25题）或当前在结果页
  const isQuizCompleted = allRoundQuestions.length >= 25;

  return React.createElement(React.Fragment, null,
    React.createElement(Navbar, { isQuizCompleted: isQuizCompleted }),
    React.createElement(Routes, null,
      React.createElement(Route, {
        path: "/",
        element: React.createElement(Home, { onStart: handleStart })
      }),
      React.createElement(Route, {
        path: "/quiz",
        element: React.createElement(Quiz, {
          question: questions[currentIndex],
          questions: questions,
          total: questions.length,
          currentIndex: currentIndex,
          round: round,
          answers: answers,
          allRoundQuestions: allRoundQuestions,
          allRoundAnswers: allRoundAnswers,
          onSelect: handleSelect,
          onNext: handleNext,
          selectedOption: answers.find((item) => item.questionId === questions[currentIndex].id)
            ?.selectedIndex ?? null
        })
      }),
      React.createElement(Route, {
        path: "/result",
        element: React.createElement(Result, {
          questions: allRoundQuestions.length > 0 ? allRoundQuestions : questions,
          answers: allRoundAnswers.length > 0 ? allRoundAnswers : answers,
          onRestart: handleRestart,
          onRetake: () => {
            const newQuestions = getRandomQuestions(allQuestions, 5);
            setQuestions(newQuestions);
            setAnswers([]);
            setCurrentIndex(0);
            setRound(1);
            setUserType(null);
            setAllRoundQuestions([]);
            setAllRoundAnswers([]);
            navigate("/quiz");
          }
        })
      }),
      React.createElement(Route, {
        path: "*",
        element: React.createElement(Navigate, { to: "/", replace: true })
      })
    )
  );
}

