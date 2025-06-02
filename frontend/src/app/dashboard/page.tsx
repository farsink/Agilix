'use client'

const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      {children}
    </div>
  )
}

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}
import { 
  BarChart,
  Activity,
  Calendar,
  ListChecks
} from 'lucide-react'

export default function Dashboard() {
  return (
    <Container>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Workouts</p>
                <h3 className="text-2xl font-bold">12</h3>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Completed This Week</p>
                <h3 className="text-2xl font-bold">5</h3>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <BarChart className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Progress</p>
                <h3 className="text-2xl font-bold">75%</h3>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-2">
              <ListChecks className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Exercises</p>
                <h3 className="text-2xl font-bold">48</h3>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {/* Add recent activity content here */}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Workouts</h2>
            <div className="space-y-4">
              {/* Add upcoming workouts content here */}
            </div>
          </Card>
        </div>
      </div>
    </Container>
  )
}
