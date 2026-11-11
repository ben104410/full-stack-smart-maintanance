import type { ReactNode } from "react";
import Layout from "./Layout";

export default function StaffLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}
