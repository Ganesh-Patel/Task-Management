import React from 'react';
import Image from 'next/image';

const AboutUs: React.FC = () => {
  return (
    <div className="bg-gray-50 text-gray-800 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h1 className="text-4xl font-bold text-teal-600 text-center mb-10">About TaskMaster</h1>

        <div className="flex flex-col lg:flex-row items-center mb-12">
          <div className="lg:w-1/2 mb-8 lg:mb-0">
            <div className="relative w-full h-64 lg:h-96">
              <Image
                src="https://www.shutterstock.com/image-vector/business-planning-task-management-concept-260nw-1987578881.jpg"
                alt="Task Management"
                layout="fill"
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <h2 className="text-2xl font-semibold text-teal-600 mb-4">Welcome to TaskMaster</h2>
            <p className="text-lg text-gray-600">
              At TaskMaster, we believe that productivity should be simple and stress-free. Our task management app is designed to help you prioritize your tasks, collaborate with your team, and achieve your goals effortlessly.
            </p>
            <p className="mt-4 text-lg text-gray-600">
              Whether you&apos;re a student juggling assignments or a professional managing projects, TaskMaster provides the tools you need to stay organized and focused.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to empower individuals and teams to manage their tasks more effectively. We aim to create a platform that inspires productivity and fosters collaboration.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-2xl font-bold text-teal-600 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              We envision a world where task management is seamless and accessible, enabling everyone to maximize their potential and achieve their dreams.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Why Choose TaskMaster?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-teal-600">Intuitive Design</h3>
              <p className="text-gray-600 mt-2">
                Our user-friendly interface ensures that you can manage your tasks without any hassle, allowing you to focus on what truly matters.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-teal-600">Collaboration Tools</h3>
              <p className="text-gray-600 mt-2">
                Work together with your team in real-time, assign tasks, share progress, and keep everyone aligned with your goals.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-teal-600">Flexible Organization</h3>
              <p className="text-gray-600 mt-2">
                Customize your workflow with tags, lists, and priority settings to suit your personal or team&apos;s needs.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">Meet the Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src="https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
                  alt="Team Member 1"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-teal-600">John Doe</h3>
              <p className="text-gray-600">Co-Founder &amp; CEO</p>
            </div>
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src="https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
                  alt="Team Member 2"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-teal-600">Jane Smith</h3>
              <p className="text-gray-600">Chief Technology Officer</p>
            </div>
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src="https://i.pinimg.com/280x280_RS/79/dd/11/79dd11a9452a92a1accceec38a45e16a.jpg"
                  alt="Team Member 3"
                  layout="fill"
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-teal-600">Alex Brown</h3>
              <p className="text-gray-600">Product Manager</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-3xl font-bold text-teal-600 text-center mb-8">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic">&quot;TaskMaster has revolutionized the way I manage my projects. It&apos;s intuitive, easy to use, and keeps me organized!&quot;</p>
              <p className="mt-4 text-teal-600 font-semibold">- Sarah Lee</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              <p className="text-gray-600 italic">&quot;As a team, we&apos;ve found TaskMaster invaluable for collaboration. It makes tracking tasks effortless!&quot;</p>
              <p className="mt-4 text-teal-600 font-semibold">- David Kim</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
