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
        fpsLimit: 30,
        particles: {
          number: {
            value: 15,
            density: {
              enable: true,
              value_area: 1200
            }
          },
          color: {
            value: ["#00ffcc", "#40e0d0", "#20b2aa"]
          },
          opacity: {
            value: 0.4,
            random: false
          },
          size: {
            value: 2,
            random: false
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out"
          },
          links: {
            enable: true,
            distance: 150,
            color: "#008b8b",
            opacity: 0.2,
            width: 1
          },
          shape: {
            type: "square"
          }
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
              parallax: {
                enable: false
              }
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 100,
              links: {
                opacity: 0.4
              }
            }
          }
        },
        detectRetina: false,
        background: {
          color: {
            value: "transparent"
          }
        },
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: {
                  value: 8
                }
              }
            }
          }
        ]
      }}
    />
  );
};

export default ParticlesBackground; 