export const skyVertexShader = `
varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vUv = uv;
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  vWorldPosition = worldPosition.xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const skyFragmentShader = `
uniform vec3 uTopColor;
uniform vec3 uBottomColor;
uniform vec3 uHorizonColor;
uniform float uProgress;
uniform float uTime;

varying vec3 vWorldPosition;
varying vec2 vUv;

void main() {
  vec3 dir = normalize(vWorldPosition);
  float h = dir.y; // -1 to 1

  // Gradient transition from bottom horizon to top zenith
  float factor = smoothstep(-0.2, 0.8, h);
  vec3 col = mix(uBottomColor, uTopColor, factor);

  // Subtle ambient shimmer
  float shimmer = sin(vWorldPosition.x * 0.05 + uTime * 0.2) * cos(vWorldPosition.z * 0.05 + uTime * 0.2) * 0.03;
  col += shimmer;

  gl_FragColor = vec4(col, 1.0);
}
`;
