import { useQuery } from '@tanstack/react-query';
import { Loader2, BarChart3, Trophy, MessageSquare, ThumbsUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer } from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

const mockActivityData = [
  { month: 'Jan', posts: 5, replies: 8, likes: 12 },
  { month: 'Feb', posts: 7, replies: 10, likes: 15 },
  { month: 'Mar', posts: 4, replies: 12, likes: 18 },
  { month: 'Apr', posts: 8, replies: 15, likes: 22 },
  { month: 'May', posts: 10, replies: 18, likes: 25 },
  { month: 'Jun', posts: 12, replies: 20, likes: 30 },
];

const mockReputationData = [
  { date: '1', reputation: 10 },
  { date: '5', reputation: 25 },
  { date: '10', reputation: 45 },
  { date: '15', reputation: 80 },
  { date: '20', reputation: 100 },
  { date: '25', reputation: 150 },
  { date: '30', reputation: 200 },
];

export default function ReputationDisplay({ userId }: { userId: string }) {
  const { data: userStats, isLoading } = useQuery({
    queryKey: [`/api/users/${userId}/stats`],
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Stats Cards */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.totalPosts || 42}</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reputation Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.reputation || 180}</div>
            <p className="text-xs text-muted-foreground">Top 10% of users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Likes</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats?.totalLikes || 156}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Reputation Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Reputation Growth</CardTitle>
            <CardDescription>Your reputation progress over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[200px]" config={{
              reputation: { theme: { light: '#8b5cf6', dark: '#a78bfa' } },
            }}>
              <AreaChart data={mockReputationData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="reputation" fill="var(--color-reputation)" stroke="var(--color-reputation)" />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Your posting and engagement activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[200px]" config={{
              posts: { theme: { light: '#2563eb', dark: '#3b82f6' } },
              replies: { theme: { light: '#16a34a', dark: '#22c55e' } },
              likes: { theme: { light: '#dc2626', dark: '#ef4444' } },
            }}>
              <BarChart data={mockActivityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="posts" fill="var(--color-posts)" name="Posts" />
                <Bar dataKey="replies" fill="var(--color-replies)" name="Replies" />
                <Bar dataKey="likes" fill="var(--color-likes)" name="Likes" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}