import { Metadata } from "next";
import { headers } from "next/headers";
import { Suspense, cache } from "react";

export function generateStaticParams() {
  return [{ slug: "static" }]
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const title = await fetchTitle(slug)
  return {
    title,
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = await fetchTitle(slug)
  return (
    <div className="flex flex-col gap-2">
      <div>{title}</div>
      <Suspense fallback={<div>Accessing headers() ...</div>}>
        <Dynamic />
      </Suspense>
    </div>
  )
}

const fetchTitle = cache(async function fetchTitle(slug: string) {
  "use cache"
  await new Promise(resolve => setTimeout(resolve, 5000))
  return `Params: ${slug}`
})

async function Dynamic() {
  const nextHeaders = await headers();
  return <div>sec-ch-ua: {nextHeaders.get("sec-ch-ua")}</div>
}
