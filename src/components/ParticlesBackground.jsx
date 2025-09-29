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
            value: 80,
            density: {
              enable: true,
              value_area: 900
            }
          },
          color: {
            value: ["#ffffff", "#e5e5e5", "#f0f0f0", "#f5f5f5"]
          },
          opacity: {
            value: 0.3,
            random: {
              enable: true,
              minimumValue: 0.1
            },
            animation: {
              enable: true,
              speed: 1,
              minimumValue: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: {
              enable: true,
              minimumValue: 1
            },
            animation: {
              enable: true,
              speed: 2,
              minimumValue: 0.5,
              sync: false
            }
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
              bottom: "out",
              left: "out",
              right: "out",
              top: "out"
            },
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          },
          links: {
            enable: true,
            distance: 140,
            color: "#ffffff",
            opacity: 0.12,
            width: 1.2,
            triangles: {
              enable: false,
              opacity: 0.02
            }
          },
          shape: {
            type: "circle"
          }
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: ["attract", "connect"],
              parallax: {
                enable: true,
                force: 100,
                smooth: 15
              }
            },
            onClick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            attract: {
              distance: 200,
              duration: 0.4,
              easing: "ease-out-quad",
              factor: 1,
              maxSpeed: 50,
              speed: 1
            },
            connect: {
              distance: 80,
              links: {
                opacity: 0.5
              },
              radius: 60
            },
            push: {
              default: true,
              groups: [],
              quantity: 4
            },
            repulse: {
              distance: 120,
              duration: 0.4,
              factor: 100,
              speed: 1,
              maxSpeed: 50,
              easing: "ease-out-quad"
            }
          }
        },
        detectRetina: true,
        smooth: true,
        responsive: [
          {
            maxWidth: 768,
            options: {
              particles: {
                number: {
                  value: 40
                },
                links: {
                  distance: 100,
                  opacity: 0.08
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