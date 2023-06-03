'use client'
import { useTransition } from '@react-spring/web'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

// Client wraps any client/rsc components with AnimatePresence
export default function RouterTransition({ children }) {
  const pathname = usePathname()
  return (
    <AnimatePresence mode='wait' initial={false}>
      <motion.div key={pathname} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
