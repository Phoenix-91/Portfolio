import { motion } from 'framer-motion';
import { services } from '../constants';

const ServiceCard = ({ index, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-tertiary p-6 rounded-2xl shadow-card w-full max-w-sm mx-auto"
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-white font-bold text-xl">{title}</h3>
        <p className="text-secondary text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <section className="relative w-full min-h-screen mx-auto pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-violet-500 font-semibold sm:text-lg">ABOUT ME</p>
          <h2 className="text-white font-black md:text-5xl sm:text-4xl text-3xl mt-1 mb-4">Overview.</h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-secondary text-base md:text-lg max-w-3xl mb-16"
        >
          I'm a passionate web developer and UI/UX designer currently pursuing my BCA at Chandigarh University. 
          I specialize in building modern, responsive web applications using React, JavaScript, and other cutting-edge technologies.
          With a strong foundation in both front-end and back-end development, I'm able to create complete, user-friendly web solutions.
          I'm dedicated to continuous learning and staying updated with the latest trends in web development and design.
        </motion.p>

        <div>
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-white font-bold text-2xl mb-10"
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20"
        >
          <h3 className="text-white font-bold text-2xl mb-6">Education</h3>
          <div className="bg-tertiary p-6 rounded-2xl shadow-card">
            <h4 className="text-white font-semibold text-lg">BCA - Bachelor of Computer Applications</h4>
            <p className="text-secondary">Chandigarh University</p>
            <p className="text-violet-500 mt-2">2021 - Present</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 