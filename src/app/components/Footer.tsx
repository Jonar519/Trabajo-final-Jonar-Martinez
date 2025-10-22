import { useContent } from "@/hooks/useContent";

export default function Footer() {
  const { content } = useContent();
  const { socialNetworks, footer } = content;

  return (
    <footer className="bg-black border-t border-gray-800 py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Redes Sociales - CORREGIDO */}
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
              {/* Usar etiqueta img con width y height explícitos */}
              <img
                src={social.icon}
                alt={social.name}
                width={20}
                height={20}
                className="max-w-full max-h-full"
              />
            </a>
          ))}
        </div>
        
        {/* Texto del footer */}
        <div className="text-center text-gray-500 text-xs sm:text-sm">
          <p>{footer.copyright}</p>
          <p className="mt-2 text-gray-600">{footer.developedWith}</p>
        </div>
      </div>
    </footer>
  );
}