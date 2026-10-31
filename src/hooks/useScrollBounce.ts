import { useEffect, useState, useRef, CSSProperties } from 'react';

interface UseScrollBounceOptions {
  disabled?: boolean;
}

export function useScrollBounce(options: UseScrollBounceOptions = {}) {
  const { disabled = false } = options;

  const [offset, setOffset] = useState<number>(0);
  const [isSnapping, setIsSnapping] = useState<boolean>(false);

  const offsetRef = useRef<number>(0);
  const isSnappingRef = useRef<boolean>(false);
  const accumulatedDeltaRef = useRef<number>(0);
  const wheelTimerRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isTouchingRef = useRef<boolean>(false);
  const snapEndTimerRef = useRef<number | null>(null);

  // Elastic rubberband resistance curve (smooth exponential decay, 25% less stretch)
  const calculateRubberband = (delta: number): number => {
    const sign = Math.sign(delta);
    const d = Math.abs(delta);
    const maxStretch = 90; // Maximum visual stretch in pixels (reduced by 25%)
    const stretch = maxStretch * (1 - Math.exp(-d / 180));
    return sign * stretch;
  };

  const snapBack = () => {
    if (offsetRef.current === 0 && !isSnappingRef.current) return;

    setIsSnapping(true);
    isSnappingRef.current = true;
    accumulatedDeltaRef.current = 0;
    offsetRef.current = 0;
    setOffset(0);

    if (snapEndTimerRef.current) {
      window.clearTimeout(snapEndTimerRef.current);
    }

    snapEndTimerRef.current = window.setTimeout(() => {
      setIsSnapping(false);
      isSnappingRef.current = false;
    }, 420);
  };

  useEffect(() => {
    if (disabled) {
      snapBack();
      return;
    }

    // Check if target is inside an independent scrollable dialog or modal
    const isInsideScrollableModal = (target: EventTarget | null): boolean => {
      if (!(target instanceof HTMLElement)) return false;
      return Boolean(target.closest('[role="dialog"], .modal-content, [data-modal]'));
    };

    const handleWheel = (e: WheelEvent) => {
      if (isInsideScrollableModal(e.target)) return;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const maxScroll = Math.max(0, docHeight - viewHeight);

      const isAtTop = scrollY <= 1;
      const isAtBottom = Math.ceil(scrollY) >= maxScroll - 2;

      // Top edge overscroll
      if (offsetRef.current > 0) {
        e.preventDefault();
        if (snapEndTimerRef.current) window.clearTimeout(snapEndTimerRef.current);
        setIsSnapping(false);
        isSnappingRef.current = false;

        if (e.deltaY < 0) {
          // Pulling more past top
          accumulatedDeltaRef.current += -e.deltaY;
          const nextOffset = calculateRubberband(accumulatedDeltaRef.current);
          offsetRef.current = nextOffset;
          setOffset(nextOffset);
        } else {
          // Returning towards 0
          accumulatedDeltaRef.current = Math.max(0, accumulatedDeltaRef.current - e.deltaY * 1.5);
          const nextOffset = accumulatedDeltaRef.current <= 0 ? 0 : calculateRubberband(accumulatedDeltaRef.current);
          offsetRef.current = nextOffset;
          setOffset(nextOffset);
        }

        if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = window.setTimeout(snapBack, 90);
        return;
      }

      // Bottom edge overscroll
      if (offsetRef.current < 0) {
        e.preventDefault();
        if (snapEndTimerRef.current) window.clearTimeout(snapEndTimerRef.current);
        setIsSnapping(false);
        isSnappingRef.current = false;

        if (e.deltaY > 0) {
          // Pulling more past bottom
          accumulatedDeltaRef.current += e.deltaY;
          const nextOffset = -calculateRubberband(accumulatedDeltaRef.current);
          offsetRef.current = nextOffset;
          setOffset(nextOffset);
        } else {
          // Returning towards 0
          accumulatedDeltaRef.current = Math.max(0, accumulatedDeltaRef.current - (-e.deltaY) * 1.5);
          const nextOffset = accumulatedDeltaRef.current <= 0 ? 0 : -calculateRubberband(accumulatedDeltaRef.current);
          offsetRef.current = nextOffset;
          setOffset(nextOffset);
        }

        if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = window.setTimeout(snapBack, 90);
        return;
      }

      // Initial hit at boundaries
      if (isAtTop && e.deltaY < 0) {
        e.preventDefault();
        if (snapEndTimerRef.current) window.clearTimeout(snapEndTimerRef.current);
        setIsSnapping(false);
        isSnappingRef.current = false;

        accumulatedDeltaRef.current = -e.deltaY;
        const nextOffset = calculateRubberband(accumulatedDeltaRef.current);
        offsetRef.current = nextOffset;
        setOffset(nextOffset);

        if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = window.setTimeout(snapBack, 90);
        return;
      }

      if (isAtBottom && e.deltaY > 0) {
        e.preventDefault();
        if (snapEndTimerRef.current) window.clearTimeout(snapEndTimerRef.current);
        setIsSnapping(false);
        isSnappingRef.current = false;

        accumulatedDeltaRef.current = e.deltaY;
        const nextOffset = -calculateRubberband(accumulatedDeltaRef.current);
        offsetRef.current = nextOffset;
        setOffset(nextOffset);

        if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
        wheelTimerRef.current = window.setTimeout(snapBack, 90);
        return;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (isInsideScrollableModal(e.target)) return;
      if (e.touches.length > 1) return;

      if (snapEndTimerRef.current) window.clearTimeout(snapEndTimerRef.current);
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);

      setIsSnapping(false);
      isSnappingRef.current = false;
      isTouchingRef.current = true;
      touchStartYRef.current = e.touches[0].clientY;
      accumulatedDeltaRef.current = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isTouchingRef.current || touchStartYRef.current === null) return;
      if (isInsideScrollableModal(e.target)) return;

      const currentY = e.touches[0].clientY;
      const rawDelta = currentY - touchStartYRef.current;

      const scrollY = window.scrollY || window.pageYOffset || 0;
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      const maxScroll = Math.max(0, docHeight - viewHeight);

      const isAtTop = scrollY <= 1;
      const isAtBottom = Math.ceil(scrollY) >= maxScroll - 2;

      if (isAtTop && rawDelta > 0) {
        if (e.cancelable) e.preventDefault();
        const nextOffset = calculateRubberband(rawDelta);
        offsetRef.current = nextOffset;
        setOffset(nextOffset);
        return;
      }

      if (isAtBottom && rawDelta < 0) {
        if (e.cancelable) e.preventDefault();
        const nextOffset = calculateRubberband(rawDelta);
        offsetRef.current = nextOffset;
        setOffset(nextOffset);
        return;
      }

      if (offsetRef.current !== 0) {
        offsetRef.current = 0;
        setOffset(0);
      }
    };

    const handleTouchEnd = () => {
      isTouchingRef.current = false;
      touchStartYRef.current = null;
      snapBack();
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchEnd);
      if (wheelTimerRef.current) window.clearTimeout(wheelTimerRef.current);
      if (snapEndTimerRef.current) window.clearTimeout(snapEndTimerRef.current);
    };
  }, [disabled]);

  const bounceStyle: CSSProperties = {
    transform: offset !== 0 || isSnapping ? `translate3d(0, ${Math.round(offset)}px, 0)` : undefined,
    transition: isSnapping ? 'transform 0.42s cubic-bezier(0.175, 0.885, 0.32, 1.1)' : 'none',
    willChange: offset !== 0 || isSnapping ? 'transform' : undefined,
  };

  return {
    offset,
    isSnapping,
    bounceStyle,
  };
}
