'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [service, setService] = useState('Cleaning');
  const [location, setLocation] = useState('Greater Toronto Area');
  const [businessInfo, setBusinessInfo] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email !== confirmEmail) {
      setEmailError('Email addresses must match.');
      return;
    }

    setEmailError('');
    setSubmitted(true);

    setTimeout(() => {
      setEmail('');
      setConfirmEmail('');
      setFirstName('');
      setLastName('');
      setBusinessName('');
      setService('Cleaning');
      setLocation('Greater Toronto Area');
      setBusinessInfo('');
      setSubmitted(false);
    }, 2000);
  };

  const handleConfirmEmailChange = (value: string) => {
    setConfirmEmail(value);
    if (emailError && value === email) {
      setEmailError('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0E0E18] text-white font-sans">
      <nav className="border-b border-[rgba(255,255,255,0.08)] sticky top-0 bg-[#0E0E18]/95 backdrop-blur-sm z-50">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold text-white">yourlead.io</div>
          <a href="#signup-form" className="px-5 py-2 bg-[#5C4BD4] text-white rounded-lg hover:bg-[#6b5ce6] transition-colors font-medium text-sm">
            Get Started
          </a>
        </div>
      </nav>

      <section className="max-w-6xl mx-auto px-6 py-14 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight text-white">
          Your next customer is asking for help right now.
        </h1>
        <p className="text-lg md:text-xl text-[#8B8FA8] max-w-2xl mx-auto leading-relaxed mb-8">
          We scan thousands of online signals daily and send you a ready-to-send message before your competitor even sees it.
        </p>
        <a href="#signup-form" className="inline-block px-8 py-3 bg-[#5C4BD4] text-white rounded-lg hover:bg-[#6b5ce6] transition-colors font-semibold text-base">
          Start my free 7-day trial →
        </a>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1A1A2E] border border-[rgba(255,255,255,0.08)] rounded-lg p-6 text-center">
            <div className="w-11 h-11 bg-[#5C4BD4] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
              1
            </div>
            <h3 className="text-lg font-bold mb-2">Create your free account in 60 seconds</h3>
            <p className="text-[#8B8FA8] text-sm">Simple signup so you can start fast.</p>
          </div>
          <div className="bg-[#1A1A2E] border border-[rgba(255,255,255,0.08)] rounded-lg p-6 text-center">
            <div className="w-11 h-11 bg-[#5C4BD4] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
              2
            </div>
            <h3 className="text-lg font-bold mb-2">We monitor Facebook, Reddit, and local forums around the clock</h3>
            <p className="text-[#8B8FA8] text-sm">We watch the places your customers are posting.</p>
          </div>
          <div className="bg-[#1A1A2E] border border-[rgba(255,255,255,0.08)] rounded-lg p-6 text-center">
            <div className="w-11 h-11 bg-[#5C4BD4] rounded-full flex items-center justify-center text-white font-bold text-lg mb-4">
              3
            </div>
            <h3 className="text-lg font-bold mb-2">Get a lead alert with an AI-generated reply ready to send</h3>
            <p className="text-[#8B8FA8] text-sm">Reply fast and win the customer first.</p>
          </div>
        </div>
      </section>

      <section id="signup-form" className="max-w-2xl mx-auto px-6 py-14">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Start your free 7-day trial</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-[#1A1A2E] border border-[rgba(255,255,255,0.08)] rounded-lg p-6 space-y-5"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 bg-[#0E0E18] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B8FA8] focus:outline-none focus:border-[#5C4BD4] focus:ring-1 focus:ring-[#5C4BD4]"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm email address</label>
              <input
                type="email"
                required
                value={confirmEmail}
                onChange={(e) => handleConfirmEmailChange(e.target.value)}
                className="w-full px-3 py-3 bg-[#0E0E18] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B8FA8] focus:outline-none focus:border-[#5C4BD4] focus:ring-1 focus:ring-[#5C4BD4]"
                placeholder="Confirm your email"
              />
              {emailError ? (
                <p className="mt-2 text-xs text-red-400">{emailError}</p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">First name</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-3 bg-[#0E0E18] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B8FA8] focus:outline-none focus:border-[#5C4BD4] focus:ring-1 focus:ring-[#5C4BD4]"
                placeholder="First name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last name</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-3 bg-[#0E0E18] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B8FA8] focus:outline-none focus:border-[#5C4BD4] focus:ring-1 focus:ring-[#5C4BD4]"
                placeholder="Last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Business name</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full px-3 py-3 bg-[#0E0E18] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B8FA8] focus:outline-none focus:border-[#5C4BD4] focus:ring-1 focus:ring-[#5C4BD4]"
              placeholder="Your business name"
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium mb-2">Service</label>
              <div className="relative">
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  disabled
                  className="w-full px-3 py-3 bg-[#0E0E18] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#5C4BD4] focus:ring-1 focus:ring-[#5C4BD4] appearance-none cursor-not-allowed opacity-75"
                >
                  <option>Cleaning</option>
                </select>
              </div>
              <p className="text-xs text-[#8B8FA8] mt-2">More industries coming soon</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <div className="relative">
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled
                  className="w-full px-3 py-3 bg-[#0E0E18] border border-[rgba(255,255,255,0.08)] rounded-lg text-white focus:outline-none focus:border-[#5C4BD4] focus:ring-1 focus:ring-[#5C4BD4] appearance-none cursor-not-allowed opacity-75"
                >
                  <option>Greater Toronto Area</option>
                </select>
              </div>
              <p className="text-xs text-[#8B8FA8] mt-2">More cities coming soon</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Share more about your business <span className="text-[#8B8FA8]">(optional)</span>
            </label>
            <textarea
              value={businessInfo}
              onChange={(e) => setBusinessInfo(e.target.value)}
              className="w-full px-3 py-3 bg-[#0E0E18] border border-[rgba(255,255,255,0.08)] rounded-lg text-white placeholder-[#8B8FA8] focus:outline-none focus:border-[#5C4BD4] focus:ring-1 focus:ring-[#5C4BD4] resize-none"
              placeholder="Share more about your business so we match you to your best customers"
              rows={4}
            />
            <p className="text-xs text-[#8B8FA8] mt-3">
              7-day free trial — then $29.99/month. Cancel anytime.
            </p>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-[#5C4BD4] text-white rounded-lg hover:bg-[#6b5ce6] transition-colors font-semibold text-base"
          >
            {submitted ? '✓ Trial started!' : 'Start my free 7-day trial →'}
          </button>
        </form>
      </section>

      <footer className="border-t border-[rgba(255,255,255,0.08)] bg-[#0E0E18] py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-[#8B8FA8]">
          <span>yourlead.io</span>
          <span>·</span>
          <a href="mailto:hello@yourlead.io" className="hover:text-white transition-colors">
            hello@yourlead.io
          </a>
        </div>
      </footer>
    </div>
  );
}

