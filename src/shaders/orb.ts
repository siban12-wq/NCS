export const orbVertexShader = `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vNormal = normalize(normalMatrix * normal);
  
  // Gentle breathing deformation
  float breath = sin(uTime * 1.5) * 0.04;
  vec3 pos = position + normal * breath;
  
  vPosition = (modelViewMatrix * vec4(pos, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

export const orbFragmentShader = `
uniform float uTime;
uniform vec3 uColorCore;
uniform vec3 uColorGlow;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  // Fresnel edge glow
  vec3 viewDir = normalize(-vPosition);
  float fresnel = dot(viewDir, vNormal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 2.5);

  vec3 col = mix(uColorCore, uColorGlow, fresnel);
  float alpha = smoothstep(0.0, 0.8, fresnel) * 0.85 + 0.15;

  gl_FragColor = vec4(col, alpha);
}
`;
