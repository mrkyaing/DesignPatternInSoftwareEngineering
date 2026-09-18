const G = 6.67430e-11;
const earthMass = 5.9722e24;
const earthRadius = 6_371_000;
const canvas = document.getElementById('orbit');
const ctx = canvas.getContext('2d');
// DOM for index file
const altitudeInput = document.getElementById('altitude');
const speedInput = document.getElementById('speed');
const toggle = document.getElementById('toggle');
let angle = -Math.PI / 2;
let running = true;
let lastTime = 0;

function quantities() {
    const altitude = Number(altitudeInput.value) * 1000;
    const r = earthRadius + altitude;
    const velocity = Math.sqrt(G * earthMass / r);
    const force = (G * earthMass) / (r ** 2);
    const period = 2 * Math.PI * Math.sqrt(r ** 3 / (G * earthMass));
    document.getElementById('altitudeLabel').textContent = `${altitude / 1000} km`;
    document.getElementById('speedLabel').textContent = `${speedInput.value}×`;
    document.getElementById('velocity').textContent = `${(velocity / 1000).toFixed(2)} km/s`;
    document.getElementById('period').textContent = period < 7200? `${(period / 60).toFixed(1)} minutes`: `${(period / 3600).toFixed(1)} hours`;
    return { r, period, velocity, force };
}

function draw(time) {
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const { r, period, velocity, force } = quantities();
    const dt = Math.min((time - lastTime) / 1000 || 0, 0.1);
    lastTime = time;
    // One visual revolution takes 12 seconds at 1×. Physics values above remain real.
    if (running) 
        angle += dt * Number(speedInput.value) * 2 * Math.PI / 12;
    const cx = w / 2, cy = h / 2;
    const orbitRadius = Math.min(w * 0.40, h * 0.41);
    
    // Cap Earth's drawn size so both force arrows remain readable at low altitude.
    const earthVisualRadius = Math.min(orbitRadius * 0.62, Math.max(28, orbitRadius * earthRadius / r));
    ctx.strokeStyle = '#7196c7'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, cy, orbitRadius, 0, 2 * Math.PI); ctx.stroke();
    
    const earth = ctx.createRadialGradient(cx - earthVisualRadius * .3, cy - earthVisualRadius * .3, 2, cx, cy, earthVisualRadius);
    earth.addColorStop(0, '#59c3ec'); earth.addColorStop(0.65, '#2572bc'); earth.addColorStop(1, '#123c78');
    ctx.fillStyle = earth; ctx.beginPath(); ctx.arc(cx, cy, earthVisualRadius, 0, 2 * Math.PI); ctx.fill();
    ctx.font = '16px system-ui'; ctx.textAlign = 'center'; ctx.fillStyle = '#ffffff';
    ctx.fillText('Earth', cx, cy + 5);
    
    const sx = cx + orbitRadius * Math.cos(angle), sy = cy + orbitRadius * Math.sin(angle);
    ctx.fillStyle = '#ffd67a'; ctx.beginPath(); ctx.arc(sx, sy, 8, 0, 2 * Math.PI); ctx.fill();
    ctx.fillStyle = '#edf4ff'; ctx.font = '13px system-ui';
    ctx.fillText('Satellite', sx, sy - 17);
    ctx.fillStyle = '#9ce3ff';
    ctx.fillText(`v = ${(velocity / 1000).toFixed(2)} km/s`, sx + 12, sy + 18);
    
    // Tangent arrow shows forward velocity.
    const tx = -Math.sin(angle), ty = Math.cos(angle);
    const ex = sx + tx * 35, ey = sy + ty * 35;
    ctx.strokeStyle = '#ffd67a'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(ex, ey); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - tx * 9 - ty * 5, ey - ty * 9 + tx * 5);
    ctx.moveTo(ex, ey); ctx.lineTo(ex - tx * 9 + ty * 5, ey - ty * 9 - tx * 5); ctx.stroke();
    
    // Gravity always points from the satellite toward Earth's center.
    const gx = -Math.cos(angle), gy = -Math.sin(angle);
    const gravityLength = Math.min(58, orbitRadius - earthVisualRadius - 12);
    const gex = sx + gx * gravityLength, gey = sy + gy * gravityLength;
    ctx.strokeStyle = '#ff7685'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(gex, gey); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(gex, gey);
    ctx.lineTo(gex - gx * 10 - gy * 6, gey - gy * 10 + gx * 6);
    ctx.moveTo(gex, gey);
    ctx.lineTo(gex - gx * 10 + gy * 6, gey - gy * 10 - gx * 6);
    ctx.stroke();
    ctx.fillStyle = '#ff9da8'; ctx.font = '13px system-ui';
    ctx.fillText('Gravity', sx + gx * gravityLength * .5, sy + gy * gravityLength * .5 - 9);
    ctx.fillText(`F = ${(force / 1000).toFixed(2)} kN`, sx + gx * gravityLength * .55, sy + gy * gravityLength * .55 - 25);
    requestAnimationFrame(draw);
}
toggle.addEventListener('click', () => { 
    running = !running; 
    toggle.textContent = running ? 'Pause' : 'Play'; 
});
requestAnimationFrame(draw);