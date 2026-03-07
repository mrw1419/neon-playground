// Touch support variables will be defined inside the component
// Neon scrollbar styles (top-level)
import { NEON_THEMES } from '../../styles/neonThemes';

// TabCardSlider.tsx
// Horizontally scrollable row of TabCards with overflow navigation, pagination, and a11y support

import React, { useRef, useState, useEffect } from 'react';
import { TabCard } from './TabCard';
import { TOKENS } from '../../styles/tokens';
import { BORDER_LIGHT } from '../../styles/colors';

const LeftArrowIcon = ({ color = BORDER_LIGHT }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const RightArrowIcon = ({ color = BORDER_LIGHT }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9 6l6 6-6 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Neon scrollbar styles (top-level)
const neonScrollbarStyle = `
/* Hide scrollbar for now */
.TabCardSlider-scroll::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
  background: transparent;
}
.TabCardSlider-scroll {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
`;
if (typeof document !== 'undefined' && !document.getElementById('neon-scrollbar-style')) {
  const style = document.createElement('style');
  style.id = 'neon-scrollbar-style';
  style.innerHTML = neonScrollbarStyle;
  document.head.appendChild(style);
}

const TabCardSlider = ({
  children,
  ariaLabel = 'Tab row',
  theme = 'cyan',
  ...props
}: React.PropsWithChildren<{ ariaLabel?: string, theme?: keyof typeof NEON_THEMES }>) => {
  const t = NEON_THEMES[theme];
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [centerCards, setCenterCards] = useState(true);

  const updateOverflow = () => {
    const el = containerRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    // Pagination calculation
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : 1;
    const visibleCount = Math.floor(el.clientWidth / cardWidth);
    const totalCount = el.children.length;
    setPageCount(Math.ceil(totalCount / visibleCount));
    setCurrentPage(Math.floor(el.scrollLeft / (cardWidth * visibleCount)));
    // Center cards if no overflow
    setCenterCards(el.scrollWidth <= el.clientWidth + 1);
  };

  useEffect(() => {
    updateOverflow();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateOverflow);
    window.addEventListener('resize', updateOverflow);
    // Inject neon scrollbar style on client
    if (typeof document !== 'undefined' && !document.getElementById('neon-scrollbar-style')) {
      const style = document.createElement('style');
      style.id = 'neon-scrollbar-style';
      style.innerHTML = neonScrollbarStyle;
      document.head.appendChild(style);
    }
    return () => {
      el.removeEventListener('scroll', updateOverflow);
      window.removeEventListener('resize', updateOverflow);
    };
  }, []);

  const scrollBy = (delta: number) => {
    const el = containerRef.current;
    if (el) el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  // Scroll to page
  const scrollToPage = (pageIdx: number) => {
    const el = containerRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild ? (el.firstElementChild as HTMLElement).offsetWidth : 1;
    const visibleCount = Math.floor(el.clientWidth / cardWidth);
    el.scrollTo({ left: pageIdx * cardWidth * visibleCount, behavior: 'smooth' });
  };

  // Touch support
  let touchStartX = 0;
  let lastScrollLeft = 0;
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    lastScrollLeft = containerRef.current?.scrollLeft || 0;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    const dx = touchStartX - e.touches[0].clientX;
    containerRef.current.scrollLeft = lastScrollLeft + dx;
  };

  // Fix: define onTouchEnd as a no-op to prevent ReferenceError
  const onTouchEnd = (e: React.TouchEvent) => {
    // Optionally implement inertia or snap
    // No-op for now
  };

  // Keyboard navigation (left/right arrows)
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') scrollBy(-100);
    if (e.key === 'ArrowRight') scrollBy(100);
  };

  return (
    <div
      className="TabCardSlider-root"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      aria-label={ariaLabel}
      role="tablist"
      tabIndex={0}
      onKeyDown={onKeyDown}
      {...props}
    >
      <style>{`
        .TabCardSlider-container {
          margin-left: auto;
          margin-right: auto;
          width: 100%;
          max-width: 100vw;
        }
        @media (min-width: 0px) {
          .TabCardSlider-container { max-width: 540px; }
        }
        @media (min-width: 576px) {
          .TabCardSlider-container { max-width: 540px; }
        }
        @media (min-width: 768px) {
          .TabCardSlider-container { max-width: 720px; }
        }
        @media (min-width: 992px) {
          .TabCardSlider-container { max-width: 960px; }
        }
        @media (min-width: 1200px) {
          .TabCardSlider-container { max-width: 1140px; }
        }
        @media (min-width: 1400px) {
          .TabCardSlider-container { max-width: 1320px; }
        }
      `}</style>
      <div className="TabCardSlider-container" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {showLeft && (
          <button
            className="TabCardSlider-arrow left"
            aria-label="Scroll left"
            onClick={() => scrollBy(-150)}
            tabIndex={0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(24,24,28,0.85)',
              border: `1.5px solid ${t.primary}`,
              borderTopLeftRadius: TOKENS.SPACING_SM,
              borderBottomLeftRadius: TOKENS.SPACING_SM,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              boxShadow: t.glow,
              height: '80px',
              minHeight: '80px',
              width: '44px',
              minWidth: '44px',
              padding: 0,
              marginRight: 8,
              cursor: 'pointer',
              transition: 'all 0.28s cubic-bezier(0.4, 0.2, 0.2, 1)',
            }}
          >
            <LeftArrowIcon color={t.primary} />
          </button>
        )}
        <div
          className={`TabCardSlider-scroll neon-scrollbar-${theme}`}
          ref={containerRef}
          style={{
            overflowX: 'auto',
            display: 'flex',
            gap: TOKENS.SPACING_XS,
            padding: `${TOKENS.SPACING_SM}px 0`,
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch',
            width: '100%',
            scrollSnapType: 'x mandatory',
            justifyContent: centerCards ? 'center' : 'flex-start',
          }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          tabIndex={-1}
        >
          {React.Children.map(children, (child, idx) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                key: child.key ?? idx,
                style: { ...(child.props.style || {}), scrollSnapAlign: 'start' }
              });
            }
            return child;
          })}
        </div>
        {showRight && (
          <button
            className="TabCardSlider-arrow right"
            aria-label="Scroll right"
            onClick={() => scrollBy(150)}
            tabIndex={0}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(24,24,28,0.85)',
              border: `1.5px solid ${t.primary}`,
              borderTopRightRadius: TOKENS.SPACING_SM,
              borderBottomRightRadius: TOKENS.SPACING_SM,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 0,
              boxShadow: t.glow,
              height: '80px',
              minHeight: '80px',
              width: '44px',
              minWidth: '44px',
              padding: 0,
              marginLeft: 8,
              cursor: 'pointer',
              transition: 'all 0.28s cubic-bezier(0.4, 0.2, 0.2, 1)',
            }}
          >
            <RightArrowIcon color={t.primary} />
          </button>
        )}
      </div>
      {/* Pagination indicator */}
      {pageCount > 1 && (
        <div
          className="TabCardSlider-pagination"
          style={{ display: 'none' }}
          aria-label={`Page ${currentPage + 1} of ${pageCount}`}
          role="navigation"
        >
          {Array.from({ length: pageCount }).map((_, idx) => (
            <button
              key={idx}
              aria-label={`Go to page ${idx + 1}`}
              onClick={() => scrollToPage(idx)}
              style={{ display: 'none' }}
              tabIndex={0}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export { TabCardSlider };
