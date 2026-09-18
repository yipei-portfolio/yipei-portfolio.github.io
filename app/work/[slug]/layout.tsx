import type { ReactNode } from "react";

export default function CaseLayout({ children }: { children: ReactNode }) {
  return <div className="case-page">{children}</div>;
}
