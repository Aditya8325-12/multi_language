"use client";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import { usePathname, useRouter } from "next/navigation"; // ✅ Add useRouter

const languages = [
  { code: "en", name: "EN", flag: "/img/flag/uk.png" },
  { code: "sp", name: "SP", flag: "/img/flag/sp.png" },
];

export default function LanguageSelector() {
  const pathname = usePathname();
  const router = useRouter();
  const [selected, setSelected] = useState(languages[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect current locale from the URL
  useEffect(() => {
    const pathLocale = pathname.split("/")[1];
    const foundLang = languages.find((lang) => lang.code === pathLocale);
    if (foundLang) {
      setSelected(foundLang);
    }
  }, [pathname]);

  const handleSelect = (lang) => {
    setSelected(lang);
    setIsOpen(false);

    const segments = pathname.split("/");
    segments[1] = lang.code; // change locale in the path
    const newPath = segments.join("/") || "/";
    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setIsScrolled(false);
      } else {
        setIsScrolled(true);
      }
    };

    handleScroll(); // initial
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/" || pathname === "/en" || pathname === "/sp";
  const textClass = isHome && !isScrolled ? "text-white" : "text-gray-800";
  const dropdownBg = isHome && !isScrolled ? "bg-transparent" : "bg-white";
  const dropdownText = isHome && !isScrolled ? "text-white" : "text-gray-700";
  const hoverBg =
    isHome && !isScrolled ? "hover:bg-white/10" : "hover:bg-gray-100";

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1 justify-center cursor-pointer ${textClass}`}
      >
        <div className="flex gap-1 items-center justify-center">
          <img src={selected.flag} alt={selected.code} className="w-5 h-5" />
          <span className={`uppercase ${textClass}`}>{selected.name}</span>
        </div>
        <TbWorld className={`w-5 h-5 ${textClass}`} />
      </button>

      {isOpen && (
        <div className={`absolute mt-2 w-24 ${dropdownBg} shadow-md z-10`}>
          {languages
            .filter((lang) => lang.code !== selected.code)
            .map((lang) => (
              <div
                key={lang.code}
                onClick={() => handleSelect(lang)}
                className={`flex items-center gap-2 px-2 py-1 cursor-pointer ${dropdownText} ${hoverBg}`}
              >
                <img src={lang.flag} alt={lang.code} className="w-5 h-5" />
                <span className="uppercase">{lang.name}</span>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
