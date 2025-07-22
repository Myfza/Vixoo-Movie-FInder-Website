import React from 'react';
import { Github, Linkedin, Globe, Instagram } from 'lucide-react';

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/muhammadyusufaditiya',
      ariaLabel: 'Visit Muhammad Yusuf Aditiya\'s GitHub profile'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/muhammadyusufaditiya',
      ariaLabel: 'Visit Muhammad Yusuf Aditiya\'s LinkedIn profile'
    },
    {
      name: 'Website',
      icon: Globe,
      url: 'https://muhammadyusufaditiya.com',
      ariaLabel: 'Visit Muhammad Yusuf Aditiya\'s personal website'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/muhammadyusufaditiya',
      ariaLabel: 'Visit Muhammad Yusuf Aditiya\'s Instagram profile'
    }
  ];

  return (
    <footer className="bg-[#1a1a1a] border-t border-[#8b5cf6]/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col items-center space-y-4 sm:space-y-6">
          {/* Social Media Buttons */}
          <div className="flex items-center justify-center space-x-4 sm:space-x-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="group relative p-3 sm:p-4 bg-[#0f0f0f] border border-gray-600 rounded-full hover:border-[#8b5cf6] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-[#8b5cf6]/50 touch-target"
                >
                  <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400 group-hover:text-[#8b5cf6] transition-colors duration-300" />
                  </div>
                  
                  {/* Purple glow effect */}
                  <div className="absolute inset-0 rounded-full bg-[#8b5cf6]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#8b5cf6] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {social.name}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Made By Text */}
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-400 font-medium">
              Made with <span className="text-red-500 animate-pulse">❤️</span> by{' '}
              <span className="text-[#8b5cf6] font-semibold hover:text-white transition-colors duration-300 cursor-default">
                Muhammad Yusuf Aditiya
              </span>
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center pt-2 border-t border-gray-700/50 w-full">
            <p className="text-xs sm:text-sm text-gray-500">
              © {new Date().getFullYear()} Vixo. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}