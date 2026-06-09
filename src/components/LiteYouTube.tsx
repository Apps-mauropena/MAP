import React, { useState } from 'react';
import { motion } from 'motion/react';

interface LiteYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

export const LiteYouTube: React.FC<LiteYouTubeProps> = ({ videoId, title, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div 
      className={`relative cursor-pointer bg-black overflow-hidden flex items-center justify-center ${className}`}
      onClick={() => setIsLoaded(true)}
    >
      {!isLoaded ? (
        <>
          <img 
            src={thumbnailUrl} 
            alt={title} 
            loading="lazy" 
            decoding="async"
            width="1280"
            height="720"
            className="absolute inset-0 w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500" 
          />
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="relative w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center z-10 shadow-lg"
          >
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
          </motion.div>
        </>
      ) : (
        <iframe 
          className="absolute inset-0 w-full h-full z-0" 
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} 
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};
