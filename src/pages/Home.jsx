import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useState, useEffect, useRef } from 'react';
import { services } from '../constants';
import { FaArrowDown, FaUserAlt, FaCode, FaEnvelope } from 'react-icons/fa';
import HeroCanvas from '../components/HeroCanvas';
import ParticlesBackground from '../components/ParticlesBackground';

const ServiceCard = ({ index, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card w-full max-w-sm mx-auto p-6"
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-white font-bold text-xl">{title}</h3>
        <p className="text-gray-300 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const Home = () => {
  const [showElements, setShowElements] = useState(false);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const educationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setShowElements(true);

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

  return (
    <>
      <section className="relative w-full h-screen mx-auto">
        {/* Particles background only for hero section */}
        <div className="absolute inset-0 z-0">
          <ParticlesBackground />
        </div>
        
        <div className="relative sm:px-16 px-6 h-full z-10 flex items-center">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left md:text-left"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6">
                <span className="flex flex-col justify-start items-start gap-2 sm:gap-4">
                  Hi, I'm 
                  <span className="animate-gradient-text">Paramveer</span>
                </span>
              </h1>
              
              <div className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-300 mb-8 h-12">
                <Typewriter
                  options={{
                    strings: [
                      'Web Developer',
                      'UI/UX Designer',
                      'Student'
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
              
              <p className="text-gray-400 text-base sm:text-lg max-w-xl mb-12">
                I create stunning web experiences with modern technologies.
                Let's build something amazing together!
              </p>
              
              <div className="flex flex-wrap gap-6">
                <Link to="/projects">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    className="animated-btn bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-full transition-all"
                  >
                    My Projects
                  </motion.button>
                </Link>
                
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05, borderColor: "#7C3AED" }}
                    whileTap={{ scale: 0.95 }}
                    className="animated-btn bg-transparent hover:bg-white/5 text-white border border-white/20 font-semibold py-3 px-8 rounded-full transition-all"
                  >
                    Contact Me
                  </motion.button>
                </Link>
              </div>
            </motion.div>
            
            {/* Right Column - Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex justify-center items-center"
            >
              <div className="relative">
                {/* Animated border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 blur-2xl opacity-20 animate-pulse"></div>
                
                {/* Hexagon frame with avatar */}
                <div className="relative w-[350px] h-[350px] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 backdrop-blur-3xl rounded-3xl border border-white/10"></div>
                  
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <img 
                      src="https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=Black&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light" 
                      alt="Developer Avatar" 
                      className="w-4/5 h-4/5 object-cover z-10"
                    />
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-violet-500 rounded-full"></div>
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-indigo-500 rounded-full"></div>
                  <div className="absolute top-1/2 left-4 w-2 h-2 bg-violet-400 rounded-full"></div>
                  <div className="absolute bottom-1/3 right-4 w-2 h-2 bg-indigo-400 rounded-full"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 w-full flex justify-center">
          <a href="#about" className="w-[35px] h-[64px] rounded-3xl border-4 border-white/20 flex justify-center items-start p-2 hover:border-violet-500 transition-colors duration-300">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-violet-500"
            />
          </a>
        </div>
      </section>
      
      <section id="about" ref={aboutRef} className="relative w-full min-h-screen mx-auto py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#160824] to-black opacity-90 z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            className="mb-12 reveal"
          >
            <p className="text-violet-500 font-semibold sm:text-lg">ABOUT ME</p>
            <h2 className="text-white font-black md:text-5xl sm:text-4xl text-3xl mt-1 mb-4 bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent">Overview</h2>
          </motion.div>

          <motion.p
            className="text-gray-400 text-base md:text-lg max-w-3xl mb-16 reveal"
          >
            I'm a passionate web developer and UI/UX designer currently pursuing my BCA at Chandigarh University. 
            I specialize in building modern, responsive web applications using React, JavaScript, and other cutting-edge technologies.
            With a strong foundation in both front-end and back-end development, I'm able to create complete, user-friendly web solutions.
            I'm dedicated to continuous learning and staying updated with the latest trends in web development and design.
          </motion.p>
          
          <div ref={servicesRef}>
            <motion.h3
              className="text-white font-bold text-2xl mb-10 reveal"
            >
              What I do
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {services.map((service, index) => (
                <ServiceCard
                  key={`service-${index}`}
                  index={index}
                  {...service}
                />
              ))}
            </div>
          </div>
          
          <motion.div
            ref={educationRef}
            className="mt-20 reveal"
          >
            <h3 className="text-white font-bold text-2xl mb-6 bg-gradient-to-r from-violet-500 to-indigo-400 bg-clip-text text-transparent">Education</h3>
            <div className="glass-card p-6">
              <h4 className="text-white font-semibold text-lg">BCA - Bachelor of Computer Applications</h4>
              <p className="text-gray-300">Chandigarh University</p>
              <p className="text-violet-500 mt-2">2023 - 2026</p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Home; 