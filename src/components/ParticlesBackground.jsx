import React from "react";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";

const ParticlesBackground = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 800,
        pointerEvents: "none",
      }}
      options={{
        fullScreen: false,
        fpsLimit: 60,
        particles: {
          number: {
            value: 60,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#fff"
          },
          opacity: {
            value: 0.4
          },
          size: {
            value: 2.5,
            random: true
          },
          move: {
            enable: true,
            speed: 0.7,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out"
          },
          links: {
            enable: true,
            distance: 120,
            color: "#fff",
            opacity: 0.18,
            width: 1
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
              parallax: {
                enable: true,
                force: 60,
                smooth: 20
              }
            },
            resize: true
          },
          modes: {
            repulse: {
              distance: 80,
              duration: 0.4
            }
          }
        },
        detectRetina: true
      }}
    />
  );
};

export default ParticlesBackground; 