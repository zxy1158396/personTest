import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logoImage from "../public/logo.png";

export default function Navbar({ isQuizCompleted = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleConnectWallet = async () => {
    // 连接Web3钱包
    if (typeof window.ethereum !== 'undefined') {
      try {
        // 请求账户访问权限
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        // 连接成功，可以在这里添加成功连接后的逻辑
      } catch (error) {
        // 用户拒绝连接，可以在这里添加错误处理逻辑
      }
    } else {
      // 如果没有检测到钱包，提示用户安装
      alert('Please install a Web3 wallet extension like MetaMask to connect your wallet.');
    }
  };

  return React.createElement("div", { className: "navbar-wrapper" },
    React.createElement("nav", { className: "navbar" },
      React.createElement("div", { 
        className: "navbar-left",
        onClick: () => navigate("/"),
        style: { cursor: "pointer" }
      },
        React.createElement("img", { 
          src: logoImage, 
          alt: "HyperPersona Logo", 
          className: "logo-img" 
        }),
        React.createElement("span", { className: "navbar-brand" }, "HyperPersona")
      ),
      React.createElement("div", { className: "navbar-right" },
        React.createElement("button", {
          className: `nav-link ${location.pathname === "/quiz" ? "active" : ""}`,
          onClick: () => navigate("/quiz")
        }, "HyperSwarm"),
        React.createElement("button", {
          className: `nav-link ${location.pathname === "/result" ? "active" : ""}`,
          onClick: () => {
            if (isQuizCompleted) {
              navigate("/result");
            }
          },
          style: !isQuizCompleted ? { 
            cursor: 'not-allowed',
            opacity: 0.5
          } : {}
        }, "Vaults"),
        // React.createElement("button", {
        //   className: "nav-link connect-wallet",
        //   onClick: handleConnectWallet
        // }, "Connect Wallet")
      )
    )
  );
}
