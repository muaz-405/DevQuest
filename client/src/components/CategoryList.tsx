import { Link } from "wouter";
import { Code, Database, Shield, Server, CodeSquare, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";

interface Category {
  id: number;
  name: string;
  description: string;
  color: string;
  threadCount?: number;
  threads?: any[];
}

interface CategoryListProps {
  categories: Category[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function CategoryList({ categories }: CategoryListProps) {
  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    
    const iconProps = {
      className: "h-5 w-5",
      "aria-hidden": "true"
    };

    if (lowerName.includes('javascript') || lowerName.includes('react') || lowerName.includes('typescript')) {
      return <Code {...iconProps} />;
    } else if (lowerName.includes('python')) {
      return <CodeSquare {...iconProps} />;
    } else if (lowerName.includes('database') || lowerName.includes('sql')) {
      return <Database {...iconProps} />;
    } else if (lowerName.includes('security')) {
      return <Shield {...iconProps} />;
    } else if (lowerName.includes('devops')) {
      return <Server {...iconProps} />;
    } else {
      return <BrainCircuit {...iconProps} />;
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-center py-12 bg-white rounded-xl shadow-sm"
      >
        <p className="text-gray-500 text-lg">No categories found</p>
        <p className="mt-2 text-gray-400">Create the first category to get started</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {categories.map((category) => (
        <motion.div
          key={category.id}
          variants={item}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200"
          style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}
        >
          <div className="px-5 py-6">
            <div className="flex items-start">
              <div 
                className="flex-shrink-0 rounded-lg p-3 flex items-center justify-center"
                style={{ 
                  backgroundColor: `${category.color}10`,
                  color: category.color
                }}
              >
                {getCategoryIcon(category.name)}
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {category.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {category.description}
                </p>
                <div className="mt-3 flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    {category.threads?.length || category.threadCount || 0} threads
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-4 border-t border-gray-100">
            <Link 
              href={`/categories/${category.id}`}
              className="text-sm font-medium flex items-center justify-between group"
            >
              <span 
                className="text-gray-600 group-hover:text-gray-900 transition-colors"
                style={{ color: category.color }}
              >
                View all discussions
              </span>
              <span 
                className="text-gray-400 group-hover:text-gray-600 transition-colors"
                aria-hidden="true"
              >
                &rarr;
              </span>
            </Link>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}