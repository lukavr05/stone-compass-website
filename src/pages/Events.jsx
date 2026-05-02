import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme/index';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Events() {
  const { themeName } = useTheme();
  const isDark = themeName === 'dark';
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const nextShow = {
    title: "stone compass (live for real)",
    venue: "O2 Academy Islington",
    location: "London",
    date: "Jan 29, 2025",
    time: "8:00 PM",
    doors: "6:00 PM",
    ticketUrl: "https://bit.ly/stonecompass",
  };

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const glassBg = isDark ? 'bg-white/5' : 'bg-black/5';
  const glassBorder = isDark ? 'border-white/10' : 'border-black/10';

  return (
    <div
      id="events"
      ref={containerRef}
      className={`min-h-screen ${bgColor} ${textColor} scroll-snap-start relative overflow-hidden`}
    >
      <div className="h-[50vh] relative overflow-hidden">
        <motion.div
          style={{ y: yParallax }}
          className="absolute inset-0 -top-[20%] bg-cover bg-top"
          style={{ backgroundImage: 'url(/images/rehearsal1.JPEG)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-16 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className={`block text-sm tracking-[0.2em] ${mutedColor} mb-2`}
            style={{ fontFamily: fonts.code }}
          >
            Upcoming_Shows
          </span>

          <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
            {nextShow.title}
          </h2>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 rounded-xl border ${glassBorder} ${glassBg} backdrop-blur-sm`}>
            <div className="flex items-start gap-3">
              <Calendar className={mutedColor} size={20} style={{ marginTop: '2px' }} />
              <div>
                <span className={`block text-xs ${mutedColor} mb-1`} style={{ fontFamily: fonts.code }}>Date</span>
                <span className="text-lg font-bold" style={{ fontFamily: fonts.code }}>{nextShow.date}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className={mutedColor} size={20} style={{ marginTop: '2px' }} />
              <div>
                <span className={`block text-xs ${mutedColor} mb-1`} style={{ fontFamily: fonts.code }}>Time</span>
                <span className="text-lg font-bold" style={{ fontFamily: fonts.code }}>{nextShow.time}</span>
                <span className={`block text-xs ${mutedColor}`} style={{ fontFamily: fonts.code }}>Doors: {nextShow.doors}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className={mutedColor} size={20} style={{ marginTop: '2px' }} />
              <div>
                <span className={`block text-xs ${mutedColor} mb-1`} style={{ fontFamily: fonts.code }}>Location</span>
                <span className="text-lg font-bold" style={{ fontFamily: fonts.code }}>{nextShow.venue}</span>
                <span className={`block text-xs ${mutedColor}`} style={{ fontFamily: fonts.code }}>{nextShow.location}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => window.open(nextShow.ticketUrl, '_blank', 'noopener,noreferrer')}
            className={`
              w-full py-4 px-8 rounded-lg text-lg font-bold lowercase transition-all duration-300
              border-2 ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}
              ${isDark ? 'text-white' : 'text-black'}
            `}
            style={{ fontFamily: fonts.code }}
          >
            get_tickets
          </button>

          <p className={`mt-6 text-sm ${mutedColor}`} style={{ fontFamily: fonts.code }}>
            More shows to be announced soon. Check our social media for more info!
          </p>
        </motion.div>
      </div>
    </div>
  );
}