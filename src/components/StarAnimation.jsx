import React from 'react'

const StarAnimation = () => {
    return (
        <div className="stars-container absolute inset-0 overflow-hidden z-0">
            {[...Array(350)].map((_, i) => {
                // Random properties for each star
                const size = Math.random() * 3;
                const duration = 10 + Math.random() * 40; // Longer duration for smoother movement
                const delay = Math.random() * 10;
                const startX = Math.random() * 100;
                const startY = Math.random() * 100;

                // Generate random path (4-6 points)
                const points = [];
                const pointCount = 4 + Math.floor(Math.random() * 3);

                for (let p = 0; p < pointCount; p++) {
                    points.push({
                        x: startX + (Math.random() * 30 - 15),
                        y: startY + (Math.random() * 30 - 15),
                        time: (p / (pointCount - 1)) * 100,
                    });
                }

                // Create keyframe CSS
                const keyframes = points
                    .map(
                        (point, index) =>
                            `${point.time}% { transform: translate(${point.x}vw, ${point.y}vh); }`
                    )
                    .join(" ");

                return (
                    <>
                        <div
                            key={i}
                            className="star absolute bg-white rounded-full"
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                left: `${startX}vw`,
                                top: `${startY}vh`,
                                opacity: Math.random() * 0.7 + 0.3,
                                animation: `
                twinkle-${i} ${3 + Math.random() * 4}s ease-in-out infinite,
                move-${i} ${duration}s linear infinite ${delay}s
              `,
                                filter: `blur(${Math.random()}px)`,
                            }}
                        />
                        <style jsx global>{`
                @keyframes twinkle-${i} {
                  0%,
                  100% {
                    opacity: ${Math.random() * 0.3 + 0.1};
                  }
                  50% {
                    opacity: ${Math.random() * 0.7 + 0.5};
                  }
                }
                @keyframes move-${i} {
                  ${keyframes}
                }
              `}</style>
                    </>
                );
            })}
        </div>
    )
}

export default StarAnimation
