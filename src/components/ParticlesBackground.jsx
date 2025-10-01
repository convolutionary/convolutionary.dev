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
            value: 50,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: ["#9f7aea", "#805ad5", "#6b46c1"]
          },
          opacity: {
            value: 0.8,
            random: true,
            animation: {
              enable: false
            }
          },
          size: {
            value: 1.5,
            random: true,
            animation: {
              enable: false
            }
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
            color: "#6b46c1",
            opacity: 0.08,
            width: 0.8
          },
          shape: {
            type: "circle"
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
                opacity: 0.15,
                color: "#805ad5"
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
                  value: 12
                },
                links: {
                  distance: 120
                }
              }
            }
          },
          {
            maxWidth: 480,
            options: {
              particles: {
                number: {
                  value: 8
                },
                links: {
                  distance: 100,
                  opacity: 0.05
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