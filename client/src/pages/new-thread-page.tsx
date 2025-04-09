import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  content: z.string().min(20, "Content must be at least 20 characters"),
  categoryId: z.string().min(1, "Please select a category"),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewThreadPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch categories
  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["/api/categories"],
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      categoryId: "",
    },
  });

  const createThreadMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const requestData = {
        ...data,
        categoryId: parseInt(data.categoryId),
      };
      const response = await apiRequest("POST", "/api/threads", requestData);
      return response.json();
    },
    onSuccess: (newThread) => {
      queryClient.invalidateQueries({ queryKey: ["/api/threads"] });
      
      // Show success message
      toast({
        title: "Thread created",
        description: "Your thread was successfully created.",
        variant: "default",
      });

      // Redirect to the new thread
      navigate(`/threads/${newThread.id}`);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "There was an error creating your thread.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    createThreadMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-blue-50 to-transparent opacity-70"></div>
      <div className="absolute top-40 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute bottom-40 -right-24 w-96 h-96 bg-emerald-100 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Thread</h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Share your thoughts, questions, or insights with the DevQuest community
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 border border-gray-100">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Thread Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g., How to optimize React performance"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingCategories ? (
                          <div className="flex items-center justify-center p-4">
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            <span>Loading categories...</span>
                          </div>
                        ) : categories && categories.length > 0 ? (
                          categories.map((category: any) => (
                            <SelectItem
                              key={category.id}
                              value={category.id.toString()}
                            >
                              {category.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No categories available
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Share your thoughts, code examples, or questions..."
                        className="min-h-[200px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate("/")}
                  className="mr-4"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Thread"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        <div className="mt-8 bg-indigo-50 rounded-xl p-6 border border-indigo-100">
          <h3 className="text-lg font-medium text-indigo-800 mb-3">Tips for a great thread</h3>
          <ul className="space-y-2 text-indigo-700">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-200 text-indigo-600 mr-2 text-xs font-bold">1</span>
              <span>Be specific with your title to help others understand your topic</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-200 text-indigo-600 mr-2 text-xs font-bold">2</span>
              <span>Include code examples with proper formatting if applicable</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-200 text-indigo-600 mr-2 text-xs font-bold">3</span>
              <span>Describe what you've already tried if asking for help</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-200 text-indigo-600 mr-2 text-xs font-bold">4</span>
              <span>Choose the most relevant category for better discoverability</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}