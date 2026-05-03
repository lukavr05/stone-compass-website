import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme/index';
import { BrandIcon } from '../constants/platforms.jsx';
import { useGallery } from '../hooks/useGallery';
import { X } from 'lucide-react';
import {
  siYoutubemusic,
  siInstagram,
  siTiktok,
} from 'simple-icons';

const mediaPlatforms = [
  { name: 'YouTube', icon: siYoutubemusic, color: '#FF0000', url: 'https://www.youtube.com/channel/UCDxrFlpeL4LB40u27yVfXjg' },
  { name: 'TikTok', icon: siTiktok, color: '#EE1D52', url: 'https://tiktok.com/@stonecompassmusic' },
  { name: 'Instagram', icon: siInstagram, color: '#DD2A7B', url: 'https://www.instagram.com/stonecompassmusic/' }
];

export default function Media() {
  const { themeName } = useTheme();
  const isDark = themeName === 'dark';
  const { images } = useGallery();
  const [selectedImage, setSelectedImage] = useState(null);
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 600], [0, 120]);

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const glassBg = isDark ? 'bg-white/5' : 'bg-black/5';

  return (
    <div
      id="media"
      ref={containerRef}
      className={`min-h-screen ${bgColor} ${textColor} relative overflow-hidden`}
    >
      <div className="h-[50vh] relative overflow-hidden">
        <motion.div
          style={{ y: yParallax }}
          className="absolute inset-0 -top-[20%] bg-cover bg-top"
          style={{ backgroundImage: 'url(/images/scpromo2.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
      </div>

      <div className="px-6 sm:px-10 md:px-12 lg:px-24 py-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className={`block text-sm tracking-[0.1em] sm:tracking-[0.2em] ${mutedColor} mb-2`}
            style={{ fontFamily: fonts.code }}
          >
            Media_Gallery
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 mb-8"
        >
          {images.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
                ease: 'easeOut'
              }}
              onClick={() => setSelectedImage(item)}
              className={`${glassBg} mb-6 overflow-hidden cursor-pointer break-inside-avoid`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span
            className={`block text-sm tracking-[0.1em] sm:tracking-[0.2em] ${mutedColor} mb-3`}
            style={{ fontFamily: fonts.code }}
          >
            Follow_Us
          </span>

          <div className="flex gap-3 mb-4">
            {mediaPlatforms.map(({ icon, color, url }) => (
              <button
                key={url}
                onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                className={`transition-all duration-250 hover:scale-120 ${textColor}`}
                style={{ color }}
              >
                <BrandIcon icon={icon} size={28} />
              </button>
            ))}
          </div>

          <div className="text-center">
            <p
              className={`text-sm ${mutedColor} max-w-[600px] mx-auto leading-relaxed`}
              style={{ fontFamily: fonts.code }}
            >
              Thank you for scrolling this far! Any and all support, no matter how insignificant it may seem, is beyond appreciated. Keep loving music.
            </p>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-pointer"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-[90%] max-h-[85vh] relative mt-8"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className={`absolute -top-10 right-0 ${textColor} hover:${mutedColor}`}
              >
                <X size={32} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}