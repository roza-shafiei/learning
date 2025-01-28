import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useBreakPoints } from './useBreakPoints'

export default function useWindowResize() {
  // Window width
  const width = ref(
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  )

  const isSmDown = computed(() =>
    width.value < +useBreakPoints.sm.min.replace('px', '')
  )
  const isMdDown = computed(() =>
    width.value < +useBreakPoints.md.min.replace('px', '')
  )
  const isLgDown = computed(() =>
    width.value < +useBreakPoints.lg.min.replace('px', '')
  )
  const isXlDown = computed(() =>
    width.value < +useBreakPoints.xl.min.replace('px', '')
  )
  const isXxlDown = computed(() =>
    width.value <= +useBreakPoints.xxl.min.replace('px', '')
  )

  // Handler for window resize events
  const handleResize = () => {
    width.value = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  }

  // Lifecycle hooks
  onMounted(() => {
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    width,
    isSmDown,
    isMdDown,
    isLgDown,
    isXlDown,
    isXxlDown
  }
}
