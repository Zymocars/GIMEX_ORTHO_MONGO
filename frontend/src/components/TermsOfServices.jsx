import React from 'react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4 px-2">Terms of Service</h1>
          <p className="text-sm sm:text-base text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8">
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Introduction</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Welcome to Gimex International. These Terms of Service ("Terms") govern your use of our website, 
                products, and services. By accessing or using our services, you agree to be bound by these Terms. 
                If you do not agree to these Terms, please do not use our services.
              </p>
            </section>

            {/* Acceptance of Terms */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Acceptance of Terms</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                By creating an account, making a purchase, or using any part of our service, you acknowledge 
                that you have read, understood, and agree to be bound by these Terms of Service and our 
                Privacy Policy.
              </p>
            </section>

            {/* Eligibility */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Eligibility</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                You must be at least 18 years old to use our services. By using our services, you represent 
                and warrant that:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You will provide accurate and complete information</li>
                <li>You will comply with all applicable laws and regulations</li>
              </ul>
            </section>

            {/* Account Registration */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Account Registration</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                When creating an account with us, you must provide information that is accurate, complete, 
                and current at all times. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Safeguarding your password and account information</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Maintaining accurate and up-to-date account information</li>
              </ul>
            </section>

            {/* Products and Services */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Products and Services</h2>
              
              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2 sm:mb-3">Product Information</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We strive to provide accurate product descriptions, images, and pricing. However, we do not 
                warrant that product descriptions or other content is accurate, complete, reliable, or error-free.
              </p>

              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2 sm:mb-3">Availability</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                All products are subject to availability. We reserve the right to discontinue any product 
                at any time without prior notice.
              </p>
            </section>

            {/* Orders and Payment */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Orders and Payment</h2>
              
              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2 sm:mb-3">Order Acceptance</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Your order is an offer to buy a product. We reserve the right to accept or decline your 
                order for any reason, including:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Product unavailability</li>
                <li>Pricing errors</li>
                <li>Credit verification issues</li>
                <li>Suspected fraudulent activity</li>
              </ul>

              <h3 className="text-lg sm:text-xl font-medium text-gray-700 mb-2 sm:mb-3">Payment Terms</h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Payment is due at the time of purchase. We accept various payment methods as displayed 
                during checkout. You agree to pay all charges incurred by you or any users of your account.
              </p>
            </section>

            {/* Shipping and Delivery */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Shipping and Delivery</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We will make reasonable efforts to ship products within the timeframe specified. However, 
                delivery dates are estimates and we are not liable for delays caused by:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Shipping carrier delays</li>
                <li>Weather conditions</li>
                <li>Natural disasters</li>
                <li>Government restrictions</li>
                <li>Other circumstances beyond our control</li>
              </ul>
            </section>

            {/* Returns and Refunds */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Returns and Refunds</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Please refer to our detailed Return and Refund Policy for information about returns, 
                exchanges, and refunds. Key points include:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Return period limitations</li>
                <li>Condition requirements for returned items</li>
                <li>Refund processing timeframes</li>
                <li>Return shipping responsibilities</li>
              </ul>
            </section>

            {/* User Conduct */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">User Conduct</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                You agree not to use our services for any unlawful purpose or in any way that could 
                damage, disable, or impair our services. Prohibited activities include:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
                <li>Transmitting harmful or malicious code</li>
                <li>Attempting to gain unauthorized access</li>
                <li>Harassing or threatening other users</li>
                <li>Providing false or misleading information</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Intellectual Property</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                All content on our website, including text, graphics, logos, images, and software, is the 
                property of Gimex Ortho or its licensors and is protected by copyright, trademark, and 
                other intellectual property laws. You may not:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Copy, modify, or distribute our content without permission</li>
                <li>Use our trademarks or logos without authorization</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Create derivative works based on our content</li>
              </ul>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Disclaimer of Warranties</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                Our services are provided "as is" and "as available" without any warranties of any kind, 
                either express or implied. We disclaim all warranties, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Merchantability and fitness for a particular purpose</li>
                <li>Non-infringement</li>
                <li>Accuracy, reliability, or completeness of information</li>
                <li>Uninterrupted or error-free service</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Limitation of Liability</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                To the maximum extent permitted by law, Gimex Ortho shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Loss of profits or revenue</li>
                <li>Loss of data or information</li>
                <li>Business interruption</li>
                <li>Personal injury or property damage</li>
              </ul>
            </section>

            {/* Indemnification */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Indemnification</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                You agree to indemnify, defend, and hold harmless Gimex Ortho and its officers, directors, 
                employees, and agents from any claims, damages, losses, or expenses arising from:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Your use of our services</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any third-party rights</li>
                <li>Any content you submit or transmit</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Termination</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We may terminate or suspend your account and access to our services immediately, without 
                prior notice, for any reason, including breach of these Terms. Upon termination:
              </p>
              <ul className="list-disc list-inside text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 space-y-1 sm:space-y-2 pl-2 sm:pl-0">
                <li>Your right to use our services will cease immediately</li>
                <li>You remain liable for all charges incurred</li>
                <li>We may delete your account and all associated data</li>
                <li>Surviving provisions will remain in effect</li>
              </ul>
            </section>

            {/* Governing Law */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Governing Law</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                These Terms shall be governed by and construed in accordance with the laws of [Your 
                Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from 
                these Terms shall be resolved in the courts of [Your Jurisdiction].
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Changes to These Terms</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of any 
                material changes by posting the updated Terms on our website and updating the "Last updated" 
                date. Your continued use of our services after changes become effective constitutes 
                acceptance of the new Terms.
              </p>
            </section>

            {/* Severability */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Severability</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                If any provision of these Terms is held to be unenforceable or invalid, such provision 
                will be changed and interpreted to accomplish the objectives of such provision to the 
                greatest extent possible under applicable law, and the remaining provisions will continue 
                in full force and effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">Contact Us</h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-3 sm:mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                <p className="text-sm sm:text-base text-gray-700 font-medium">Gimex International</p>
                <p className="text-xs sm:text-sm text-gray-600">Email: gimex@gimexortho.com</p>
                <p className="text-xs sm:text-sm text-gray-600">Phone: [Your Phone Number]</p>
                <p className="text-xs sm:text-sm text-gray-600">Address: [Your Business Address]</p>
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

export default TermsOfService;