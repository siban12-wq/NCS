export const ribbonVertexShader = `
uniform float uTime;
uniform float uProgress; // scroll 0 to 1

attribute float aOffset;
attribute float aSpeed;
attribute vec3 aColor;

varying vec3 vColor;
varying vec2 vUv;
varying float vAlpha;

void main() {
  vUv = uv;
  vColor = aColor;

  vec3 pos = position;

  // Stream convergence logic:
  // As uProgress or animation advances, ribbon paths converge towards center (0,0,0)
  float t = uTime * aSpeed + aOffset;
  
  // Wave motion
  float wave = sin(pos.y * 2.0 + t) * 0.2;
  pos.x += wave;
  pos.z += cos(pos.y * 2.0 + t) * 0.2;

  // Ribbon convergence factor (hero stream meeting)
  float convergence = clamp(1.0 - pos.y * 0.3, 0.0, 1.0);
  pos.x *= (1.0 - convergence * 0.6);
  pos.z *= (1.0 - convergence * 0.6);

  vAlpha = smoothstep(-2.0, 0.0, pos.y) * smoothstep(3.0, 1.0, pos.y);

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const ribbonFragmentShader = `
uniform float uTime;
varying vec3 vColor;
varying vec2 vUv;
varying float vAlpha;

void main() {
  // Soft glow across ribbon width
  float glow = sin(vUv.x * 3.14159);
  vec3 col = vColor + vec3(0.2) * glow;
  float alpha = glow * vAlpha * 0.7;

  gl_FragColor = vec4(col, alpha);
}
`;
