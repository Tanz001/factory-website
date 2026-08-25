import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    document.body.classList.add('custom-cursor-active');

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    const onMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      // Immediate dot
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out'
      });

      // Smooth mechanical reticle follower
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.22,
        ease: 'power2.out'
      });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);

    // Interactive target detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('interactive-target')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      id="custom-cursor-container"
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision Center Crosshair Dot */}
      <div
        ref={cursorRef}
        id="cursor-dot"
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FF5A1F] shadow-[0_0_8px_#FF5A1F]"
      />

      {/* Industrial Reticle Follower */}
      <div
        ref={followerRef}
        id="cursor-reticle"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 flex items-center justify-center ${
          isHovering
            ? 'scale-150 w-12 h-12 border border-[#FF5A1F] bg-[rgba(255,90,31,0.08)]'
            : isClicking
            ? 'scale-90 w-8 h-8 border border-[#FF5A1F]'
            : 'w-9 h-9 border border-[rgba(17,19,23,0.35)]'
        }`}
        style={{ borderRadius: isHovering ? '4px' : '0px' }}
      >
        {/* Reticle Corner Marks */}
        <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-[#FF5A1F]" />
        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-[#FF5A1F]" />
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-[#FF5A1F]" />
        <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-[#FF5A1F]" />

        {/* Micro Coordinate HUD Badge on Hover */}
        {isHovering && (
          <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] font-mono font-medium text-[#FF5A1F] whitespace-nowrap tracking-wider bg-white px-1 border border-[#FF5A1F]/40 shadow-xs">
            LOC[{coords.x},{coords.y}]
          </span>
        )}
      </div>
    </div>
  );
};
