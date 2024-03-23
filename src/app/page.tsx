import Link from "next/link";

import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Drifting Bottle",
    description: "A game where you can send and receive messages in a drifting bottle.",
    other: {
      ...(await fetchMetadata(
        new URL(
          "api/main-menu",
          "http://localhost:8000"
        )
      )),
    },
  };
}

export default async function Home() {

  return (
    <div>
      Drifting Bottle 🌊🍾📜
    </div>
  );
}