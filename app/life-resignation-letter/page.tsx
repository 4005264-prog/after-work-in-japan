import type { Metadata } from "next";
import { LifeResignationLetterClient } from "./life-resignation-letter-client";

export const metadata: Metadata = {
  title: "人生の退職届ジェネレーター | after work in japan",
  description: "A quiet diagnostic ritual for resigning from an old way of living."
};

export default function LifeResignationLetterPage() {
  return <LifeResignationLetterClient />;
}
