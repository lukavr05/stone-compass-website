import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '../hooks/useTheme';
import { fonts } from '../theme/index';
import { useEvents } from '../hooks/useEvents';
import { Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

export default function Events() {
  const { themeName } = useTheme();
  const isDark = themeName === 'dark';
  const { events } = useEvents();
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const bgColor = isDark ? 'bg-black' : 'bg-white';
  const textColor = isDark ? 'text-white' : 'text-black';
  const mutedColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const glassBg = isDark ? 'bg-white/5' : 'bg-black/5';
  const glassBorder = isDark ? 'border-white/10' : 'border-black/10';

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));

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

          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event, index) => (
              <div key={event.id}>
                {index === 0 && (
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 leading-tight">
                    {event.title}
                  </h2>
                )}

                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 rounded-xl border ${glassBorder} ${glassBg} backdrop-blur-sm`}>
                  <div className="flex items-start gap-3">
                    <Calendar className={mutedColor} size={20} style={{ marginTop: '2px' }} />
                    <div>
                      <span className={`block text-xs ${mutedColor} mb-1`} style={{ fontFamily: fonts.code }}>Date</span>
                      <span className="text-lg font-bold" style={{ fontFamily: fonts.code }}>{formatDate(event.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className={mutedColor} size={20} style={{ marginTop: '2px' }} />
                    <div>
                      <span className={`block text-xs ${mutedColor} mb-1`} style={{ fontFamily: fonts.code }}>Time</span>
                      <span className="text-lg font-bold" style={{ fontFamily: fonts.code }}>{formatTime(event.time)}</span>
                      {event.doors && (
                        <span className={`block text-xs ${mutedColor}`} style={{ fontFamily: fonts.code }}>Doors: {formatTime(event.doors)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className={mutedColor} size={20} style={{ marginTop: '2px' }} />
                    <div>
                      <span className={`block text-xs ${mutedColor} mb-1`} style={{ fontFamily: fonts.code }}>Location</span>
                      <span className="text-lg font-bold" style={{ fontFamily: fonts.code }}>{event.venue}</span>
                      <span className={`block text-xs ${mutedColor}`} style={{ fontFamily: fonts.code }}>{event.location}</span>
                    </div>
                  </div>
                </div>

                {event.ticketUrl && (
                  <button
                    onClick={() => window.open(event.ticketUrl, '_blank', 'noopener,noreferrer')}
                    className={`
                      w-full py-4 px-8 rounded-lg text-lg font-bold lowercase transition-all duration-300 flex items-center justify-center gap-2
                      border-2 ${isDark ? 'border-white hover:bg-white hover:text-black' : 'border-black hover:bg-black hover:text-white'}
                      ${isDark ? 'text-white' : 'text-black'}
                    `}
                    style={{ fontFamily: fonts.code }}
                  >
                    get_tickets
                    <ExternalLink size={20} />
                  </button>
                )}

                {index === 0 && (
                  <p className={`mt-6 text-sm ${mutedColor}`} style={{ fontFamily: fonts.code }}>
                    More shows to be announced soon. Check our social media for more info!
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className={`text-xl ${mutedColor}`} style={{ fontFamily: fonts.code }}>
              No upcoming shows scheduled. Check back soon!
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}