
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { useEffect, useState, useRef } from "react";
import { Code, Users, Award, Zap, Layers, BookOpen } from "lucide-react";

// Background images with their gradient configurations
const backgroundImages = [
  {
    url: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?q=80&w=3270&auto=format&fit=crop",
    gradient: "bg-gradient-to-tr from-blue-900/30 to-purple-900/30"
  },
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=3270&auto=format&fit=crop",
    gradient: "bg-gradient-to-br from-blue-900/30 to-emerald-900/30"
  },
  {
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=3270&auto=format&fit=crop",
    gradient: "bg-gradient-to-bl from-indigo-900/30 to-blue-900/30"
  }
];

export default function Hero() {
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [fading, setFading] = useState(false);
  const imageRefs = useRef<Record<number, HTMLImageElement>>({});

  // Preload images to prevent white flash
  useEffect(() => {
    backgroundImages.forEach((image, index) => {
      const img = new Image();
      img.src = image.url;
      imageRefs.current[index] = img;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Start fade out transition
      setFading(true);
      
      // Prepare next image index in advance
      const nextIndex = (currentImageIndex + 1) % backgroundImages.length;
      setNextImageIndex(nextIndex);
      
      // After fade out completes, change the image
      setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        // Start fade in transition
        setFading(false);
      }, 1000); // Should match the transition duration
    }, 6000); // Change image every 6 seconds
    
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const currentImage = backgroundImages[currentImageIndex];
  const nextImage = backgroundImages[nextImageIndex];

  return (
    <div className="relative overflow-hidden">
      {/* Hidden div to pre-render next image to avoid white flash */}
      <div className="hidden">
        {backgroundImages.map((img, i) => (
          <div key={i} style={{ backgroundImage: `url(${img.url})` }}></div>
        ))}
      </div>
      
      {/* Background images with smooth crossfade transitions */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url("${currentImage.url}")`,
          opacity: fading ? 0 : 1,
          filter: 'brightness(0.35)'
        }}
      >
        <div className={`absolute inset-0 ${currentImage.gradient} mix-blend-multiply`}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDE0MTQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2LTJoLTF2MnptLTItMWgxdi0xaC0xdjF6bS0yIDJoMXYtMWgtMXYxem0tMi0yaDFWMjloLTF2MnptLTIgMGgxdi0xaC0xdjF6TTIyIDIyaDFWMjFoLTF2MXptMTAtNmgxVjE1aC0xdjF6bTggMGgxVjE1aC0xdjF6bS00LTRoMVY5aC0xdjN6bTAgMGgxVjloLTF2M3ptMCAxOGgxVjI3aC0xdjN6bTAgMGgxVjI3aC0xdjN6bS04LThINDB2LTFIMjh2MXptOCA4aDFWMzdoLTF2M3ptMCAwaDFWMzdoLTF2M3ptLTggMGgxVjM3aC0xdjN6bTAgMGgxVjM3aC0xdjN6bS04LThINDB2LTFIMjB2MXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      </div>
      <div 
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url("${nextImage.url}")`,
          opacity: fading ? 1 : 0,
          filter: 'brightness(0.35)'
        }}
      >
        <div className={`absolute inset-0 ${nextImage.gradient} mix-blend-multiply`}></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDE0MTQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2LTJoLTF2MnptLTItMWgxdi0xaC0xdjF6bS0yIDJoMXYtMWgtMXYxem0tMi0yaDFWMjloLTF2MnptLTIgMGgxdi0xaC0xdjF6TTIyIDIyaDFWMjFoLTF2MXptMTAtNmgxVjE1aC0xdjF6bTggMGgxVjE1aC0xdjF6bS00LTRoMVY5aC0xdjN6bTAgMGgxVjloLTF2M3ptMCAxOGgxVjI3aC0xdjN6bTAgMGgxVjI3aC0xdjN6bS04LThINDB2LTFIMjh2MXptOCA4aDFWMzdoLTF2M3ptMCAwaDFWMzdoLTF2M3ptLTggMGgxVjM3aC0xdjN6bTAgMGgxVjM3aC0xdjN6bS04LThINDB2LTFIMjB2MXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block">Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">DevQuest</span></span>
            <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-300">
              Your Journey in Code Begins Here
            </span>
          </h1>
          <div className="mt-8 max-w-3xl mx-auto space-y-4 text-lg md:mt-8 md:text-xl">
            <p className="text-blue-100">
              Join our thriving community of developers to share knowledge,
              solve problems, and grow your coding skills together.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center gap-4">
            {!user ? (
              <>
                <div className="rounded-md shadow">
                  <Link href="/auth?tab=register">
                    <Button className="w-full flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 border-none">
                      Join DevQuest
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0">
                  <Link href="/auth">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10 bg-transparent text-white border-2 border-white/70 hover:bg-white/10 hover:border-white"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="rounded-md shadow">
                  <Link href="/new-thread">
                    <Button className="w-full flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 border-none">
                      Create Post
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0">
                  <Link href="/categories">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center px-8 py-3 md:py-4 md:text-lg md:px-10 bg-transparent text-white border-2 border-white/70 hover:bg-white/10 hover:border-white"
                    >
                      Browse Forums
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Feature highlights */}
      <div className="relative bg-gradient-to-b from-gray-900/90 to-gray-900 py-20">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNDE0MTQiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2LTJoLTF2MnptLTItMWgxdi0xaC0xdjF6bS0yIDJoMXYtMWgtMXYxem0tMi0yaDFWMjloLTF2MnptLTIgMGgxdi0xaC0xdjF6TTIyIDIyaDFWMjFoLTF2MXptMTAtNmgxVjE1aC0xdjF6bTggMGgxVjE1aC0xdjF6bS00LTRoMVY5aC0xdjN6bTAgMGgxVjloLTF2M3ptMCAxOGgxVjI3aC0xdjN6bTAgMGgxVjI3aC0xdjN6bS04LThINDB2LTFIMjh2MXptOCA4aDFWMzdoLTF2M3ptMCAwaDFWMzdoLTF2M3ptLTggMGgxVjM3aC0xdjN6bTAgMGgxVjM3aC0xdjN6bS04LThINDB2LTFIMjB2MXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        {/* Decorative blurs */}
        <div className="absolute left-1/4 top-12 w-96 h-96 bg-emerald-500/10 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute right-1/4 top-36 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-30"></div>
      
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-medium text-sm mb-3">
              COMMUNITY BENEFITS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Why Join DevQuest?</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded mx-auto my-6"></div>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Explore the features that make our community special and help you advance in your coding journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Feature 1 */}
            <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/30 hover:bg-gray-800/80 transition-all transform hover:-translate-y-1 hover:shadow-xl shadow-lg group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mb-5 shadow-emerald-500/20 shadow-lg">
                  <Code className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Code Sharing</h3>
                <p className="text-gray-400">Share code snippets with syntax highlighting and get feedback from experienced developers.</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/30 hover:bg-gray-800/80 transition-all transform hover:-translate-y-1 hover:shadow-xl shadow-lg group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mb-5 shadow-emerald-500/20 shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Active Community</h3>
                <p className="text-gray-400">Connect with like-minded developers who share your passion for coding and problem-solving.</p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/30 hover:bg-gray-800/80 transition-all transform hover:-translate-y-1 hover:shadow-xl shadow-lg group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mb-5 shadow-emerald-500/20 shadow-lg">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Achievements</h3>
                <p className="text-gray-400">Earn recognition for your contributions with our reputation system and achievement badges.</p>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-800/60 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/30 hover:bg-gray-800/80 transition-all transform hover:-translate-y-1 hover:shadow-xl shadow-lg group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="h-14 w-14 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mb-5 shadow-emerald-500/20 shadow-lg">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Real-time Updates</h3>
                <p className="text-gray-400">Stay informed with notifications about responses to your posts and trending discussions.</p>
              </div>
            </div>
          </div>
          
          {/* Code Sharing Section */}
          <div className="mt-24 mb-16">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 space-y-6">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center mr-4 shadow-emerald-500/20 shadow-lg">
                    <Code className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">Powerful Code Sharing</h2>
                </div>
                <div className="h-1 w-20 bg-gradient-to-r from-emerald-400 to-blue-500 rounded"></div>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Share code snippets with syntax highlighting for better discussions and problem-solving. Get feedback from experienced developers and mentors in the community.
                </p>
                <ul className="space-y-4">
                  {[
                    "Full syntax highlighting for over 100 languages",
                    "Collaborative annotations and inline commenting",
                    "Version history and diff viewing",
                    "Embed code snippets anywhere in discussions"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div>
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white border-none">
                    Explore Code Examples
                  </Button>
                </div>
              </div>
              <div className="md:w-1/2 bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 shadow-xl">
                <div className="bg-gray-900/80 flex items-center px-4 py-2 border-b border-gray-700/50">
                  <div className="flex space-x-2 mr-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-gray-400 text-sm">example.tsx</span>
                </div>
                <div className="p-6 text-left overflow-x-auto">
                  <div className="text-sm text-emerald-50 font-mono space-y-1 bg-gray-800/50 p-4 rounded">
                    <p className="text-blue-400">function <span className="text-emerald-300">formatCode</span>(code) {'{'}</p>
                    <p className="pl-4 text-gray-300">// Split code into lines</p>
                    <p className="pl-4 text-blue-400">const <span className="text-emerald-300">lines</span> = code.split('\\n');</p>
                    <p className="pl-4 text-blue-400">return lines.map(function(line, index) {'{'}</p>
                    <p className="pl-8 text-gray-300">// Format with line number and content</p>
                    <p className="pl-8 text-green-400">return "Line " + (index+1) + ": " + line;</p>
                    <p className="pl-4 text-blue-400">{'})'}.join('\\n');</p>
                    <p className="text-blue-400">{'}'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Programming Languages and Categories Section */}
          <div className="mb-16 mt-24 bg-gray-800/40 backdrop-blur-md rounded-2xl p-10 border border-gray-700/50 shadow-xl">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-4 shadow-indigo-500/20 shadow-lg">
                  <Layers className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white">Topics & Languages</h2>
              </div>
              <div className="h-1 w-20 bg-gradient-to-r from-indigo-400 to-purple-500 rounded mx-auto my-6"></div>
              <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
                Find discussions in your favorite programming languages and topics. 
                Join communities tailored to your interests.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {[
                { name: "JavaScript", icon: "📜", color: "from-yellow-400 to-yellow-500", members: "12K+" },
                { name: "Python", icon: "🐍", color: "from-blue-400 to-green-500", members: "10K+" },
                { name: "React", icon: "⚛️", color: "from-cyan-400 to-blue-500", members: "8K+" },
                { name: "DevOps", icon: "🔄", color: "from-emerald-400 to-teal-500", members: "6K+" },
              ].map((category, index) => (
                <div key={index} className="bg-gray-800/60 rounded-xl p-5 backdrop-blur-sm border border-gray-700/50 hover:border-gray-500/50 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                  <div className={`text-4xl mb-3 bg-clip-text text-transparent bg-gradient-to-r ${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.members} members</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mt-6">
              {[
                "TypeScript", "Java", "C#", "Rust", "C++", "Go", 
                "Machine Learning", "Cloud", "Mobile", "Web Dev", "Databases", "Security"
              ].map((tag, index) => (
                <div key={index} className="bg-gray-700/20 rounded-lg px-4 py-2 text-center border border-gray-700/30 hover:bg-gray-700/40 hover:border-gray-600/50 cursor-pointer transition-all duration-300">
                  <span className="text-gray-300 text-sm">{tag}</span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-none">
                <BookOpen className="w-4 h-4 mr-2" /> Browse All Categories
              </Button>
            </div>
          </div>

          {/* Image grid showcase - Full width with more immersive layout */}
          <div className="mt-24 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 overflow-hidden rounded-xl shadow-xl relative transform hover:scale-[1.01] transition-all duration-300 h-[400px]">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent opacity-80 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop" 
                  alt="Developers collaborating" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                  <div className="max-w-2xl">
                    <h3 className="text-3xl font-bold text-white mb-3">Join Global Discussions</h3>
                    <p className="text-xl text-gray-200">Collaborate on projects, solve coding challenges, and exchange ideas with developers around the world.</p>
                    <Button variant="link" className="text-emerald-400 hover:text-emerald-300 pl-0 mt-3 flex items-center">
                      Explore Categories <Zap className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="md:col-span-4 space-y-6">
                <div className="overflow-hidden rounded-xl shadow-xl relative transform hover:scale-[1.01] transition-all duration-300 h-[190px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop" 
                    alt="Coding setup" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h3 className="text-xl font-bold text-white mb-2">Share Knowledge</h3>
                    <p className="text-gray-200">Teach and learn from other developers</p>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl shadow-xl relative transform hover:scale-[1.01] transition-all duration-300 h-[190px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1607705703571-c5a8695f18f6?q=80&w=2670&auto=format&fit=crop" 
                    alt="Code on screen" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h3 className="text-xl font-bold text-white mb-2">Get Recognized</h3>
                    <p className="text-gray-200">Earn badges and build your reputation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
