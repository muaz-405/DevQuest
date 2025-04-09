import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Loader2 } from "lucide-react";
import CategoryList from "@/components/CategoryList";
import { 
  Code2, 
  Database, 
  Shield, 
  Cpu, 
  FlaskConical,
  GitBranch 
} from "lucide-react";

// Category icons mapping
const categoryIcons: Record<string, JSX.Element> = {
  'JavaScript': <Code2 className="w-8 h-8 text-yellow-500" />,
  'Python': <FlaskConical className="w-8 h-8 text-blue-500" />,
  'React': <Cpu className="w-8 h-8 text-sky-500" />,
  'DevOps': <GitBranch className="w-8 h-8 text-purple-500" />,
  'Database': <Database className="w-8 h-8 text-emerald-500" />,
  'Security': <Shield className="w-8 h-8 text-red-500" />,
};

export default function CategoriesPage() {
  const { 
    data: categories, 
    isLoading,
    error
  } = useQuery({
    queryKey: ["/api/categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary-500" />
        <span className="sr-only">Loading categories...</span>
      </div>
    );
  }

  if (error || !categories) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Error loading categories</h2>
          <p className="text-gray-600 mb-6">
            We encountered an issue while loading the categories. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Categories | DevQuest</title>
        <meta name="description" content="Browse all discussion categories on DevQuest platform" />
      </Helmet>
      
      <main className="min-h-[calc(100vh-200px)] bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Discussion Categories
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
              Explore knowledge across various topics and join the conversation
            </p>
          </div>

          {/* Category List Section */}
          <section className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                All Categories
                <span className="ml-2 bg-primary-100 text-primary-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {categories.length} total
                </span>
              </h2>
            </div>
            
            <div className="divide-y divide-gray-200">
              <CategoryList 
                categories={categories.map(cat => ({
                  ...cat,
                  icon: categoryIcons[cat.name] || <Code2 className="w-8 h-8 text-gray-500" />
                }))} 
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}