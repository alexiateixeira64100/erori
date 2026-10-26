import React, {useEffect, useState} from 'react';
import './preloader.css';

export default function Preloader({children}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const finish = () => setLoading(false);
    const timer = window.setTimeout(finish, motion.matches ? 180 : 3000);
    const onMotionChange = () => { if (motion.matches) finish(); };
    motion.addEventListener('change', onMotionChange);
    return () => {
      window.clearTimeout(timer);
      motion.removeEventListener('change', onMotionChange);
      document.body.style.overflow = previousOverflow;
    };
  }, [loading]);

  return <>
    <div inert={loading ? true : undefined} aria-hidden={loading ? true : undefined}>
      {children}
    </div>
    {loading && <div className="preloader" role="status" aria-label="Bienvenue sur Chute. Chargement en cours.">
      <div className="preloader-panel" aria-hidden="true">
        <div className="preloader-corner"><span className="preloader-dot"/> LA MATIÈRE A DE L’AVENIR</div>
        <span className="preloader-edition">CHUTE — PAYS BASQUE</span>
        <div className="preloader-center">
          <div className="preloader-orbit"/>
          <div className="preloader-logo">
            <span className="preloader-word">{Array.from('chute').map((letter, index) =>
              <span className="preloader-letter-mask" key={index}><span style={{'--letter': index}}>{letter}</span></span>
            )}</span>
            <span className="preloader-star-track"><span className="preloader-star">✳</span></span>
          </div>
          <div className="preloader-baseline">Une chute. <span>Mille possibilités.</span></div>
        </div>
        <div className="preloader-bottom"><span>UNE NOUVELLE VIE COMMENCE.</span><span>JUSTE ICI ↗</span></div>
        <div className="preloader-progress"><span/></div>
      </div>
    </div>}
  </>;
}
