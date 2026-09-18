"use client";

import { useRef, useState } from "react";

export type Exploration = {
  label: string;
  title: string;
  intro: string;
  steps: { label: string; text: string }[];
  decision: string;
};

export function Explorer({ id, items, note }: { id: string; items: Exploration[]; note: string }) {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="case-explorer">
      <div className="explorer-tabs" role="tablist" aria-label="选择案例场景">
        {items.map((item, index) => (
          <button
            key={item.label}
            id={`${id}-tab-${index}`}
            ref={(element) => { tabs.current[index] = element; }}
            type="button"
            role="tab"
            aria-selected={index === selected}
            aria-controls={`${id}-panel-${index}`}
            tabIndex={index === selected ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              let next = selected;
              if (event.key === "ArrowRight") next = (selected + 1) % items.length;
              else if (event.key === "ArrowLeft") next = (selected + items.length - 1) % items.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = items.length - 1;
              else return;
              event.preventDefault();
              setSelected(next);
              tabs.current[next]?.focus();
            }}
          ><span>0{index + 1}</span>{item.label}</button>
        ))}
      </div>
      {items.map((item, index) => (
        <div key={item.label} role="tabpanel" id={`${id}-panel-${index}`} aria-labelledby={`${id}-tab-${index}`} hidden={selected !== index} tabIndex={0} className="explorer-panel">
          <p className="explorer-note">{note}</p>
          <h3>{item.title}</h3>
          <p className="explorer-intro">{item.intro}</p>
          <dl className="explorer-steps">{item.steps.map((step) => <div key={step.label}><dt>{step.label}</dt><dd>{step.text}</dd></div>)}</dl>
          <p className="explorer-decision"><span>关键判断</span>{item.decision}</p>
        </div>
      ))}
    </div>
  );
}
