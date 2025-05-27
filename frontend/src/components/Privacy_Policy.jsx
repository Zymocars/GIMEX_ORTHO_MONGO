import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">Privacy Policy</h1>
          <p className="text-sm sm:text-base text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Introduction</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                At Gimex International, we are committed to protecting your privacy and personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Information We Collect</h2>
              
              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2 sm:mb-3">Personal Information</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Register for an account</li>
                <li>Make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2 sm:mb-3">Automatically Collected Information</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                When you visit our website, we may automatically collect certain information including:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">How We Use Your Information</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We use the information we collect for various purposes including:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Processing and fulfilling your orders</li>
                <li>Providing customer support</li>
                <li>Sending promotional emails and newsletters</li>
                <li>Improving our website and services</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Information Sharing and Disclosure</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share 
                your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>With service providers who assist us in operating our business</li>
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
                <li>In connection with a business transaction or merger</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Data Security</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We implement appropriate technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction. 
                However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Your Rights</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
                <li>Object to processing of your information</li>
              </ul>
            </section>

            {/* Cookies */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Cookies and Tracking Technologies</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We use cookies and similar tracking technologies to enhance your browsing experience, 
                analyze website traffic, and personalize content. You can control cookie settings 
                through your browser preferences.
              </p>
            </section>

            {/* Third Party Links */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Third-Party Links</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Our website may contain links to third-party websites. We are not responsible for 
                the privacy practices or content of these external sites. We encourage you to 
                review their privacy policies.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Children's Privacy</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Our services are not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13. If you become 
                aware that a child has provided us with personal information, please contact us.
              </p>
            </section>

            {/* Changes to Policy */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Changes to This Privacy Policy</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new Privacy Policy on this page and updating the 
                "Last updated" date.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Contact Us</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, 
                please contact us at:
              </p>
              <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                <p className="text-sm sm:text-base text-gray-700 font-medium">Gimex Ortho</p>
                <p className="text-xs sm:text-sm text-gray-600">Email: gimex@gimexortho.com</p>
                <p className="text-xs sm:text-sm text-gray-600">Phone: 9833215100</p>
                <p className="text-xs sm:text-sm text-gray-600">Address: C-1711 Dabholkarwadi CHS Ltd Jerbai Wadia Road Parel Bhoiwada B.E.S.T Colony Mumbai Maharashtra 400012  </p>
              </div>
            </section>

          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-6 sm:mt-8">
          <a 
            href="/" 
            className="inline-block bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg hover:bg-blue-700 transition duration-300 w-full sm:w-auto"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;