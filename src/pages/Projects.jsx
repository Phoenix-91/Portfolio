import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '../constants';
import { useState, useEffect } from 'react';

const ProjectCard = ({ index, name, description, tags, image, source_code_link, live_demo_link }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: '0px 10px 30px -5px rgba(124, 58, 237, 0.2)' }}
      className="glass-card sm:w-[360px] w-full h-full flex flex-col bg-black/60 border-white/5 hover:border-purple-600/30"
    >
      <div className="relative w-full h-[200px] group overflow-hidden rounded-t-lg">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
        />

        <div className="absolute inset-0 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-70 backdrop-blur-sm">
          <motion.a 
            href={source_code_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/80 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-purple-600/50 hover:border-purple-500"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaGithub className="w-5 h-5 text-purple-400" />
          </motion.a>
          <motion.a 
            href={live_demo_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black/80 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer border border-purple-600/50 hover:border-purple-500"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaExternalLinkAlt className="w-4 h-4 text-purple-400" />
          </motion.a>
        </div>
      </div>

      <div className="mt-5 flex-1 flex flex-col p-5">
        <h3 className="text-white font-bold text-xl">{name}</h3>
        <p className="mt-2 text-gray-400 text-sm leading-relaxed">{description}</p>
      </div>

      <div className="p-5 pt-0 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <p 
            key={tag.name} 
            className={`text-xs ${tag.color} px-3 py-1.5 rounded-full bg-black/40 border border-purple-600/20`}
          >
            #{tag.name}
          </p>
        ))}
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      
      reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    setIsLoaded(true);
    
    // Trigger once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <section className="relative w-full min-h-screen mx-auto pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="mb-10 reveal"
        >
          <p className="text-purple-400 font-semibold sm:text-lg tracking-wider">MY WORK</p>
          <h2 className="text-white font-black md:text-5xl sm:text-4xl text-3xl mt-1 purple-text-gradient">Projects.</h2>
        
          <motion.div
            className="mt-3 text-gray-300 text-base md:text-lg max-w-3xl reveal"
          >
            <p className="mb-4">
              The following projects showcase my skills and experience through real-world examples of my work.
              Each project is briefly described with links to code repositories and live demos.
            </p>
            
            <div className="relative mt-8 mb-12">
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 bg-black/60 backdrop-filter backdrop-blur-lg rounded-lg outline-none text-white shadow-md focus:ring-2 focus:ring-purple-600/50 border border-white/10 transition-all focus:border-purple-500"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 reveal">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={`project-${index}`} index={index} {...project} />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-16 text-gray-400"
          >
            <p className="text-xl">No projects found matching your search criteria.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-purple-400 hover:text-purple-300 animated-btn py-2 px-4 rounded-full border border-purple-700/30 hover:border-purple-500/50 transition-all"
            >
              Clear search
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects; 