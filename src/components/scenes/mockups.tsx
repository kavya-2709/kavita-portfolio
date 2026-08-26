/**
 * Mock UI set pieces for the scroll cinematic, in the Geniestudio system:
 * bone-white surfaces, 32px radii, pastel washes, charcoal as the only
 * dense fill. Swap any for a real screenshot when the assets are ready.
 */

const PANEL = "h-full w-full overflow-hidden rounded-cards border border-ink/[0.08] bg-bone-white";

function Chrome({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 px-6 pt-5 pb-3">
      <span className="h-2 w-2 rounded-full bg-iris-blue/60" />
      <span className="h-2 w-2 rounded-full bg-powder-blue" />
      <span className="h-2 w-2 rounded-full bg-powder-blue" />
      <span className="ml-2 font-geist text-caption tracking-[0.2em] text-fog uppercase">
        {label}
      </span>
    </div>
  );
}

/* ── Clean4Wheels: 9 steps collapsing to 5 ─────────────────────────── */
export function Clean4Wheels() {
  const before = ["Vehicle", "Type", "Add-ons", "Slot", "Address", "Valet", "Notes", "Review", "Pay"];
  const after = ["Vehicle", "Package", "Slot", "Address", "Pay"];

  return (
    <div className={PANEL}>
      <Chrome label="Clean4Wheels · booking" />
      <div className="space-y-6 px-6 pb-6">
        <div>
          <p className="mb-2 font-geist text-caption tracking-[0.18em] text-fog uppercase">
            Before — 9 steps
          </p>
          <div className="flex flex-wrap gap-1.5">
            {before.map((s) => (
              <span
                key={s}
                className="rounded-full bg-mist-gray px-2.5 py-1 font-geist text-caption text-fog line-through"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 font-geist text-caption tracking-[0.18em] text-iris-blue uppercase">
            After — 5 steps
          </p>
          <div className="flex flex-wrap gap-1.5">
            {after.map((s, i) => (
              <span
                key={s}
                className={`rounded-full px-3 py-1 font-geist text-caption font-medium ${
                  i === 0 ? "bg-charcoal text-paper-white" : "bg-powder-blue text-ink"
                }`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 border-t border-mist-gray pt-4">
          {[
            ["40%", "faster turnaround"],
            ["3", "roles unified"],
            ["1", "design system"],
          ].map(([v, l]) => (
            <div key={l} className="flex-1">
              <p className="font-aeonik text-heading-sm text-ink">{v}</p>
              <p className="font-geist text-caption text-fog">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Aumraa: faith-tech mobile app ──────────────────────────────────── */
export function Aumraa() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-5 rounded-cards bg-violet-wash px-6">
      <div className="h-[86%] w-[180px] shrink-0 overflow-hidden rounded-images bg-bone-white">
        <div className="bg-charcoal px-3 pt-4 pb-5 text-paper-white">
          <p className="font-geist text-caption tracking-[0.18em] uppercase opacity-60">Today</p>
          <p className="font-aeonik text-body-lg">Shukla Paksha</p>
          <p className="mt-0.5 font-geist text-caption opacity-60">Abhijit · 11:48</p>
        </div>
        <div className="space-y-2 p-3">
          {["Ganesh Puja", "Satyanarayan", "Griha Shanti"].map((p, i) => (
            <div
              key={p}
              className={`flex items-center justify-between rounded-cards-sm px-2.5 py-2 ${
                i === 0 ? "bg-powder-blue" : "bg-mist-gray"
              }`}
            >
              <span className="font-geist text-caption text-ink">{p}</span>
              <span className="font-geist text-caption text-iris-blue">Book</span>
            </div>
          ))}
          <div className="rounded-cards-sm bg-charcoal px-2.5 py-2 text-center font-geist text-caption text-paper-white">
            My Pujas
          </div>
        </div>
      </div>

      <div className="flex h-full flex-col justify-center gap-2">
        {["Discovery", "Onboarding", "Panchang", "Puja booking", "Reminders", "My Pujas"].map((f) => (
          <div
            key={f}
            className="rounded-full bg-paper-white/70 px-3 py-1.5 font-geist text-caption text-graphite"
          >
            {f}
          </div>
        ))}
        <p className="mt-1 font-geist text-caption tracking-[0.18em] text-iris-blue uppercase">
          15+ flows · WCAG 2.1
        </p>
      </div>
    </div>
  );
}

/* ── NioPractice: GATE/JEE practice hub ─────────────────────────────── */
export function NioPractice() {
  const subjects = [
    ["Thermodynamics", 82],
    ["Fluid Mechanics", 64],
    ["Strength of Materials", 47],
    ["Heat Transfer", 91],
  ] as const;

  return (
    <div className={PANEL}>
      <Chrome label="NioPractice · practice hub" />
      <div className="grid h-[calc(100%-52px)] grid-cols-[1fr_150px] gap-4 px-6 pb-6">
        <div className="space-y-4">
          {subjects.map(([name, pct]) => (
            <div key={name}>
              <div className="mb-1.5 flex justify-between font-geist text-caption">
                <span className="text-ink">{name}</span>
                <span className="text-fog">{pct}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-mist-gray">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: pct > 75 ? "#0069e0" : "#cce7ff",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-2 rounded-images bg-mint-wash p-4">
          <p className="font-geist text-caption tracking-[0.18em] text-graphite uppercase">
            Custom test
          </p>
          {["Difficulty", "Topics", "Duration"].map((s) => (
            <div
              key={s}
              className="rounded-full bg-paper-white/80 px-2.5 py-1.5 font-geist text-caption text-graphite"
            >
              {s}
            </div>
          ))}
          <div className="rounded-full bg-charcoal px-2.5 py-1.5 text-center font-geist text-caption text-paper-white">
            Start
          </div>
          <p className="pt-1 font-aeonik text-heading-sm text-ink">+28%</p>
          <p className="font-geist text-caption text-graphite">test completion</p>
        </div>
      </div>
    </div>
  );
}

/* ── Housing.com: trust + in-app chat ───────────────────────────────── */
export function Housing() {
  return (
    <div className={PANEL}>
      <Chrome label="Housing.com · in-app chat" />
      <div className="space-y-3 px-6 pb-6">
        <div className="flex items-center gap-2 rounded-full bg-mint-wash px-3 py-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-charcoal font-geist text-caption text-paper-white">
            ✓
          </span>
          <span className="font-geist text-caption text-ink">
            Owner verified · Listing checked
          </span>
        </div>

        {[
          ["them", "Hi! Is the 2BHK still available?"],
          ["me", "Yes — visits open this weekend."],
          ["them", "Can I see the agreement first?"],
        ].map(([who, msg], i) => (
          <div key={i} className={`flex ${who === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[72%] rounded-images px-3.5 py-2.5 font-geist text-caption ${
                who === "me" ? "bg-charcoal text-paper-white" : "bg-mist-gray text-ink"
              }`}
            >
              {msg}
            </div>
          </div>
        ))}

        <div className="rounded-full bg-mist-gray px-3.5 py-2.5 font-geist text-caption text-fog">
          Message — never share payment details
        </div>
      </div>
    </div>
  );
}
