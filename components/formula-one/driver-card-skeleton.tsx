import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function DriverCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Current</p>
            <Skeleton className="h-6 w-16 mx-auto mt-1" />
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Highest</p>
            <Skeleton className="h-6 w-16 mx-auto mt-1" />
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Lowest</p>
            <Skeleton className="h-6 w-16 mx-auto mt-1" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-2 bg-muted/50 flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-20" />
      </CardFooter>
    </Card>
  )
}

