"use client"

export function HoneycombBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="honeycomb"
            x="0"
            y="0"
            width="56"
            height="100"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <path
              d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
              fill="none"
              className="stroke-amber-200/30 dark:stroke-amber-500/20"
              strokeWidth="1"
            />
            <path
              d="M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34"
              fill="none"
              className="stroke-amber-300/20 dark:stroke-amber-400/10"
              strokeWidth="0.5"
            />
          </pattern>
          
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:rgb(254,252,232)]" />
            <stop offset="50%" className="[stop-color:rgb(254,243,199)]" />
            <stop offset="100%" className="[stop-color:rgb(255,237,213)]" />
          </linearGradient>
          
          <linearGradient id="gradient1-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" className="[stop-color:rgb(12,10,9)]" />
            <stop offset="50%" className="[stop-color:rgb(23,20,16)]" />
            <stop offset="100%" className="[stop-color:rgb(28,25,23)]" />
          </linearGradient>
        </defs>
        
        <rect className="hidden dark:block" width="100%" height="100%" fill="url(#gradient1-dark)" />
        <rect className="block dark:hidden" width="100%" height="100%" fill="url(#gradient1)" />
        <rect width="100%" height="100%" fill="url(#honeycomb)" />
        
        {/* Animated hexagons */}
        <g className="animate-float-slow">
          <polygon
            points="200,100 240,120 240,160 200,180 160,160 160,120"
            className="fill-amber-400/10 dark:fill-amber-500/5"
          />
        </g>
        
        <g className="animate-float-medium" style={{ animationDelay: '1s' }}>
          <polygon
            points="400,300 440,320 440,360 400,380 360,360 360,320"
            className="fill-amber-400/15 dark:fill-amber-500/8"
          />
        </g>
        
        <g className="animate-float-fast" style={{ animationDelay: '2s' }}>
          <polygon
            points="600,500 640,520 640,560 600,580 560,560 560,520"
            className="fill-amber-400/10 dark:fill-amber-500/5"
          />
        </g>
      </svg>
      
      {/* Glowing orbs */}
      <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-amber-300/30 dark:bg-amber-500/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-yellow-300/20 dark:bg-yellow-500/10 blur-3xl animate-pulse-slower" />
      
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(20px, -20px); opacity: 0.6; }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          50% { transform: translate(-15px, 15px); opacity: 0.7; }
        }
        
        @keyframes float-fast {
          0%, 100% { transform: translate(0, 0); opacity: 0.3; }
          50% { transform: translate(25px, 20px); opacity: 0.5; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 8s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 5s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
