import { useState, useRef, useCallback, useEffect } from 'react';

// Karakter yang digunakan untuk pengacakan
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefhgijklmnopqrstuvwxyz1234567890';

export const useScrambleEffect = () => {
  const [displayText, setDisplayText] = useState('');
  const intervalRef = useRef(null);
  const originalTextRef = useRef('');

  // Efek untuk membersihkan interval saat komponen dilepas (unmount)
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  /**
   * Mengacak teks dan secara bertahap menampilkannya.
   * @param {string} text - Teks asli yang akan ditampilkan.
   * @param {function} onComplete - Callback yang dijalankan setelah animasi selesai.
   */
  const scramble = useCallback((text, onComplete) => {
    originalTextRef.current = text;
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (index < iteration) return originalTextRef.current[index];
          if (char === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (iteration >= originalTextRef.current.length) {
        clearInterval(intervalRef.current);
        if (onComplete) onComplete();
      }

      // PERUBAHAN 1: Kecepatan pengungkapan karakter diperlambat (lebih smooth)
      iteration += 1 / 4;
    }, 50); // PERUBAHAN 2: Interval pengacakan diperlambat (dari 30ms menjadi 50ms)
  }, []);

  /**
   * Fungsi BARU: Mengacak teks secara terus-menerus tanpa henti.
   * @param {string} text - Teks yang menjadi dasar pengacakan.
   */
  const continuousScramble = useCallback((text) => {
    originalTextRef.current = text;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split('')
        .map((char) => {
          if (char === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join('');
      setDisplayText(scrambled);
    }, 100); // Kecepatan loop bisa diatur berbeda agar tidak terlalu ramai
  }, []);

  /**
   * Menghentikan semua animasi acak dan menampilkan teks asli.
   */
  const stopScramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setDisplayText(originalTextRef.current);
  }, []);

  return { displayText, scramble, stopScramble, continuousScramble };
};
