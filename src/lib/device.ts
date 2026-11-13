export function hasWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia('(pointer: coarse)').matches
  );
}

export function getDeviceSpecs() {
  if (typeof window === 'undefined') {
    return { memory: 4, cores: 4, isMobile: false, hasGL: true };
  }
  const nav = navigator as unknown as { deviceMemory?: number; hardwareConcurrency?: number };
  const memory = nav.deviceMemory || 4;
  const cores = nav.hardwareConcurrency || 4;
  const isMobile = isTouchDevice() || window.innerWidth < 768;
  const hasGL = hasWebGL();

  return { memory, cores, isMobile, hasGL };
}
