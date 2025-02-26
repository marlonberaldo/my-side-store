import React from "react";

import { Heart } from "lucide-react";

const Footer = () => {

  return (
    <footer className="flex flex-col items-center justify-between gap-4 border-t px-6 py-4 md:flex-row">
      <p className="text-center text-sm text-gray-600">© {new Date().getFullYear()} My Side Store. Todos os direitos reservados.</p>

      <p className="flex items-center gap-x-1 text-sm">
        Feito com
        <Heart
          size={16}
          className="animate-bounce fill-red-500 stroke-red-500"
        />
        por
        <a
          href="https://portfolio-marlon-beraldo.vercel.app/pt"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          marlon.<b>beraldo</b>
        </a>
      </p>
    </footer>
  );
};

export default Footer;