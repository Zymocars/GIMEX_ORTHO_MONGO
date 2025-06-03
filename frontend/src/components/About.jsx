import React, { useState } from 'react'
import { Menu, ChevronDown, X } from 'lucide-react' // or use Unicode chars if you don't use Lucide

export default function AboutUsPage() {
  const [activeSection, setActiveSection] = useState('vision')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const sections = [
    { id: 'vision', label: 'Our Vision' },
    { id: 'mission', label: 'Our Mission' },
    { id: 'team', label: 'Meet the Team' },
    { id: 'values', label: 'Our Core Values' },
    { id: 'journey', label: 'Our Journey' },
  ]

  return (
    <div className="min-h-screen bg-white text-black flex flex-col md:flex-row overflow-x-hidden">
      {/* Sidebar for all screen sizes, but collapsible */}
      {/* <aside className={`${isMenuOpen ? 'block' : 'hidden'} md:block md:w-1/4 p-6 border-r border-gray-700 bg-[#212121]`}> */}
        {/* <h2 className="text-2xl font-bold mb-6">About Us</h2> */}
        {/* <nav className="space-y-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id)
                setIsMenuOpen(false)
              }}
              className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                activeSection === section.id
                  ? 'bg-yellow-200 text-black'
                  : 'hover:bg-gray-700'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav> */}
      {/* </aside> */}

      {/* Toggle Button */}
      {/* <div className="md:hidden p-2 mt-8">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2 bg-yellow-200 text-black py-2 px-4 rounded-md font-semibold"
        >
          {isMenuOpen ? (
            <>
              <X size={20} />
              Close Menu
            </>
          ) : (
            <>
              <ChevronDown size={20} /> About Us
              
            </>
          )}
        </button>
      </div> */}

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-6 md:p-10 space-y-12">
        <h2 className="text-2xl font-bold text-center mb-6">About Us</h2>
        {activeSection === 'vision' && (
          <section>
            {/* <h2 className="text-3xl font-semibold mb-4"></h2> */}
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-sm sm:text-base md:text-lg leading-6 sm:leading-7 md:leading-8 text-gray-700 text-left sm:text-justify p-6 sm:p-8 md:p-10 bg-gray-80 rounded-lg shadow-sm border border-gray-200 font-normal">
              At Gimex International, we are committed to enhancing lives through natural wellness solutions. As the proud makers of Gimex Ortho Powder, our mission is to provide effective, herbal-based relief for joint and muscle discomfort, helping people live healthier, more active lives.

Founded with a deep respect for traditional remedies and a passion for innovation, Gimex International combines time-tested Ayurvedic wisdom with modern quality standards. Our flagship product, Gimex Ortho Powder, is specially formulated with powerful natural ingredients known to support joint mobility, reduce inflammation, and alleviate stiffness—without the side effects associated with synthetic alternatives.

We believe in quality, purity, and trust. Every batch of our product undergoes rigorous testing to ensure it meets the highest standards of safety and effectiveness. Our team is dedicated to continuous improvement, customer satisfaction, and bringing natural healing into everyday life.

Whether you're dealing with age-related joint issues or looking for natural support after physical exertion, Gimex Ortho Powder is your trusted companion on the journey to pain-free movement and lasting well-being.

Gimex International — Inspired by Nature, Backed by Trust.
              </p>
            </div>
          </section>
        )}

        {/* {activeSection === 'mission' && (
          <section>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg leading-7 text-gray-300">
              Our mission is to provide the highest quality vehicle accessories that merge innovation with affordability. We strive to meet the evolving needs of automobile enthusiasts by ensuring every product we offer is durable, stylish, and sustainable. Customer satisfaction remains at the core of our efforts.
            </p>
          </section>
        )} */}

        {/* {activeSection === 'team' && (
          <section>
            <h2 className="text-3xl font-semibold mb-4">Meet the Team</h2>
            <p className="text-lg leading-7 text-gray-300">
              Our dedicated team comprises passionate engineers, designers, and automobile enthusiasts working together to curate the finest vehicle accessories. Each member brings unique expertise to ensure excellence and innovation in every product we develop.
            </p>
          </section>
        )} */}

        {/* {activeSection === 'values' && (
          <section>
            <h2 className="text-3xl font-semibold mb-4">Our Core Values</h2>
            <ul className="list-disc pl-6 text-lg leading-7 text-gray-300 space-y-2">
              <li>Customer-Centric Approach: Always prioritizing user satisfaction.</li>
              <li>Innovation & Quality: Offering products that are advanced and reliable.</li>
              <li>Integrity: Transparent dealings and ethical practices.</li>
              <li>Sustainability: Ensuring environmentally friendly solutions.</li>
            </ul>
          </section>
        )} */}

        {/* {activeSection === 'journey' && (
          <section>
            <h2 className="text-3xl font-semibold mb-4">Our Journey</h2>
            <p className="text-lg leading-7 text-gray-300">
              From a small startup founded by car enthusiasts to a leading name in the vehicle accessories market, our journey has been marked by relentless innovation, commitment to quality, and unwavering customer trust. We continue to grow and adapt to the latest trends in automobile accessories.
            </p>
          </section>
        )} */}
      </main>
    </div>
  )
}