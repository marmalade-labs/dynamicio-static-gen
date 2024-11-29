export function generateStaticParams() {
  return [{ slug: "static" }]
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = await fetchTitle(slug)
  return (
    <div>{title}</div>
  )
}

async function fetchTitle(slug: string) {
  "use cache"
  await new Promise(resolve => setTimeout(resolve, 5000))
  return `Params: ${slug}`
}
