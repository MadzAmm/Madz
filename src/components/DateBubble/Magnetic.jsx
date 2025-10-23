import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

//=================================================================
// 🧲 Custom Hook: useMagneticEffect (Tidak ada perubahan di sini)
//=================================================================
const useMagneticEffect = (ref, options = {}) => {
  const {
    pullForce = 0.5,
    magneticThreshold = 50,
    springConfig = { damping: 10, stiffness: 200 },
  } = options;

  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);

  const springX = useSpring(magneticX, springConfig);
  const springY = useSpring(magneticY, springConfig);

  useEffect(() => {
    const targetRef = ref.current;
    if (!targetRef) return;

    // Handler gabungan untuk mouse dan touch
    const handlePointerMove = (e) => {
      // Dapatkan koordinat dari event mouse atau touch
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const { left, top, width, height } = targetRef.getBoundingClientRect();
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

    // Handler untuk mereset posisi saat interaksi selesai
    const handlePointerLeave = () => {
      magneticX.set(0);
      magneticY.set(0);
    };

    // Daftarkan semua event listener
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove);

    window.addEventListener('touchend', handlePointerLeave);
    targetRef.addEventListener('mouseleave', handlePointerLeave); // Cukup di elemennya

    // Cleanup function untuk menghapus semua listener
    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerLeave);
      targetRef.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [ref, magneticX, magneticY, pullForce, magneticThreshold]);

  return { x: springX, y: springY };
};

//=================================================================
// ✨ Komponen Utama: Magnetic (Dengan Perbaikan)
//=================================================================
const Magnetic = ({
  children,
  className,
  pullForceParent = 0.4,
  pullForceChild = 0.2,
  ...springOptions
}) => {
  const ref = useRef(null);

  const parentMagnet = useMagneticEffect(ref, {
    pullForce: pullForceParent,
    ...springOptions,
  });

  const childMagnet = useMagneticEffect(ref, {
    pullForce: pullForceChild,
    ...springOptions,
  });

  const renderClonedChildren = () => {
    return React.Children.map(children, (child) => {
      // 1. Pengecekan penting: Pastikan 'child' adalah elemen React yang valid.
      // Ini mencegah error jika children-nya berupa teks atau null.
      if (!React.isValidElement(child)) {
        return child;
      }

      // 2. Clone elemen dengan properti yang benar.
      return React.cloneElement(child, {
        // Sebarkan semua props asli dari child agar tidak hilang.
        ...child.props,

        // 3. Gabungkan style yang ada dengan aman.
        style: {
          // Perbaikan Anda sudah benar: gunakan style yang ada atau objek kosong.
          ...(child.props.style || {}),
        },

        // 4. Terapkan motion values 'x' dan 'y' sebagai props, bukan di dalam style.
        x: childMagnet.x,
        y: childMagnet.y,
      });
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: parentMagnet.x,
        y: parentMagnet.y,
        // Menambahkan display agar wrapper menyesuaikan ukuran konten
        display: 'inline-block',
      }}>
      {renderClonedChildren()}
    </motion.div>
  );
};

export default Magnetic;
