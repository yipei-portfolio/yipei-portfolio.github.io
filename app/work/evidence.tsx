import { Explorer, type Exploration } from "./explorer";

const practice: Exploration[] = [
  {
    label: "找到任务", title: "先说清楚，这一次练什么。",
    intro: "团员进入练习时，首先需要的是任务的上下文，而不是一长串资料。",
    steps: [{ label: "明确对象", text: "对应的曲目与自己的声部" }, { label: "缩小范围", text: "本次需要准备的具体小节" }, { label: "连接资料", text: "与任务相关的谱面和示范音频" }],
    decision: "以一次练习为单位组织内容，让谱面、音频与要求保持关联。",
  },
  {
    label: "分声部练习", title: "在同一个地方，看谱，也听示范。",
    intro: "四个声部承担不同的旋律线。个人准备需要准确地找到自己的部分，再回到整体。",
    steps: [{ label: "选择声部", text: "女高、女低、男高、男低" }, { label: "理解要求", text: "对照谱面与示范音频练习" }, { label: "反复准备", text: "围绕指定范围重复练习" }],
    decision: "优先把练习资料接起来；练习过程服务于教学，不把工具提示当作演唱评价。",
  },
  {
    label: "录音提交", title: "交出去之前，先听听自己。",
    intro: "录音既是回课材料，也是团员重新听见自己、发现问题的机会。",
    steps: [{ label: "留下练习", text: "围绕当前任务录制自己的演唱" }, { label: "回听确认", text: "确认这一遍是否是要提交的版本" }, { label: "提交回课", text: "让录音进入对应任务的回课流程" }],
    decision: "把录音回听放在提交之前，保留团员对自己表达的判断。",
  },
  {
    label: "教师反馈", title: "反馈不是终点，而是下一次练习的起点。",
    intro: "教师需要知道是谁、练了什么、交的是哪一次；团员需要知道接下来如何改进。",
    steps: [{ label: "集中查看", text: "按练习任务找到成员的提交" }, { label: "人工评阅", text: "由教师对具体演唱给出反馈" }, { label: "回到练习", text: "团员回看自己的反馈，继续准备" }],
    decision: "把教学判断交给教师，让每条反馈都能回到具体提交。",
  },
];

const analysis: Exploration[] = [
  {
    label: "门店经营", title: "整体变化，来自哪些门店？",
    intro: "先建立可以比较的范围，再看变化集中在哪里。汇总数字是入口，不是结论。",
    steps: [{ label: "先核对", text: "比较周期、门店范围与营业情况是否一致" }, { label: "再拆解", text: "从整体进入具体门店，观察变化的分布" }, { label: "形成讨论", text: "区分普遍变化与个别门店的特殊情况" }],
    decision: "比较范围不同，结论就可能不同。先解释口径，再解释变化。",
  },
  {
    label: "商品表现", title: "是商品变了，还是销售组合变了？",
    intro: "商品、套餐和销售时段可能交织在一起。分析前要先说清楚“销量”究竟统计了什么。",
    steps: [{ label: "先核对", text: "单品与套餐的统计范围是否一致" }, { label: "再拆解", text: "结合商品组合与销售时段观察需求" }, { label: "形成讨论", text: "明确观察到的变化，以及尚待确认的原因" }],
    decision: "套餐销量不直接等于其中某个商品的销量，不能把不同口径混在一起比较。",
  },
  {
    label: "会员与渠道", title: "不同来源，是否在回答同一个问题？",
    intro: "会员、订单、顾客和渠道代表不同观察角度。一个清楚的定义，比更多维度更重要。",
    steps: [{ label: "先核对", text: "会员、订单与渠道的定义和归属" }, { label: "再拆解", text: "在一致范围内观察来源与行为差异" }, { label: "形成讨论", text: "把差异转成后续业务提问，不直接推断原因" }],
    decision: "把事实、假设与后续验证分开写，让分析能被复核，也能被继续使用。",
  },
];

function Mapping({ rows }: { rows: [string, string][] }) {
  return <div className="case-mapping">{rows.map(([need, response]) => <div key={need}><p>{need}</p><span aria-hidden="true">→</span><p>{response}</p></div>)}</div>;
}

export function CaseEvidence({ slug, stage }: { slug: string; stage: number }) {
  if (slug === "chorusgo") {
    if (stage === 0) return <Mapping rows={[["团员：自己的声部和范围在哪里？", "资料需要跟着具体任务走。"], ["指挥：排练前，大家准备得怎样？", "提交与反馈需要集中查看。"]]} />;
    if (stage === 1) return <ol className="case-journey" aria-label="练习与回课路径">{["任务清楚", "资料相连", "提交可回听", "反馈有去处"].map((label, index) => <li key={label}><span>0{index + 1}</span>{label}</li>)}</ol>;
    if (stage === 2) return <Explorer id="practice" items={practice} note="练习路径说明 · 展示产品思路，非产品界面" />;
    return <div className="case-outcome"><div><span>已形成的内容</span><p>练习、录音提交与人工反馈的体验流程。</p></div><div><span>下一步验证</span><p>首次练习能否独立完成；教师能否顺手找到提交并回课。</p></div></div>;
  }
  if (slug === "ora-coffee") {
    if (stage === 0) return <Mapping rows={[["看见销售变化", "先确认时间、范围与统计口径。"], ["想要解释原因", "再按门店、商品与渠道寻找线索。"], ["准备给出建议", "区分已知事实与待验证判断。"]]} />;
    if (stage === 1) return <div className="case-principle"><span>分析交付的三个问题</span><p>在比较什么？<br />为什么这样比较？<br /><em>还缺什么证据？</em></p></div>;
    if (stage === 2) return <Explorer id="analysis" items={analysis} note="分析方法示意 · 不含内部经营数据或量化业绩" />;
    return <div className="case-outcome"><div><span>工作产出</span><p>经营分析、指标口径整理、看板优化与分析工具整理。</p></div><div><span>表达边界</span><p>不公开内部数据，不将经营变化直接归因于个人工作。</p></div></div>;
  }
  if (stage === 0) return <figure className="story-photo"><img src="/media/choir-live.webp" alt="合唱团与指挥在舞台上演出" width="2200" height="1650" loading="lazy" /><figcaption>舞台上的表达，来自舞台下的倾听与配合。</figcaption></figure>;
  if (stage === 1) return <Mapping rows={[["团长的视角", "关注安排、沟通和团队整体节奏。"], ["助理指挥的视角", "关注声部需要、现场倾听与配合。"]]} />;
  if (stage === 2) return <div className="choir-practice"><span>协作不是单向传达。</span><p>听见不同需要 <b aria-hidden="true">→</b> 说清共同目标 <b aria-hidden="true">→</b> 在排练中调整</p><a href="/work/chorusgo/">这些观察，如何成为 ChorusGO 的起点？ ↗</a></div>;
  return <figure className="story-photo photo-memory"><img src="/media/choir-campus.webp" alt="合唱成员在演出结束后的舞台合影" width="2200" height="1238" loading="lazy" /><figcaption>一次共同完成的经历，也留下了下一次提问的起点。</figcaption></figure>;
}
