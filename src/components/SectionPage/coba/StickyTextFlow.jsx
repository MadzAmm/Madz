import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Komponen di mana teks terakhir mengalir dengan teks lain,
 * lalu menjadi sticky dan membesar menjadi background.
 *
 * @param {object} props
 * @param {string[]} props.initialLines - Array string untuk baris teks awal.
 * @param {string} props.stickyText - Teks yang akan menjadi sticky dan membesar.
 * @param {React.ReactNode} props.children - Konten yang akan muncul di atas background.
 */
export const StickyTextFlow = ({ initialLines, stickyText, children }) => {
  const targetRef = useRef(null);

  // Mengamati progres scroll di dalam container animasi
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end end'], // Animasi dimulai saat bagian atas container mencapai bagian bawah layar
  });

  // ========================== ILUSI UTAMA ADA DI SINI ==========================

  // 1. Perilaku Teks Awal
  // Teks awal hanya akan terlihat di awal dan kemudian menghilang.
  const initialTextOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.2], // Menghilang saat progres scroll 10% -> 20%
    [1, 0]
  );

  // 2. Perilaku Teks Sticky (Sebelum Membesar)
  // Kita akan meniru perilakunya agar terlihat menyatu dengan teks awal.
  // Dia akan bergerak dari posisi awalnya ke posisi sticky di tengah layar.
  const stickyTextY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.3], // Bergerak dari 0% -> 20%, lalu diam di tengah dari 20% -> 30%
    ['25vh', '0vh', '0vh'] // Dari offset 25vh di bawah pusat, ke pusat layar (0vh)
  );

  // 3. Animasi Pembesaran Teks Sticky
  // Animasi scale baru dimulai SETELAH teks berada di posisi sticky-nya.
  const scale = useTransform(
    scrollYProgress,
    [0.3, 0.6], // Membesar saat progres scroll 30% -> 60%
    [1, 200] // Dari ukuran normal menjadi 30x lebih besar
  );

  // 4. Animasi Konten Akhir
  // Muncul setelah teks selesai membesar.
  const contentOpacity = useTransform(
    scrollYProgress,
    [0.7, 0.8], // Muncul saat progres scroll 70% -> 80%
    [0, 1]
  );

  // =============================================================================

  return (
    <>
      {/* Bagian 1: Teks awal yang terlihat menyatu dengan teks sticky */}
      {/* Teks ini hanya untuk visual awal, lalu akan di-take over oleh animasi */}
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        {initialLines.map((line, index) => (
          <p
            key={index}
            className='text-4xl md:text-6xl font-bold'>
            {line}
          </p>
        ))}
        {/* Teks sticky placeholder yang akan digantikan oleh versi animasinya */}
        <p className='text-4xl md:text-6xl font-bold'>{stickyText}</p>
      </div>

      {/* Bagian 2: Container yang mengontrol seluruh animasi sticky */}
      <div
        ref={targetRef}
        style={{ height: '250vh', position: 'relative' }}>
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
          }}>
          {/* Elemen-elemen animasi ditempatkan di dalam container sticky ini */}
          <div
            style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* Teks Awal (versi animasi) */}
            <motion.div
              style={{ opacity: initialTextOpacity, position: 'absolute' }}>
              <div className='text-center'>
                {initialLines.map((line, index) => (
                  <p
                    key={index}
                    className='text-4xl md:text-6xl font-bold'>
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>

            {/* Teks Sticky (versi animasi) */}
            <motion.div style={{ y: stickyTextY, scale, position: 'absolute' }}>
              <h1 className='text-4xl md:text-6xl font-bold text-gray-800 whitespace-nowrap'>
                {stickyText}
              </h1>
            </motion.div>

            {/* Konten Akhir */}
            <motion.div
              style={{
                opacity: contentOpacity,
                position: 'absolute',
                zIndex: 2,
                padding: '2rem',
              }}>
              {children}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
