# Trending Vaults 数据结构说明

## 文件位置
`src/data/vaultsData.js`

## 数据结构

每个金库对象包含以下字段：

```javascript
{
  id: 1,                          // 唯一标识符（必填）
  name: "Wayne EnterpriseFund",    // 金库名称（必填）
  author: "@Dransi",               // 作者（必填）
  riskType: "Low Risk",            // 风险类型：Low Risk / Medium Risk / High Risk（必填）
  apy: "+25.41%",                  // 年化收益率（必填）
  tvl: "$23.4M",                   // 总锁定价值（必填）
  followers: "+25.41%",            // 关注者增长率（必填）
  tags: ["#HFT", "#ETH-Perp", "#BTC"], // 标签数组（必填）
  url: "https://www.google.com/",  // 金库链接（必填）
  score: 20                        // 金库分数（必填）
}
```

## 使用方法

### 添加新金库

在 `vaultsData` 数组中添加新对象：

```javascript
{
  id: 2,
  name: "New Vault Name",
  author: "@CreatorName",
  riskType: "Medium Risk",
  apy: "+30.00%",
  tvl: "$15.2M",
  followers: "+18.50%",
  tags: ["#DeFi", "#Yield"],
  url: "https://example.com/",
  score: 25
}
```

### 修改现有金库

直接修改对应对象的字段值即可。

### 删除金库

从数组中移除对应的对象。

## 风险类型

支持的风险类型：
- `"Low Risk"` - 低风险（显示为绿色）
- `"Medium Risk"` - 中风险（显示为黄色）
- `"High Risk"` - 高风险（显示为红色）

## 注意事项

1. `id` 必须唯一
2. `tags` 必须是字符串数组
3. `apy` 和 `followers` 如果以 `+` 开头，会自动显示为绿色（positive）
4. `url` 用于 "View Strategy" 按钮的跳转链接
5. `score` 字段可用于排序或筛选（当前未使用，但已存储）

## 数据展示位置

- **Dashboard 卡片**：显示第一个金库（`vaultsData[0]`）
- **Trending Vaults 区域**：显示所有金库列表
