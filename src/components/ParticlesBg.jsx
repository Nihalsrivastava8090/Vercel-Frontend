import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBg = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        fullScreen: { enable: true, zIndex: -1 },
        particles: {
          number: { value: 45, density: { enable: true, area: 800 } },
          color: { value: "#4C8BF5" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: { min: 1, max: 4 } },
          move: {
            enable: true,
            speed: 1.3,
            direction: "none",
            random: false,
            straight: false,
            outModes: "out",
          },
          links: {
            enable: true,
            distance: 150,
            color: "#00E0FF",
            opacity: 0.4,
            width: 1,
          }
        },
        detectRetina: true,
      }}
    />
  );
};

export default ParticlesBg;
