import { SearchForm } from "@/components/search-form"

export const metadata = {
  title: "Search Athletes - Sports ELO",
  description: "Search for athletes across different sports in the ELO rating system.",
}

export default function SearchPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Search Athletes</h1>
        <p className="mt-2 text-muted-foreground">Find athletes across all supported sports</p>
      </div>

      <SearchForm />
    </div>
  )
}

