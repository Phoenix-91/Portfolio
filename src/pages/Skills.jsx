import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGitAlt, FaFigma, FaPhp } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiPostman, SiMysql } from 'react-icons/si';

const SkillIcon = ({ icon: Icon, name, color }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.1, 
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
      }}
      className="glass-card p-6 flex flex-col items-center justify-center gap-3 transition-all duration-300 group"
    >
      <Icon size={50} className={`${color} group-hover:text-white transition-colors duration-300`} />
      <p className="text-gray-300 font-medium">{name}</p>
    </motion.div>
  );
};

const Skills = () => {
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

  const programmingSkills = [
    { name: "HTML5", icon: FaHtml5, color: "text-orange-500" },
    { name: "CSS3", icon: FaCss3Alt, color: "text-blue-500" },
    { name: "JavaScript", icon: FaJsSquare, color: "text-yellow-400" },
    { name: "React", icon: FaReact, color: "text-blue-400" },
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500" }
  ];

  const toolsSkills = [
    { name: "MongoDB", icon: SiMongodb, color: "text-green-400" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-600" },
    { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
    { name: "Figma", icon: FaFigma, color: "text-gray-400" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
    { name: "Postman", icon: SiPostman, color: "text-orange-500" }
  ];

  return (
    <section className="relative w-full min-h-screen mx-auto pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="reveal"
        >
          <p className="text-gray-300 font-semibold sm:text-lg">MY SKILLS</p>
          <h2 className="text-white font-black md:text-5xl sm:text-4xl text-3xl mt-1 mb-10 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">Technical Expertise</h2>
        </motion.div>

        <div className="mb-16 reveal">
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mb-10">
            I've developed expertise in a range of technologies that allow me to build modern, 
            responsive, and user-friendly web applications. Here are the key technologies I work with:
          </p>
          
          <div className="mb-12">
            <h3 className="text-white font-bold text-xl mb-6 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">Programming Languages & Frameworks</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {programmingSkills.map((skill, index) => (
                <SkillIcon 
                  key={index}
                  icon={skill.icon}
                  name={skill.name}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold text-xl mb-6 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">Tools & Technologies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {toolsSkills.map((skill, index) => (
                <SkillIcon 
                  key={index}
                  icon={skill.icon}
                  name={skill.name}
                  color={skill.color}
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-20 glass-card p-8 reveal"
        >
          <h3 className="text-white font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">Areas of Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-white font-semibold text-lg mb-3">Frontend Development</h4>
              <p className="text-gray-300">Creating responsive and dynamic user interfaces with modern JavaScript frameworks and CSS techniques.</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-white font-semibold text-lg mb-3">UI/UX Design</h4>
              <p className="text-gray-300">Designing intuitive and visually appealing interfaces that provide exceptional user experiences.</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-white font-semibold text-lg mb-3">Backend Development</h4>
              <p className="text-gray-300">Building robust server-side applications and APIs using Node.js, Express, MongoDB, and MySQL.</p>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-white font-semibold text-lg mb-3">Responsive Design</h4>
              <p className="text-gray-300">Ensuring websites look and function perfectly across all devices and screen sizes.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;