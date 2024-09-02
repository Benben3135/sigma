import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-violet-800 to-indigo-900 text-white py-8 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Sigma</h3>
            <p className="text-sm">Empowering your journey to a healthier, more balanced life through innovative fitness and wellness solutions.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="text-sm hover:text-violet-300 transition-colors">Dashboard</Link></li>
              <li><Link href="/dashboard/challenges" className="text-sm hover:text-violet-300 transition-colors">Challenges</Link></li>
              <li><Link href="/dashboard/nutrition" className="text-sm hover:text-violet-300 transition-colors">Nutrition</Link></li>
              <li><Link href="/dashboard/workouts" className="text-sm hover:text-violet-300 transition-colors">Workouts</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/faq" className="text-sm hover:text-violet-300 transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-violet-300 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="text-sm hover:text-violet-300 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm hover:text-violet-300 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-violet-300 transition-colors"><FaFacebook size={24} /></a>
              <a href="#" className="text-white hover:text-violet-300 transition-colors"><FaTwitter size={24} /></a>
              <a href="#" className="text-white hover:text-violet-300 transition-colors"><FaInstagram size={24} /></a>
              <a href="#" className="text-white hover:text-violet-300 transition-colors"><FaLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-violet-700 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Sigma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
