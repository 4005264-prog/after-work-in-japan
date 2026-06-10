import type { Metadata } from "next";
import { ReverseJobOfferClient } from "./reverse-job-offer-client";

export const metadata: Metadata = {
  title: "人生の逆求人票",
  description: "未来の自分があなたに出している求人票を作る無料ジェネレーターです。"
};

export default function ReverseJobOfferPage() {
  return <ReverseJobOfferClient />;
}
