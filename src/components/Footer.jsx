import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative w-full py-12 bg-black z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="text-2xl font-bold text-white">
              Paramveer
            </Link>
            <p className="mt-4 text-gray-400 max-w-md">
              Web developer passionate about creating intuitive and responsive user experiences. Specializing in modern web technologies and design.
            </p>
            
            {/* Social Links */}
            <div className="flex mt-6 space-x-4">
              <motion.a 
                href="https://github.com/Phoenix-91" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              >
                <FaGithub size={18} />
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/paramveer-rana-719545324" 
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </motion.a>
              <motion.a 
                href="mailto:paramveerpc2211@gmail.com" 
                whileHover={{ y: -3 }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-900 hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
              >
                <FaEnvelope size={18} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-gray-400 hover:text-white transition-colors">
                  Skills
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <Link to="/contact" className="text-gray-400 hover:text-white transition-colors inline-block mb-4">
              Get in Touch
            </Link>
            <p className="text-gray-400">
              Email: paramveerpc2211@gmail.com
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500">
            &copy; {currentYear} Paramveer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 