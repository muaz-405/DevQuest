import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import ReputationDisplay from "@/components/ReputationDisplay";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import ThreadList from "@/components/ThreadList";
import { Helmet } from "react-helmet";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().optional(),
  websiteUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  portfolioUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  programmingLanguages: z.string().optional(),
  expertise: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

type ProfileData = {
  name: string;
  bio?: string;
  websiteUrl?: string;
  portfolioUrl?: string;
  programmingLanguages?: string[];
  expertise?: string[];
  reputation?: number;
};

export default function ProfilePage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("profile");

  const { data: profileData, isLoading: isLoadingProfile } = useQuery<ProfileData>({
    queryKey: [`/api/users/${user?.id}/profile`],
    enabled: !!user
  });

  const { data: userThreads, isLoading: isLoadingThreads } = useQuery({
    queryKey: [`/api/users/${user?.id}/threads`],
    enabled: !!user && activeTab === "threads"
  });

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      bio: "",
      websiteUrl: "",
      portfolioUrl: "",
      programmingLanguages: "",
      expertise: "",
    },
  });

  useEffect(() => {
    if (profileData) {
      form.reset({
        name: profileData.name || "",
        bio: profileData.bio || "",
        websiteUrl: profileData.websiteUrl || "",
        portfolioUrl: profileData.portfolioUrl || "",
        programmingLanguages: profileData.programmingLanguages?.join(", ") || "",
        expertise: profileData.expertise?.join(", ") || "",
      });
    }
  }, [profileData, form]);

  const updateProfileMutation = useMutation({
    mutationFn: async (data: ProfileFormValues) => {
      const processedData = {
        ...data,
        programmingLanguages: data.programmingLanguages?.split(",").map(s => s.trim()).filter(Boolean) || [],
        expertise: data.expertise?.split(",").map(s => s.trim()).filter(Boolean) || [],
      };

      const res = await apiRequest("PUT", "/api/profile", processedData);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/users/${user?.id}/profile`] });
      toast({ title: "Profile updated", description: "Your profile has been updated successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Update failed", description: error.message || "Failed to update profile", variant: "destructive" });
    },
  });

  function onSubmit(data: ProfileFormValues) {
    updateProfileMutation.mutate(data);
  }

  if (!user) return null;

  if (isLoadingProfile && activeTab === "profile") {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile | DevQuest</title>
      </Helmet>
      <div className="min-h-screen py-8 relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center mb-8 sm:mb-12 bg-white/10 p-6 rounded-2xl backdrop-blur-lg border border-white/20 shadow-xl">
              <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-4 ring-blue-500/50">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-6">
                <h1 className="text-3xl font-bold text-white mb-1">{user.name}</h1>
                <p className="text-blue-200/80 mb-2">{user.email}</p>
                {profileData?.reputation !== undefined && (
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-200 text-sm font-semibold backdrop-blur-sm border border-blue-500/20">
                      ⭐ Reputation: {profileData.reputation}
                    </span>
                  </div>
                )}
                <div className="text-white mt-4">
                  {profileData?.bio && <p>{profileData.bio}</p>}
                  {profileData?.expertise && (
                    <p className="mt-2">Expertise: {profileData.expertise.join(", ")}</p>
                  )}
                  {profileData?.programmingLanguages && (
                    <p className="mt-2">Languages: {profileData.programmingLanguages.join(", ")}</p>
                  )}
                  {profileData?.websiteUrl && (
                    <p className="mt-2">Website: <a href={profileData.websiteUrl} className="text-blue-500">{profileData.websiteUrl}</a></p>
                  )}
                  {profileData?.portfolioUrl && (
                    <p className="mt-2">Portfolio: <a href={profileData.portfolioUrl} className="text-blue-500">{profileData.portfolioUrl}</a></p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6 p-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg">
              <TabsTrigger value="profile" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200">Profile</TabsTrigger>
              <TabsTrigger value="threads" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200">My Threads</TabsTrigger>
              <TabsTrigger value="subscriptions" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-blue-200">Subscriptions</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ReputationDisplay userId={user.id} />
              <Card className="mt-6 bg-white/10 border-white/20 backdrop-blur-lg shadow-xl max-w-2xl mx-auto">
  <CardHeader className="space-y-2 pb-6 border-b border-white/10">
    <CardTitle className="text-white">Edit Profile</CardTitle>
    <CardDescription className="text-gray-300">Update your profile details below.</CardDescription>
  </CardHeader>
  <CardContent>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {[ 
          ["name", "Enter your full name"],
          ["bio", "Tell us about yourself"],
          ["websiteUrl", "https://yourwebsite.com"],
          ["portfolioUrl", "https://yourportfolio.com"],
          ["programmingLanguages", "e.g., JavaScript, Python"],
          ["expertise", "e.g., Frontend, Backend"]
        ].map(([name, placeholder]) => (
          <FormField key={name} name={name} control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>{name.charAt(0).toUpperCase() + name.slice(1)}</FormLabel>
              <FormControl>
                <Input placeholder={placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        ))}
        <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Update Profile</Button>
      </form>
    </Form>
  </CardContent>
</Card>
            </TabsContent>

            <TabsContent value="threads">
              {isLoadingThreads ? (
                <div className="flex justify-center items-center h-96">
                  <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
                </div>
              ) : (
                <ThreadList threads={userThreads} />
              )}
            </TabsContent>

            <TabsContent value="subscriptions">
              <div className="text-white">Coming soon: Subscribed threads and tags!</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
