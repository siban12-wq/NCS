export const rainVertexShader = `
uniform float uTime;
uniform float uSpeed;

attribute vec3 aVelocity;

varying float vAlpha;

void main() {
  vec3 pos = position;

  // Falling motion
  float yDisplacement = mod(pos.y - uTime * uSpeed, 10.0) - 5.0;
  pos.y = yDisplacement;

  vAlpha = smoothstep(-5.0, -3.0, pos.y) * smoothstep(5.0, 3.0, pos.y);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = 2.5 * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const rainFragmentShader = `
uniform vec3 uColor;
varying float vAlpha;

void main() {
  // Soft droplet point
  vec2 coord = gl_PointCoord - vec2(0.5);
  float dist = length(coord);
  if (dist > 0.5) discard;

  float alpha = (1.0 - dist * 2.0) * vAlpha * 0.45;
  gl_FragColor = vec4(uColor, alpha);
}
`;
