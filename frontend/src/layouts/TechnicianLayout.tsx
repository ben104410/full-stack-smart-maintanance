import type { ReactNode } from "react";
import Layout from "./Layout";

interface Props {
  children: ReactNode;
}

export default function TechnicianLayout({ children }: Props) {
  return <Layout>{children}</Layout>;
}
