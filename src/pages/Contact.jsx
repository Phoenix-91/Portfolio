import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGithub, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validate();
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        
        // Reset submitted state after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <section className="relative w-full min-h-screen mx-auto pt-24 pb-16 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="mb-10 reveal"
        >
          <p className="text-gray-300 font-semibold sm:text-lg">GET IN TOUCH</p>
          <h2 className="text-white font-black md:text-5xl sm:text-4xl text-3xl mt-1 mb-4 bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">Contact.</h2>
        
          <motion.p
            className="text-gray-400 text-base md:text-lg max-w-3xl mb-8 reveal"
          >
            Have a project in mind or want to discuss potential opportunities? Feel free to reach out to me using the form below or through any of my social platforms.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Contact form */}
          <motion.div 
            className="glass-card p-8 reveal"
          >
            <h3 className="text-white font-bold text-2xl mb-6">Send me a message</h3>
            
            {submitted ? (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-5 text-center my-6">
                <p className="text-lg text-gray-200 mb-2">Thank you for your message!</p>
                <p className="text-gray-400">I'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-gray-300 text-sm font-medium">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 bg-black/60 backdrop-filter backdrop-blur-lg rounded-lg outline-none text-white shadow-md focus:ring-2 border transition-all ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-gray-600 focus:ring-gray-600'}`}
                    placeholder="John Doe"
                  />
                  {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-gray-300 text-sm font-medium">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 bg-black/60 backdrop-filter backdrop-blur-lg rounded-lg outline-none text-white shadow-md focus:ring-2 border transition-all ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-gray-600 focus:ring-gray-600'}`}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-gray-300 text-sm font-medium">Your Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full p-3 bg-black/60 backdrop-filter backdrop-blur-lg rounded-lg outline-none text-white shadow-md focus:ring-2 border transition-all ${formErrors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-white/10 focus:border-gray-600 focus:ring-gray-600'}`}
                    placeholder="I'm interested in working with you on..."
                  ></textarea>
                  {formErrors.message && <p className="text-red-500 text-xs mt-1">{formErrors.message}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full animated-btn py-3 px-8 rounded-lg border border-gray-700 text-white font-medium transition-all ${isSubmitting ? 'bg-gray-700 cursor-not-allowed' : 'bg-black hover:bg-black/80'}`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
          
          {/* Contact info */}
          <motion.div 
            className="reveal flex flex-col justify-between"
          >
            <div className="glass-card p-8 mb-6 flex-1">
              <h3 className="text-white font-bold text-2xl mb-6">Contact Information</h3>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-gray-300 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Location</h4>
                    <p className="text-gray-400">Chandigarh, India</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 p-3 rounded-full">
                    <FaEnvelope className="text-gray-300 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Email</h4>
                    <a href="mailto:paramveerpc2211@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                      paramveerpc2211@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gray-800 p-3 rounded-full">
                    <FaPhone className="text-gray-300 text-xl" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Phone</h4>
                    <p className="text-gray-400">Available on request</p>
                  </div>
                </div>
              </div>
              
              <h4 className="text-white font-medium mb-4">Connect with me</h4>
              <div className="flex gap-3">
                <a 
                  href="https://github.com/Phoenix-91" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                >
                  <FaGithub className="text-gray-300" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/paramveer-rana-719545324" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-gray-700"
                >
                  <FaLinkedinIn className="text-gray-300" />
                </a>
              </div>
            </div>
            
            <div className="glass-card p-8 hidden md:block">
              <h3 className="text-white font-bold text-xl mb-4">Let's build something together</h3>
              <p className="text-gray-400">
                I'm always open to new opportunities and interesting projects. Don't hesitate to reach out!
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;