import { Suspense } from "react"
import { DriverProfile } from "@/components/formula-one/driver-profile"
import { Spinner } from "@/components/ui/spinner"

interface DriverPageProps {
  params: {
    id: string
  }
}

export default function DriverPage({ params }: DriverPageProps) {
  return (
    <div className="container max-w-6xl py-8 md:py-12">
      <Suspense
        fallback={
          <div className="flex h-96 items-center justify-center">
            <Spinner size="lg" />
          </div>
        }
      >
        <DriverProfile driverId={params.id} />
      </Suspense>
    </div>
  )
}

