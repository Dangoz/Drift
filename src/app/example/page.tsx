import Link from "next/link";

import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "example",
    description: "...",
    other: {
      ...(await fetchMetadata(
        new URL(
          "frames",
          "http://localhost:8000"
        )
      )),
    },
  };
}

export default async function Home() {

  return (
    <div>
      Multi-page example
    </div>
  );
}