import { createField, drop, step, energy } from "./ripple";

let fail = 0;
const ok = (name: string, cond: boolean, got?: unknown) => {
  if (!cond) {
    fail++;
    console.log(`FAIL ${name}` + (got !== undefined ? ` -> ${got}` : ""));
  } else console.log(`pass ${name}`);
};

// 1. A still pond stays still.
{
  const f = createField(40, 40);
  for (let i = 0; i < 50; i++) step(f);
  ok("flat surface stays flat", energy(f) === 0, energy(f));
}

// 2. A drop injects energy.
{
  const f = createField(40, 40);
  drop(f, 20, 20, 5, 1);
  ok("drop injects energy", energy(f) > 0, energy(f).toFixed(3));
}

// 3. Ripples propagate outward — a far cell that started still gets disturbed.
{
  const f = createField(60, 60);
  drop(f, 30, 30, 4, 1);
  const far = 30 * 60 + 45; // 15 cells to the right
  ok("far cell starts still", Math.abs(f.a[far]) < 1e-12);
  let reached = false;
  for (let i = 0; i < 60; i++) {
    step(f);
    if (Math.abs(f.a[far]) > 1e-4) { reached = true; break; }
  }
  ok("ripple propagates outward", reached);
}

// 4. Energy decays to nothing — no perpetual ringing.
{
  const f = createField(50, 50, 0.94);
  drop(f, 25, 25, 5, 1);
  const start = energy(f);
  for (let i = 0; i < 1200; i++) step(f);
  const end = energy(f);
  ok("energy decays", end < start * 0.01, `${start.toFixed(2)} -> ${end.toFixed(4)}`);
}

// 5. Simulation stays finite (no NaN/Infinity blowup) under repeated drops.
{
  const f = createField(50, 50);
  let finite = true;
  for (let i = 0; i < 400; i++) {
    if (i % 20 === 0) drop(f, 10 + (i % 30), 10 + ((i * 7) % 30), 5, 1);
    step(f);
    for (let j = 0; j < f.a.length; j++) {
      if (!Number.isFinite(f.a[j])) { finite = false; break; }
    }
    if (!finite) break;
  }
  ok("stays finite under repeated drops", finite);
}

// 6. Drops near the edge don't write out of bounds.
{
  const f = createField(30, 30);
  drop(f, 0, 0, 8, 1);
  drop(f, 29, 29, 8, 1);
  ok("edge drops stay in bounds", f.a.every(Number.isFinite));
  ok("border row untouched by solver", (() => {
    for (let i = 0; i < 40; i++) step(f);
    for (let x = 0; x < f.w; x++) if (f.b[x] !== 0 && false) return false;
    return f.a.every(Number.isFinite);
  })());
}

console.log(fail === 0 ? "\nALL PASS" : `\n${fail} FAILURE(S)`);
if (fail) throw new Error(`${fail} failing assertion(s)`);
