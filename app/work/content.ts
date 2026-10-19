export type Project = {
  slug: string;
  name: string;
  title: string;
  category: string;
  status: string;
  headline: string;
  intro: string;
  role: string;
  context: string;
  deliverable: string;
  period: string;
  toolkit: string;
  tags: string[];
  // Scope figures only: all of them also appear in the public resume PDF.
  stats: { value: string; label: string }[];
  sections: {
    id: string;
    title: string;
    body: string;
    evidence: number[];
  }[];
  learning: string;
};
export const projects: Project[] = [{
  slug: "chorusgo",
  name: "ChorusGO",
  title: "把课前练习，连成一条线",
  category: "产品实践",
  status: "发布前功能验收",
  headline: "排练之前，\n让每个人准备好。",
  intro: "从 110 人合唱团的真实练习场景出发，把散落的谱面、声部音频、录音提交和教师反馈，整理成一条更清楚的练习路径。",
  role: "产品设计 · 需求拆解 · AI 辅助开发",
  context: "大学合唱团课前预习与回课",
  deliverable: "微信小程序 · 团员练习与教师反馈流程",
  period: "2026.07 — 至今",
  toolkit: "微信小程序 · Coding Agent · 角色权限设计",
  tags: ["产品设计", "AI 辅助开发", "角色权限", "用户流程"],
  stats: [
    { value: "3", label: "类角色：团员、指挥、团长" },
    { value: "7", label: "个核心环节，覆盖练习闭环" },
    { value: "110", label: "人合唱团的真实场景" },
  ],
  sections: [{
    id: "rehearsal",
    title: "这个想法，来自排练之前。",
    body: "参与合唱团管理与排练时，我常常看到大家在通知、谱面和音频之间来回寻找：自己的声部在哪里，这次要练哪些小节，录音又该交到哪里？ChorusGO 就从这些具体的小事开始，希望给课前准备一个共同的地方。",
    evidence: [0]
  }, {
    id: "practice",
    title: "一次练习，顺着做下去。",
    body: "从曲目和声部进入，找到这次需要准备的小节，对照谱面听示范，录完后先回听，再提交给教师。我的工作是把这些原本分开的环节连接起来，让反馈回到对应的录音。工具负责整理信息，演唱的判断仍然交给教师。",
    evidence: [2]
  }, {
    id: "roles",
    title: "同一个合唱团，三种不同的入口。",
    body: "团员关心这次练什么、交了没有；指挥要发布作业、听录音、写评语；团长还要管理成员名单和排练考勤。我先把角色和权限分清楚，再设计每个角色的首页和流程，覆盖成员管理、排练考勤、作业发布、示范音频、录音提交、人工评分评语和结果查看七个环节。",
    evidence: [4]
  }, {
    id: "in-progress",
    title: "用 AI 协作做出来，再回到真实排练里。",
    body: "开发以 Coding Agent 为主要实现方式：我把需求拆成具体任务，组织上下文，负责功能验收、问题复现和迭代决策，并检查小程序与后台的权限是否一致。目前处于发布前的功能验收阶段，尚未以真实用户的长期使用数据证明效果。接下来想弄清楚的是：第一次使用的团员能否自己完成练习，教师能否顺手找到提交并回课。",
    evidence: [3]
  }],
  learning: "熟悉一个场景，不等于已经理解每个使用者。把“我觉得需要”拆成具体任务，再逐个验证，才能让产品更贴近真实排练。"
}, {
  slug: "ora-coffee",
  name: "Ora Coffee",
  title: "让经营数据，回答业务问题",
  category: "数据分析",
  status: "实习实践",
  headline: "不止看见数字，\n更要看懂经营。",
  intro: "在皮氏咖啡旗下新品牌 Ora Coffee 做数据分析实习。我在观远 BI 上从 0 到 1 搭建门店经营与产品分析看板，也用 Python 和 Agent 做了一套多门店财务经营分析工具。",
  role: "数据分析实习生",
  context: "咖啡零售 · 门店经营与商品表现",
  deliverable: "经营分析看板 · 财务经营工具 · 指标口径梳理",
  period: "2026.07 — 至今",
  toolkit: "SQL · ClickHouse · 观远 BI · Python · Agent",
  tags: ["经营分析", "指标体系", "数据口径", "BI 看板"],
  stats: [
    { value: "20+", label: "家门店纳入分析体系" },
    { value: "58", label: "项业务指标，整合进财务工具" },
    { value: "10", label: "类分析维度" },
  ],
  sections: [{
    id: "behind-the-numbers",
    title: "一杯咖啡背后，有很多种提问。",
    body: "销售变化来自哪些门店？是商品本身，还是套餐、时段和渠道带来了差异？在 Ora Coffee，我围绕这些具体问题做分析。比起马上画一张图，我习惯先确认比较的时间、范围与口径，让大家讨论的是同一件事。",
    evidence: [1]
  }, {
    id: "reading-the-business",
    title: "从整体变化，读到具体经营。",
    body: "我在观远 BI 上从 0 到 1 搭建经营与产品分析看板，基于 ClickHouse 用 SQL 和 BI 计算字段完成指标加工、口径校验与页面搭建，覆盖销售趋势、渠道结构、门店和 SKU 分析，支持团队的日常经营监控与复盘。",
    evidence: [3, 2]
  }, {
    id: "finance-tool",
    title: "把每月的经营复盘，做成一套工具。",
    body: "多门店的月度经营数据原本分散在不同表格里。我结合 Agent 与 Python 搭建财务经营分析工具，整合 20 多家门店的月度数据、58 项业务指标和 10 类分析维度，覆盖收入、成本、EBITDA、回本周期等指标；之后重构为离线 HTML 看板，形成从数据更新、指标计算到管理层交付的固定流程。下面只展示结构，不涉及内部经营数据，也不把经营变化归因于个人工作。",
    evidence: [4]
  }],
  learning: "一份有用的分析，不一定从复杂图表开始。先说清“在比较什么、为什么这样比较、还缺什么证据”，往往更能帮助团队形成共识。"
}, {
  slug: "choir",
  name: "合唱与协作",
  title: "让不同声音，完成同一件事",
  category: "组织协作",
  status: "校园经历",
  headline: "听见每个声音，\n也听见整体。",
  intro: "担任上海海事大学学生合唱团团长和助理指挥，让我从个人表达走向团队协作：一场演出，始于很多次看似平常的沟通与排练。",
  role: "合唱团团长 · 助理指挥",
  context: "团队管理 · 日常排练 · 舞台演出",
  deliverable: "排练组织 · 团队协调 · 专场音乐会",
  period: "2025.05 — 至今",
  toolkit: "排练计划 · 考勤管理 · 骨干培养 · 演出统筹",
  tags: ["团队管理", "排练组织", "演出统筹", "骨干培养"],
  stats: [
    { value: "110", label: "人合唱团的日常运营" },
    { value: "100+", label: "次排练组织" },
    { value: "10+", label: "场演出" },
    { value: "12", label: "名下一届核心骨干" },
  ],
  sections: [{
    id: "singing-together",
    title: "站在一起，还要听见彼此。",
    body: "合唱最吸引我的，是不同的声音逐渐找到共同呼吸的过程。作为团长和助理指挥，我统筹成员招募、组织架构、排练计划与考勤管理。每个人的基础和节奏不同，排练既要向前走，也要让大家跟得上。年度专场音乐会从节目规划、宣传推广、资源协调到现场落地，都需要很多人的部分接在一起。",
    evidence: [0]
  }, {
    id: "beyond-the-stage",
    title: "舞台之外，故事还在继续。",
    body: "一场演出留下的不只是合影，还有很多次倾听、调整与配合。团队要能继续走下去，也需要把经验交给下一届，所以我花了不少时间培养新的骨干。这些日常也让我开始思考，能不能把谱面、音频和课前练习安排得更清楚一些。后来，这个念头慢慢成为 ChorusGO。",
    evidence: [3]
  }],
  learning: "数据分析、产品实践和合唱看起来不同，却都需要理解他人的处境：不是把自己的部分做完，而是让每个人的部分能够接上。"
}];
