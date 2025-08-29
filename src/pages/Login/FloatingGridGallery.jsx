import React from "react";

// Replace these with your own image URLs if needed
const images = [
  "https://images.unsplash.com/photo-1550439062-609e1531270e",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  "https://images.unsplash.com/photo-1504198458649-3128b932f49b",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
  "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
  "https://images.unsplash.com/photo-1519340333755-a4f7f3f28cdd",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
];

const FloatingGridGallery = () => {
  return (
    <div className="w-full h-[80vh] bg-[#090128] p-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      <style>{`
        @keyframes pan {
          0% { transform: scale(1.1) translate(0%, 0%); }
          25% { transform: scale(1.1) translate(5%, -5%); }
          50% { transform: scale(1.1) translate(-5%, 5%); }
          75% { transform: scale(1.1) translate(5%, 5%); }
          100% { transform: scale(1.1) translate(0%, 0%); }
        }
        .floating-img {
          animation: pan 14s ease-in-out infinite;
        }
      `}</style>

      {images.map((src, i) => (
        <div
          key={i}
          className="relative w-full aspect-square rounded-full overflow-hidden border-4 border-white shadow-lg"
        >
          <img
            src={`${src}?auto=format&fit=crop&w=600&q=80`}
            alt={`image-${i}`}
            className="absolute top-0 left-0 w-full h-full object-cover floating-img"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingGridGallery;
