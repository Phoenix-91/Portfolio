import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "#about" },
  { title: "Projects", path: "/projects" },
  { title: "Skills", path: "/skills" },
  { title: "Contact", path: "/contact" },
];

const PLogo = () => {
  return (
    <div className="relative flex items-center">
      <div className="h-10 w-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-2xl">P</span>
        <motion.div
          className="absolute -top-1 -right-1 h-3 w-3 bg-violet-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        <motion.div
          className="absolute -bottom-1 -left-1 h-2 w-2 bg-indigo-400 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            delay: 0.5,
          }}
        />
      </div>
      <span className="ml-2 text-white font-semibold text-lg">Paramveer</span>
    </div>
  );
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll function for anchor links
  const handleAnchorClick = (e, id) => {
    if (id.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(id);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
      if (toggle) setToggle(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-5 flex justify-center items-center">
      <div className={`
        w-full max-w-6xl mx-auto px-6 py-4 
        backdrop-blur-xl rounded-xl 
        transition-all duration-300
        ${scrolled ? 'bg-black/70 shadow-lg' : 'bg-black/40'} 
        border border-white/10
      `}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <PLogo />
          
          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.title}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
              >
                <Link 
                  to={link.path}
                  onClick={(e) => handleAnchorClick(e, link.path)}
                  className="text-gray-300 hover:text-white text-base font-medium transition-colors duration-300"
                >
                  {link.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-500 group-hover:w-full transition-all duration-300"></span>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              className="w-10 h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? 
                <FaTimes size={20} className="text-violet-400" /> : 
                <FaBars size={20} className="text-violet-400" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {toggle && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            fixed top-20 left-4 right-4 
            p-6 bg-black/80 backdrop-blur-xl 
            rounded-2xl shadow-xl border border-white/10
            md:hidden
          "
        >
          <ul className="flex flex-col items-center space-y-6">
            {navLinks.map((link) => (
              <li
                key={link.title}
                className="font-medium text-[18px] text-gray-300 hover:text-violet-400 transition-colors"
                onClick={() => handleAnchorClick(window.event, link.path)}
              >
                <Link to={link.path}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 