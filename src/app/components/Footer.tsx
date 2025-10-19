import Image from "next/image";

export default function Footer() {
  const socialNetworks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/chitivanet-undefined-42a4a4355/",
      icon: "/linkedin-icon.svg",
      bgColor: "bg-white border border-blue-500"
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/jonar_andres/",
      icon: "/instagram-icon.svg",
      bgColor: "bg-white border border-pink-500"
    },
    {
      name: "GitHub",
      url: "https://github.com/Jonar519",
      icon: "/github-icon.svg",
      bgColor: "bg-white border border-gray-800"
    },
    {
      name: "Vercel",
      url: "https://vercel.com/chitivanets-projects",
      icon: "/vercel-icon.svg",
      bgColor: "bg-white border border-black"
    }
  ];

  return (
    <footer className="bg-black border-t border-gray-800 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Redes Sociales */}
        <div className="flex justify-center space-x-6 mb-6">
          {socialNetworks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 flex items-center justify-center ${social.bgColor} rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg`}
              title={social.name}
            >
              <img
                src={social.icon}
                alt={social.name}
                width={20}
                height={20}
                className="" // Sin filtros
              />
            </a>
          ))}
        </div>
        
        {/* Texto del footer */}
        <div className="text-center text-gray-500 text-xs sm:text-sm">
          <p>© 2025 Jonar Andrés | Estilo Gamer-Tech ⚡ Inspirado en Samsung</p>
          <p className="mt-2 text-gray-600">Desarrollado con Next.js y Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}