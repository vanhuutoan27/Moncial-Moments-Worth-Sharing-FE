"use client"

import { easeInOut, motion } from "framer-motion"

function AnimatedBlob() {
  const blobVariants = {
    animate: {
      scale: [1, 1.1, 0.9, 1.05, 1],
      rotate: [0, 90, 180, 270, 360],
      borderRadius: [
        "60% 40% 30% 70% / 60% 30% 70% 40%",
        "30% 70% 40% 60% / 50% 60% 40% 50%",
        "50% 50% 25% 75% / 30% 50% 70% 50%",
        "75% 25% 60% 40% / 70% 35% 65% 30%",
        "60% 40% 30% 70% / 60% 30% 70% 40%"
      ],
      x: [0, 30, -20, -30, 0],
      y: [0, -50, 20, -10, 0],
      transition: {
        duration: 20,
        ease: easeInOut,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  }

  const secondaryBlobVariants = {
    animate: {
      scale: [1, 1.2, 0.8, 1.1, 1],
      rotate: [0, -120, -240, -360],
      borderRadius: [
        "40% 60% 70% 30% / 40% 50% 60% 50%",
        "70% 30% 50% 50% / 60% 40% 50% 40%",
        "50% 50% 30% 70% / 50% 70% 30% 50%",
        "40% 60% 70% 30% / 40% 50% 60% 50%"
      ],
      x: [0, 50, -40, 0],
      y: [0, 30, -20, 0],
      transition: {
        duration: 15,
        ease: easeInOut,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }

  const tertiaryBlobVariants = {
    animate: {
      scale: [1, 1.1, 0.95, 1.05, 0.9, 1],
      rotate: [0, 72, 144, 216, 288, 360],
      borderRadius: [
        "30% 70% 70% 30% / 30% 30% 70% 70%",
        "60% 40% 50% 50% / 70% 30% 50% 50%",
        "50% 50% 40% 60% / 40% 60% 40% 60%",
        "70% 30% 60% 40% / 50% 50% 50% 50%",
        "40% 60% 30% 70% / 60% 40% 70% 30%",
        "30% 70% 70% 30% / 30% 30% 70% 70%"
      ],
      x: [0, 20, -30, 10, -10, 0],
      y: [0, 40, 10, -30, 20, 0],
      transition: {
        duration: 25,
        ease: easeInOut,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  }

  const getParticleAnimation = (i: number) => ({
    y: [0, -100 - i * 10, 0],
    x: [0, (i % 2 === 0 ? 50 : -30) + i * 5, 0],
    rotate: [0, 180 + i * 30, 360],
    opacity: [0.2, 0.8, 0.2],
    scale: [0.5, 1.2, 0.5],
    transition: {
      duration: 8 + (i % 5),
      ease: easeInOut,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: i * 0.5
    }
  })

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-96 w-96">
          <motion.div
            className="from-primary/40 via-primary/25 to-primary/15 absolute h-full w-full bg-gradient-to-br"
            style={{
              filter: "blur(40px)"
            }}
            variants={blobVariants}
            animate="animate"
          />

          <motion.div
            className="absolute top-8 left-8 h-80 w-80 bg-gradient-to-br from-purple-400/30 via-pink-300/20 to-blue-400/15"
            style={{
              filter: "blur(30px)"
            }}
            variants={secondaryBlobVariants}
            animate="animate"
          />

          <motion.div
            className="to-primary/20 absolute top-16 left-16 h-72 w-72 bg-gradient-to-br from-cyan-300/20 via-teal-200/15"
            style={{
              filter: "blur(25px)"
            }}
            variants={tertiaryBlobVariants}
            animate="animate"
          />
        </div>
      </div>

      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-primary/30 absolute h-2 w-2 rounded-full"
            style={{
              left: `${10 + i * 6}%`,
              top: `${15 + i * 5}%`
            }}
            animate={getParticleAnimation(i)}
          />
        ))}
      </div>

      <motion.div
        className="absolute top-20 right-20 h-32 w-32 rounded-full bg-gradient-to-br from-yellow-300/10 to-orange-400/5"
        style={{ filter: "blur(20px)" }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      <motion.div
        className="absolute bottom-32 left-16 h-24 w-24 rounded-full bg-gradient-to-br from-green-300/15 to-blue-400/10"
        style={{ filter: "blur(15px)" }}
        animate={{
          scale: [1, 0.8, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          x: [0, 30, -20, 0],
          y: [0, -20, 10, 0]
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity
        }}
      />

      <div className="from-background/5 to-background/10 absolute inset-0 bg-gradient-to-br via-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
    </div>
  )
}

export default AnimatedBlob
