import { Helmet } from "react-helmet";
import { Code, Users, MessageSquare, GraduationCap, Globe } from "lucide-react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Mehwish Akbar",
      role: "Backend & Frontend Developer",
      bio: "Full-stack developer with 15+ years experience in building community platforms.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
    {
      name: "Sidra Khurshid",
      role: "Database and API Developer",
      bio: "Systems architect specializing in scalable applications and cloud infrastructure.",
      image: "https://img.freepik.com/free-photo/young-woman-happy-excited_58466-11000.jpg?semt=ais_hybrid&w=740",
    },
    {
      name: "Assra Butt",
      role: "Cloud Engineer",
      bio: "UX/UI designer focused on creating accessible and intuitive user interfaces.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80",
    },
  ];

  const carouselImages = [
    "https://cdn.pixabay.com/photo/2017/08/10/08/47/laptop-2620118_1280.jpg", // coding related image
    "https://assets.mixkit.co/videos/1730/1730-thumb-360-0.jpg", // programming related image
    "https://png.pngtree.com/thumb_back/fh260/background/20231005/pngtree-digital-programming-illustration-of-web-development-with-computer-code-on-laptop-image_13574065.png", // programming workspace image
  ];

  return (
    <div className="bg-white pb-12 sm:pb-16">
      <Helmet>
        <title>About Us | DevQuest</title>
        <meta name="description" content="Learn about DevQuest, our mission, and the team behind the platform." />
      </Helmet>

      {/* Carousel Header */}
      <div className="relative w-full h-[400px]">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          showArrows={false}
          interval={4000}
        >
          {carouselImages.map((img, i) => (
            <div key={i}>
              <img src={img} alt={`slide-${i}`} className="object-cover h-[400px] w-full" />
            </div>
          ))}
        </Carousel>
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">About DevQuest</h1>
            <p className="text-lg sm:text-xl max-w-2xl mx-auto">
              A community-driven platform where programmers connect, share knowledge, and grow together.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission */}
        <section className="my-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-4">
                At DevQuest, we believe that programming knowledge should be accessible to everyone.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                We're building a platform where developers can come together to share ideas and advance their skills.
              </p>
              <p className="text-lg text-gray-600">
                Our goal is to create the most inclusive, helpful, and technically accurate programming forum on the web.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[Code, Users, MessageSquare, GraduationCap].map((Icon, i) => (
                <div key={i} className="bg-indigo-100 p-6 rounded-xl flex flex-col items-center text-center">
                  <Icon className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {["Code Sharing", "Community", "Discussion", "Learning"][i]}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {
                      ["Enabling developers to share and improve code together",
                       "Building connections among developers worldwide",
                       "Facilitating meaningful technical conversations",
                       "Promoting continuous growth and skill development"][i]
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
          </div>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p>
              DevQuest began in 2023 when a group of developers realized the need for a modern programming community platform.
            </p>
            <p>
              We set out to create something better — a space with community, design, and code-focused features.
            </p>
            <p>
              Today, DevQuest hosts developers from all backgrounds and skill levels.
            </p>
            <p>
              Our mission continues: to provide the best space for developers to connect, learn, and grow.
            </p>
          </div>
        </section>

        {/* Team */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Team</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate people behind DevQuest working to build the future of tech communities.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                  <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-2xl p-8 sm:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">Join Our Global Community</h2>
              <p className="text-indigo-100 max-w-xl">
                Connect with developers from over 150 countries who are sharing knowledge, solving problems, and building the future of tech together.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="/auth"
                className="inline-block bg-white text-indigo-700 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-300"
              >
                <div className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  <span>Join Now</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
