import { useCallback, useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

const ParticlesBackground = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false after component mounts to ensure client-side rendering
    setIsLoading(false);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    try {
      await loadFull(engine);
    } catch (error) {
      console.error("Failed to initialize particles:", error);
    }
  }, []);

  // Return null during server-side rendering or if there's an error loading tsparticles
  if (isLoading) {
    return null;
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="absolute inset-0 w-full h-full"
      options={{
        fullScreen: false,
        background: {
          color: {
            value: "#000000", // Pure black background
          },
        },
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: true,
              mode: "repulse",
              parallax: { enable: true, force: 50, smooth: 10 }
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 3,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#6d4ca0", // Slightly less intense purple
          },
          links: {
            color: "#5c3a9e", // Slightly less intense purple
            distance: 180,
            enable: true,
            opacity: 0.2, // Slightly more visible links
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "out",
            },
            random: true,
            speed: 0.5, // Slower movement
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1200, // More spread out
            },
            value: 60, // Slightly more particles
          },
          opacity: {
            value: {
              min: 0.05, // More visible
              max: 0.2, // More visible
            },
            animation: {
              enable: true,
              speed: 0.3,
              minimumValue: 0.05,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
            animation: {
              enable: true,
              speed: 1.5,
              minimumValue: 0.5,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBackground; 