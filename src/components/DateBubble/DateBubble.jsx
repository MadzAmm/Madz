import { useEffect, useState, useRef } from 'react';
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  animate,
  useScroll,
} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useResponsiveBubble from './UseResponsiveBubble';

// --- Custom Hook: useMagneticBubble (HANYA UNTUK DESKTOP/MOUSE) ---
const useMagneticBubble = (ref, options = {}) => {
  const {
    pullForce = 0.6,
    magneticThreshold = 120,
    springConfig = { damping: 10, stiffness: 200 },
  } = options;
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, springConfig);
  const springY = useSpring(magneticY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distance = Math.sqrt(
        Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2)
      );
      if (distance < magneticThreshold) {
        const moveX = (clientX - centerX) * pullForce;
        const moveY = (clientY - centerY) * pullForce;
        magneticX.set(moveX);
        magneticY.set(moveY);
      } else {
        magneticX.set(0);
        magneticY.set(0);
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ref, magneticX, magneticY, pullForce, magneticThreshold]);

  return { x: springX, y: springY };
};

// --- Fungsi Helper untuk Format Waktu ---
const formatDateParts = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const date = now.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
  });
  return { date, hours, minutes };
};

// --- Komponen Utama: DateBubble ---
const DateBubble = ({
  mode = 'default',
  motionConfig: externalMotionConfig,
  customStages,
  position: externalPosition,
  x: externalX,
  y: externalY,
  scale: externalScale,
  scrollYProgress: externalScrollYProgress,
  navigate: externalNavigate,
}) => {
  const ref = useRef(null);
  const navigate = externalNavigate || useNavigate();
  const [timeParts, setTimeParts] = useState(formatDateParts());
  const [hovered, setHovered] = useState(false);
  const [stageIndex, setStageIndex] = useState(0);

  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragOffsetX = useMotionValue(0);
  const dragOffsetY = useMotionValue(0);

  // BARU: Ref untuk mencegah klik setelah drag
  const justDragged = useRef(false);

  // DIKEMBALIKAN: Logika gesture dengan magnetic hold
  const gestureState = useRef({
    lastTapUpTime: 0,
    holdTimeout: null,
    isMagneticHold: false,
    dragStartPos: { x: 0, y: 0 },
  });

  // DIKEMBALIKAN: State magnetik untuk sentuh
  const touchBubbleMagneticX = useMotionValue(0);
  const touchBubbleMagneticY = useMotionValue(0);
  const springTouchBubbleMagneticX = useSpring(touchBubbleMagneticX, {
    damping: 10,
    stiffness: 200,
  });
  const springTouchBubbleMagneticY = useSpring(touchBubbleMagneticY, {
    damping: 10,
    stiffness: 200,
  });
  const touchTextMagneticX = useMotionValue(0);
  const touchTextMagneticY = useMotionValue(0);
  const springTouchTextMagneticX = useSpring(touchTextMagneticX, {
    damping: 12,
    stiffness: 180,
  });
  const springTouchTextMagneticY = useSpring(touchTextMagneticY, {
    damping: 12,
    stiffness: 180,
  });

  useEffect(() => {
    isDraggingRef.current = isDragging;
  }, [isDragging]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const activeScroll = externalScrollYProgress || scrollYProgress;
  const { position: defaultPosition, motionConfig: defaultMotionConfig } =
    useResponsiveBubble();
  const motionConfig = externalMotionConfig || defaultMotionConfig;
  const bubblePosition = externalPosition || defaultPosition;
  const [isAbout, setIsAbout] = useState(false);
  const [isContact, setIsContact] = useState(false);
  const [disableHover, setDisableHover] = useState(false);
  const [isHomepageHoverable, setIsHomepageHoverable] = useState(true);

  useMotionValueEvent(activeScroll, 'change', (latest) => {
    if (mode === 'default') {
      setIsAbout(latest >= 0.2 && latest < 0.9);
      setDisableHover(latest >= 0.6 && latest < 0.9);
      setIsContact(latest >= 0.9);
      setIsHomepageHoverable(latest < 0.2);
    } else if (mode === 'custom' && customStages) {
      const index = customStages.findIndex(
        ({ range }) => latest >= range[0] && latest < range[1]
      );
      if (index !== -1) setStageIndex(index);
    }
  });

  useEffect(() => {
    const interval = setInterval(() => setTimeParts(formatDateParts()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isDraggingRef.current &&
        (dragOffsetX.get() !== 0 || dragOffsetY.get() !== 0)
      ) {
        animate(dragOffsetX, 0, {
          type: 'spring',
          stiffness: 150,
          damping: 20,
        });
        animate(dragOffsetY, 0, {
          type: 'spring',
          stiffness: 150,
          damping: 20,
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dragOffsetX, dragOffsetY]);

  const x =
    externalX ||
    useSpring(
      useTransform(activeScroll, motionConfig.xInput, motionConfig.xOutput),
      { stiffness: 100, damping: 20 }
    );
  const y =
    externalY ||
    useSpring(
      useTransform(activeScroll, motionConfig.yInput, motionConfig.yOutput),
      { stiffness: 100, damping: 20 }
    );

  const desktopBubbleMagnet = useMagneticBubble(ref);
  const desktopTextMagnet = useMagneticBubble(ref, { pullForce: 0.25 });

  // DIKEMBALIKAN: Posisi akhir dengan magnetik sentuh
  const finalBubbleX = useTransform(
    [x, desktopBubbleMagnet.x, springTouchBubbleMagneticX, dragOffsetX],
    (latest) => latest.reduce((a, b) => a + b, 0)
  );
  const finalBubbleY = useTransform(
    [y, desktopBubbleMagnet.y, springTouchBubbleMagneticY, dragOffsetY],
    (latest) => latest.reduce((a, b) => a + b, 0)
  );

  const finalTextX = useTransform(
    [desktopTextMagnet.x, springTouchTextMagneticX],
    (latest) => latest.reduce((a, b) => a + b, 0)
  );
  const finalTextY = useTransform(
    [desktopTextMagnet.y, springTouchTextMagneticY],
    (latest) => latest.reduce((a, b) => a + b, 0)
  );

  const baseScale =
    externalScale ||
    useSpring(
      useTransform(
        activeScroll,
        motionConfig.scaleInput,
        motionConfig.scaleOutput
      ),
      { stiffness: 100, damping: 20 }
    );
  const animatedScale = useMotionValue(1);
  useEffect(() => {
    const unsubscribe = baseScale.on('change', (scrollScale) => {
      if (!hovered) animatedScale.set(scrollScale);
    });
    return () => unsubscribe();
  }, [baseScale, hovered]);

  const handleHoverStart = () => {
    setHovered(true);
    animate(animatedScale, baseScale.get() * 1.12, {
      type: 'spring',
      stiffness: 180,
      damping: 12,
    });
  };

  const handleHoverEnd = () => {
    setHovered(false);
    animate(animatedScale, baseScale.get(), {
      type: 'spring',
      stiffness: 180,
      damping: 20,
    });
  };

  const handleClick = () => {
    if (mode === 'default') {
      const scrollValue = activeScroll.get();
      if (scrollValue < 0.4) {
        if (isContact) navigate('/contact');
        else if (isAbout) navigate('/about');
      }
    } else if (mode === 'custom' && customStages?.[stageIndex]?.onClick) {
      customStages[stageIndex].onClick();
    }
  };

  const handleTap = () => {
    // BARU: Periksa flag sebelum menjalankan tap
    if (justDragged.current) {
      return;
    }
    handleClick();
    const current = baseScale.get();
    animate(animatedScale, current * 0.88, {
      type: 'spring',
      stiffness: 300,
      damping: 10,
    });
    setTimeout(() => {
      animate(animatedScale, current * 1.05, {
        type: 'spring',
        stiffness: 200,
        damping: 15,
      });
      setTimeout(() => {
        animate(animatedScale, current, {
          type: 'spring',
          stiffness: 180,
          damping: 20,
        });
      }, 250);
    }, 250);
  };

  // DIKEMBALIKAN: Handler pointer sentuh dengan logika magnetic hold
  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse') return;
    clearTimeout(gestureState.current.holdTimeout);
    const timeSinceLastTap = Date.now() - gestureState.current.lastTapUpTime;
    if (timeSinceLastTap < 300) {
      clearTimeout(gestureState.current.holdTimeout);
      setIsDragging(true);
      gestureState.current.dragStartPos = {
        x: e.clientX - dragOffsetX.get(),
        y: e.clientY - dragOffsetY.get(),
      };
    } else {
      gestureState.current.holdTimeout = setTimeout(() => {
        gestureState.current.isMagneticHold = true;
      }, 220);
    }
  };

  const handlePointerMove = (e) => {
    if (e.pointerType === 'mouse') return;
    if (gestureState.current.isMagneticHold && !isDragging) {
      const { clientX, clientY } = e;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const bubbleMoveX = (clientX - centerX) * 0.6;
      const bubbleMoveY = (clientY - centerY) * 0.6;
      touchBubbleMagneticX.set(bubbleMoveX);
      touchBubbleMagneticY.set(bubbleMoveY);
      const textMoveX = (clientX - centerX) * 0.3;
      const textMoveY = (clientY - centerY) * 0.3;
      touchTextMagneticX.set(textMoveX);
      touchTextMagneticY.set(textMoveY);
    }
    if (isDragging) {
      dragOffsetX.set(e.clientX - gestureState.current.dragStartPos.x);
      dragOffsetY.set(e.clientY - gestureState.current.dragStartPos.y);
    }
  };

  const handlePointerUp = (e) => {
    if (e.pointerType === 'mouse') return;
    gestureState.current.lastTapUpTime = Date.now();
    clearTimeout(gestureState.current.holdTimeout);

    // BARU: Jika sedang drag, set flag untuk blokir tap
    if (isDragging) {
      justDragged.current = true;
      setTimeout(() => {
        justDragged.current = false;
      }, 50); // Cooldown singkat
    }

    gestureState.current.isMagneticHold = false;
    touchBubbleMagneticX.set(0);
    touchBubbleMagneticY.set(0);
    touchTextMagneticX.set(0);
    touchTextMagneticY.set(0);
    setIsDragging(false);
  };

  const handleDesktopDrag = (e, info) => {
    dragOffsetX.set(dragOffsetX.get() + info.delta.x);
    dragOffsetY.set(dragOffsetY.get() + info.delta.y);
  };

  const handleDesktopDragEnd = () => {
    setIsDragging(false);
    // BARU: Set flag untuk blokir tap setelah drag di desktop
    justDragged.current = true;
    setTimeout(() => {
      justDragged.current = false;
    }, 50); // Cooldown singkat
  };

  const showHoverEffect =
    mode === 'default'
      ? (isAbout && !disableHover) || isHomepageHoverable
      : true;
  const currentStage = mode === 'custom' ? customStages?.[stageIndex] : null;

  const displayText =
    mode === 'default' ? (
      isContact ? (
        'Sapere aude_Kant'
      ) : isAbout ? (
        'About'
      ) : hovered && isHomepageHoverable ? (
        'Homepage'
      ) : (
        <>
          {timeParts.date} <br /> {timeParts.hours}{' '}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            style={{ margin: '0 4px' }}>
            :{' '}
          </motion.span>
          {timeParts.minutes}
        </>
      )
    ) : hovered && currentStage?.hoverText === 'date' ? (
      <>
        {timeParts.date} <br /> {timeParts.hours}{' '}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          style={{ margin: '0 4px' }}>
          :{' '}
        </motion.span>
        {timeParts.minutes}
      </>
    ) : hovered && currentStage?.hoverText ? (
      currentStage.hoverText
    ) : (
      currentStage?.text || ''
    );

  const baseBackgroundColor =
    mode === 'default'
      ? 'rgba(0,0,0,0.1)'
      : currentStage?.baseBg || 'rgba(0,0,0,0.1)';

  const hoverBackgroundColor =
    mode === 'default'
      ? isContact
        ? 'rgba(255, 255, 255, 0.6)'
        : isAbout
        ? 'rgba(32, 42, 68, 0.6)'
        : 'rgba(0, 0, 0, 0.3)'
      : currentStage?.bg || 'rgba(0, 0, 0, 0.3)';

  const textColor =
    mode === 'default'
      ? isContact
        ? 'cadetblue'
        : '#fff'
      : currentStage?.color || '#fff';

  const bubbleBaseStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: '50%',
    width: '150px',
    height: '150px',
    position: 'fixed',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '0.5px solid rgba(255, 255, 255, 0.3)',
    zIndex: 10,
    pointerEvents: 'auto',
    overflow: 'hidden',
  };
  const textStyle = {
    userSelect: 'none',
    position: 'relative',
    zIndex: 2,
    transition: 'color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };

  return (
    <motion.div
      ref={ref}
      style={{
        ...bubbleBaseStyle,
        ...bubblePosition,
        x: finalBubbleX,
        y: finalBubbleY,
        scale: animatedScale,
        color: textColor,
        backgroundColor: baseBackgroundColor,
        cursor: isDragging ? 'grabbing' : 'grab',
        touchAction: 'none',
      }}
      // Event Handlers untuk Desktop
      onHoverStart={
        showHoverEffect && !isDragging ? handleHoverStart : undefined
      }
      onHoverEnd={showHoverEffect && !isDragging ? handleHoverEnd : undefined}
      drag={typeof window !== 'undefined' && window.innerWidth > 1024}
      onDrag={handleDesktopDrag}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={handleDesktopDragEnd}
      // Handler universal untuk klik & tap
      onTap={handleTap}
      // Event Handlers HANYA untuk Sentuh
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}>
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          backgroundColor:
            hovered && showHoverEffect ? hoverBackgroundColor : 'transparent',
          zIndex: 1,
        }}
        initial='initial'
        animate={
          hovered && showHoverEffect && !isDragging ? 'hover' : 'initial'
        }
        variants={{ initial: { scale: 0 }, hover: { scale: 1 } }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <motion.span
        key={String(displayText)}
        style={{ ...textStyle, x: finalTextX, y: finalTextY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}>
        {displayText}
      </motion.span>
    </motion.div>
  );
};

export default DateBubble;
