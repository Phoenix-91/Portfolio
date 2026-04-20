'use client'
import { useEffect } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = document.getElementById('cursor-dot')
    const ring = document.getElementById('cursor-ring')

    if (!dot || !ring) return

    // Make them visible
    gsap.set([dot, ring], { opacity: 1 })

    const onMouseMove = (e: MouseEvent) => {
      // Dot follows instantly (from SKILL.md §13 Custom cursor)
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        overwrite: 'auto',
      })
      // Ring follows with 80ms lag
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.12,
        overwrite: 'auto',
        ease: 'power2.out',
      })
    }

    const onMouseEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, opacity: 0.6, duration: 0.2, ease: 'power2.out' })
      ring.classList.add('hovered')
    }

    const onMouseLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.2, ease: 'power2.out' })
      ring.classList.remove('hovered')
    }

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
    }

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor="hover"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    }

    // Initial pass + watch for DOM changes
    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div id="cursor-dot" style={{ opacity: 0 }} />
      <div id="cursor-ring" style={{ opacity: 0 }} />
    </>
  )
}
