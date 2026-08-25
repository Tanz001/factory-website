import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
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
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[var(--accent)]"
      />

      <div
        ref={followerRef}
        id="cursor-reticle"
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 flex items-center justify-center ${
          isHovering
            ? 'scale-150 w-11 h-11 border border-[var(--accent)] bg-[rgba(20,138,128,0.1)]'
            : isClicking
            ? 'scale-90 w-8 h-8 border border-[var(--accent)]'
            : 'w-9 h-9 border border-[rgba(9,17,26,0.3)]'
        }`}
      >
        <div className="absolute -top-1 -left-1 w-1.5 h-1.5 border-t border-l border-[var(--accent)]" />
        <div className="absolute -top-1 -right-1 w-1.5 h-1.5 border-t border-r border-[var(--accent)]" />
        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 border-b border-l border-[var(--accent)]" />
        <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 border-b border-r border-[var(--accent)]" />
      </div>
    </div>
  );
};
