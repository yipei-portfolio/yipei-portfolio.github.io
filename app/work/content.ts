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
  status: "持续打磨中",
  headline: "排练之前，\n让每个人准备好。",
  intro: "从合唱团的真实练习场景出发，把散落的谱面、声部音频、录音提交和教师反馈，整理成一条更清楚的练习路径。",
  role: "需求梳理 · 体验设计 · 产品实现",
  context: "大学合唱团课前预习与回课",
  deliverable: "微信小程序 · 团员练习与教师反馈流程",
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
    id: "in-progress",
    title: "继续回到真实排练里。",
    body: "目前已形成练习、提交与人工反馈的体验流程，但还在持续打磨，尚未以真实用户的长期使用数据证明效果。我更想弄清楚的是：第一次使用的团员能否自己完成练习，教师能否顺手找到提交并回课。",
    evidence: []
  }],
  learning: "熟悉一个场景，不等于已经理解每个使用者。把“我觉得需要”拆成具体任务，再逐个验证，才能让产品更贴近真实排练。"
}, {
  slug: "ora-coffee",
  name: "Ora Coffee",
  title: "让经营数据，回答业务问题",
  category: "数据分析",
  status: "实习实践",
  headline: "不止看见数字，\n更要看懂经营。",
  intro: "在皮氏咖啡旗下新品牌 Ora Coffee 的数据分析实习中，我围绕门店、商品、会员与渠道开展分析，参与指标梳理与经营看板优化。",
  role: "数据分析实习生",
  context: "咖啡零售 · 门店经营与商品表现",
  deliverable: "分析框架 · 指标梳理 · 经营看板优化",
  sections: [{
    id: "behind-the-numbers",
    title: "一杯咖啡背后，有很多种提问。",
    body: "销售变化来自哪些门店？是商品本身，还是套餐、时段和渠道带来了差异？在 Ora Coffee，我围绕这些具体问题做分析。比起马上画一张图，我习惯先确认比较的时间、范围与口径，让大家讨论的是同一件事。",
    evidence: [1]
  }, {
    id: "reading-the-business",
    title: "从整体变化，读到具体经营。",
    body: "我参与经营数据分析、指标梳理和看板优化，把观察路径从整体延伸到门店、商品、会员与渠道。写下结论时，区分已经看见的事实、可能的原因和还要确认的问题。下面是我拆解问题的方式，不涉及内部经营数据，也不把经营变化归因于个人工作。",
    evidence: [2]
  }],
  learning: "一份有用的分析，不一定从复杂图表开始。先说清“在比较什么、为什么这样比较、还缺什么证据”，往往更能帮助团队形成共识。"
}, {
  slug: "choir",
  name: "合唱与协作",
  title: "让不同声音，完成同一件事",
  category: "组织协作",
  status: "校园经历",
  headline: "听见每个声音，\n也听见整体。",
  intro: "担任大学合唱团团长和助理指挥的经历，让我从个人表达走向团队协作：一场演出，始于很多次看似平常的沟通与排练。",
  role: "合唱团团长 · 助理指挥",
  context: "团队管理 · 日常排练 · 舞台演出",
  deliverable: "排练组织 · 团队协调 · 演出协作",
  sections: [{
    id: "singing-together",
    title: "站在一起，还要听见彼此。",
    body: "合唱最吸引我的，是不同的声音逐渐找到共同呼吸的过程。作为大学合唱团团长和助理指挥，我参与排练安排、成员沟通与演出协作。每个人的基础和节奏不同，排练既要向前走，也要让大家跟得上。",
    evidence: [0]
  }, {
    id: "beyond-the-stage",
    title: "舞台之外，故事还在继续。",
    body: "一场演出留下的不只是合影，还有很多次倾听、调整与配合。这些日常也让我开始思考，能不能把谱面、音频和课前练习安排得更清楚一些。后来，这个念头慢慢成为 ChorusGO。",
    evidence: [3]
  }],
  learning: "数据分析、产品实践和合唱看起来不同，却都需要理解他人的处境：不是把自己的部分做完，而是让每个人的部分能够接上。"
}];
