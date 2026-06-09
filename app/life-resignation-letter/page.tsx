import type { Metadata } from "next";
import { LifeResignationLetterClient } from "./life-resignation-letter-client";

export const metadata: Metadata = {
  title: "莠ｺ逕溘・騾閨ｷ螻翫ず繧ｧ繝阪Ξ繝ｼ繧ｿ繝ｼ | after work in japan",
  description: "A quiet diagnostic ritual for resigning from an old way of living."
};

export default function LifeResignationLetterPage() {
  return <LifeResignationLetterClient />;
}
