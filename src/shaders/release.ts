export const releaseVertexShader = `
uniform float uTime;
attribute vec3 aVelocity;
attribute float aLifetime;

varying float vLife;

void main() {
  vec3 pos = position;

  // Rising particles (leaving worry behind)
  float age = mod(uTime + aLifetime, 4.0);
  pos += aVelocity * age;

  vLife = 1.0 - (age / 4.0);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = (4.0 * vLife) * (200.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const releaseFragmentShader = `
uniform vec3 uColor;
varying float vLife;

void main() {
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;

  float alpha = (1.0 - dist * 2.0) * vLife * 0.8;
  gl_FragColor = vec4(uColor, alpha);
}
`;
