import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#e0f6fa] dark:bg-[#020617]">
      <div className="max-w-5xl mx-auto px-4 py-16">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#03045E] dark:text-sky-400">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Please read these terms carefully before using our Habit Tracker.
          </p>
        </div>

        {/* Content Card */}
        <div
          className="
            bg-white dark:bg-slate-900
            rounded-2xl shadow-lg
            border border-sky-100 dark:border-slate-800
            p-6 md:p-10
            space-y-8
          "
        >
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-semibold text-[#0077B6] dark:text-sky-300">
              1. Acceptance of Terms
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              By accessing or using this application, you agree to be bound by
              these Terms and Conditions. If you do not agree, please do not use
              the service.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-semibold text-[#0077B6] dark:text-sky-300">
              2. User Responsibilities
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              You are responsible for maintaining the accuracy of your habit
              data and for keeping your account credentials secure.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-semibold text-[#0077B6] dark:text-sky-300">
              3. Data & Privacy
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              We respect your privacy. Your personal data will not be shared
              with third parties without your consent, except as required by
              law.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-semibold text-[#0077B6] dark:text-sky-300">
              4. Prohibited Activities
            </h2>
            <ul className="mt-2 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
              <li>Using the app for illegal purposes</li>
              <li>Attempting to hack or disrupt the system</li>
              <li>Submitting false or misleading information</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-semibold text-[#0077B6] dark:text-sky-300">
              5. Limitation of Liability
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              We are not responsible for any loss or damage arising from the use
              of this application.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-semibold text-[#0077B6] dark:text-sky-300">
              6. Changes to Terms
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed">
              We may update these Terms & Conditions at any time. Continued use
              of the app means you accept the updated terms.
            </p>
          </div>

          {/* Footer note */}
          <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
              Last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
