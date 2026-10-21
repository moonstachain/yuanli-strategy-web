export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg className="arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d={diagonal ? "M4.5 15.5 15 5M5 5h10v10" : "M3 10h13M11 4.5l5.5 5.5-5.5 5.5"} stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" strokeLinejoin="miter" /></svg>;
}
export function BrandSymbol() {
  return <svg className="brand-symbol" viewBox="0 0 32 38" fill="none" aria-hidden="true"><path d="M4 33V13L16 4l12 9v20M10 33V16l6-4.5 6 4.5v17M1 33h30M16 19v11M12 25h8" stroke="currentColor" strokeWidth="1.2" /><path d="M16 1v3M4 13H1M28 13h3" stroke="currentColor" strokeWidth="1" /></svg>;
}
