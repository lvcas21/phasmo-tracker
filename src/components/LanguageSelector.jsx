import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LANGUAGES = [
  { code: 'es', label: 'Español', country: 'es' },
  { code: 'en', label: 'English', country: 'gb' },
  { code: 'pt', label: 'Português', country: 'br' },
  { code: 'fr', label: 'Français', country: 'fr' },
  { code: 'de', label: 'Deutsch', country: 'de' },
  { code: 'it', label: 'Italiano', country: 'it' },
  { code: 'ja', label: '日本語', country: 'jp' },
  { code: 'ko', label: '한국어', country: 'kr' },
  { code: 'zh', label: '中文', country: 'cn' },
  { code: 'ru', label: 'Русский', country: 'ru' },
  { code: 'pl', label: 'Polski', country: 'pl' },
];

function Flag({ country }) {
  return (
    <img
      className="lang-flag"
      src={`https://flagcdn.com/24x18/${country}.png`}
      srcSet={`https://flagcdn.com/48x36/${country}.png 2x`}
      width="24"
      height="18"
      alt=""
    />
  );
}

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => i18n.language.startsWith(l.code)) || LANGUAGES[0];

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="language-selector" ref={ref}>
      <button className="lang-toggle" onClick={() => setOpen(!open)}>
        <Flag country={current.country} />
        <span className="lang-label">{current.label}</span>
        <span className="lang-arrow">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${lang.code === current.code ? 'active' : ''}`}
              onClick={() => handleChange(lang.code)}
            >
              <Flag country={lang.country} />
              <span className="lang-label">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
