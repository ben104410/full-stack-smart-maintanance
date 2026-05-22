import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Hammer, 
  ShieldCheck, 
  BarChart3, 
  Users, 
  Mail, 
  Phone, 
  MapPin, 
  Menu, 
  X, 
  ArrowRight,
  Settings,
  ClipboardList
} from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-blue-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500 p-2 rounded-lg">
                <Settings className="h-8 w-8 text-blue-900" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight block leading-none">PWANI UNIVERSITY</span>
                <span className="text-xs font-medium text-yellow-500 tracking-widest uppercase">Smart Maintenance System</span>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="hover:text-yellow-500 font-medium transition-colors">Home</Link>
              <Link to="/core-capabilities" className="hover:text-yellow-500 font-medium transition-colors">Capabilities</Link>
              <Link to="/portals" className="hover:text-yellow-500 font-medium transition-colors">Portals</Link>
              <Link to="/contact" className="hover:text-yellow-500 font-medium transition-colors">Contact</Link>
              <Link to="/admin" className="hover:text-yellow-500 font-medium transition-colors">Admin Dashboard</Link>
              <Link 
                to="/login" 
                className="bg-yellow-500 text-blue-900 px-6 py-2 rounded-full font-bold hover:bg-yellow-400 transition-all transform hover:scale-105"
              >
                Login
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-800 border-t border-blue-700 px-4 pt-2 pb-6 space-y-1">
            <Link to="/" className="block px-3 py-2 text-base font-medium hover:bg-blue-700 rounded-md">Home</Link>
            <Link to="/core-capabilities" className="block px-3 py-2 text-base font-medium hover:bg-blue-700 rounded-md">Capabilities</Link>
            <Link to="/portals" className="block px-3 py-2 text-base font-medium hover:bg-blue-700 rounded-md">Portals</Link>
            <Link to="/contact" className="block px-3 py-2 text-base font-medium hover:bg-blue-700 rounded-md">Contact</Link>
            <Link to="/login" className="block px-3 py-2 text-base font-bold text-yellow-500">Login</Link>
            <Link to="/admin" className="block px-3 py-2 text-base font-bold text-yellow-500">Admin Dashboard</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-blue-900 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000" 
            alt="University Campus" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
            Excellence in <span className="text-yellow-500">Facility Management</span>
          </h1>
          <p className="text-xl text-white font-medium mb-10 max-w-2xl mx-auto drop-shadow-sm">
            Ensuring a conducive environment for learning through efficient maintenance tracking, asset management, and rapid technician response.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-blue-900 bg-yellow-500 hover:bg-yellow-400 shadow-xl transition-all"
            >
              Submit a Request <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/core-capabilities" 
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-bold rounded-xl text-white hover:bg-white hover:text-blue-900 transition-all"
            >
              View Capabilities
            </Link>
          </div>
        </div>
      </div>

      {/* Portal Access Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Staff/Student Portal */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:-translate-y-2 border-b-4 border-blue-900">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Users className="h-8 w-8 text-blue-900" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Community Portal</h3>
            <p className="text-slate-800 font-medium mb-6">For students and staff to report damaged facilities, track request status, and provide feedback.</p>
            <Link to="/login" className="text-blue-900 font-bold inline-flex items-center hover:text-yellow-600">
              Access Portal <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Technician Portal */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:-translate-y-2 border-b-4 border-yellow-500">
            <div className="bg-yellow-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <Hammer className="h-8 w-8 text-yellow-600" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Technician Hub</h3>
            <p className="text-slate-800 font-medium mb-6">Manage assigned maintenance tasks, update repair progress, and log facility conditions in real-time.</p>
            <Link to="/login" className="text-blue-900 font-bold inline-flex items-center hover:text-yellow-600">
              Access Portal <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Admin Portal */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:-translate-y-2 border-b-4 border-blue-900">
            <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="h-8 w-8 text-blue-900" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Administration</h3>
            <p className="text-slate-800 font-medium mb-6">Oversee campus-wide maintenance, manage assets, assign personnel, and monitor analytics.</p>
            <Link to="/login" className="text-blue-900 font-bold inline-flex items-center hover:text-yellow-600">
              Access Portal <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4 tracking-tight">Core System Capabilities</h2>
            <p className="text-slate-700 font-semibold max-w-2xl mx-auto text-lg">Powered by advanced tracking to ensure Pwani University facilities remain top-tier.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <ClipboardList className="h-8 w-8 text-blue-900" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Smart Logging</h4>
              <p className="text-slate-700 font-medium">Easy maintenance requests with image uploads and location tagging.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <BarChart3 className="h-8 w-8 text-blue-900" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Real-time Tracking</h4>
              <p className="text-slate-700 font-medium">Live status updates from "In Progress" to "Completed" for transparency.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Settings className="h-8 w-8 text-blue-900" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Asset Life-cycle</h4>
              <p className="text-slate-700 font-medium">Comprehensive database of campus assets including condition and history.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <ShieldCheck className="h-8 w-8 text-blue-900" />
              </div>
              <h4 className="text-xl font-bold text-blue-900 mb-2">Accountability</h4>
              <p className="text-slate-700 font-medium">Full audit logs and activity tracking for administrative oversight.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Footer */}
      <footer className="bg-blue-950 text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-blue-800 pb-12">
            <div>
              <h5 className="text-yellow-500 font-bold uppercase mb-6 tracking-widest text-sm">Quick Links</h5>
              <ul className="space-y-4 text-white font-medium">
                <li><Link to="/portals" className="hover:text-yellow-500 transition-colors">Portals</Link></li>
                <li><Link to="/core-capabilities" className="hover:text-yellow-500 transition-colors">Capabilities</Link></li>
                <li><Link to="/privacy" className="hover:text-yellow-500 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-yellow-500 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>

            <div className="flex flex-col items-center text-center space-y-6">
              <div className="flex items-center space-x-3">
                <Settings className="h-8 w-8 text-yellow-500" />
                <span className="text-xl font-bold uppercase tracking-wider">Pwani SMS</span>
              </div>
              <p className="text-white font-medium max-w-xs">
                Official facility maintenance and asset tracking portal for Pwani University. Dedicated to institutional growth.
              </p>
            </div>

            <div className="md:text-right">
              <h5 className="text-yellow-500 font-bold uppercase mb-6 tracking-widest text-sm">Portals</h5>
              <ul className="space-y-4 text-white font-medium">
                <li><Link to="/login" className="hover:text-yellow-500 transition-colors">Student/Staff Login</Link></li>
                <li><Link to="/login" className="hover:text-yellow-500 transition-colors">Technician Hub</Link></li>
                <li><Link to="/login" className="hover:text-yellow-500 transition-colors">Admin Dashboard</Link></li>
                <li><Link to="/feedback" className="hover:text-yellow-500 transition-colors">System Feedback</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mb-16 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 text-white font-medium text-center md:text-left">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-yellow-500" />
              <span>+254 700 000000</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-3 text-yellow-500" />
              <span>maintenance@pu.ac.ke</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 mr-3 text-yellow-500" />
              <span>Kilifi, Kenya | P.O. Box 195-80108</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-400 text-sm">
              &copy; {new Date().getFullYear()} Pwani University Smart Maintenance System. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              {/* Social Media Placeholders */}
              <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                <span className="sr-only">Facebook</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center hover:bg-yellow-500 transition-colors cursor-pointer">
                <span className="sr-only">Twitter</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}