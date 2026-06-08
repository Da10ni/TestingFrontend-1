import React, { useRef, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useGSAP } from "@gsap/react";
import mainImage from "./assets/main-image.png";

gsap.registerPlugin(Observer, useGSAP);

type Faction = {
  name: string;
  description: string;
  icon: React.ReactNode;
  image: string;
};

const factions: Faction[] = [
  {
    name: "The Celeste Group",
    description:
      "A conglomerate of energy firms in a joint venture with private intelligence.",
    icon: <ShieldIcon />,
    image: mainImage,
  },
  {
    name: "0X898",
    description:
      "A rag tag group of dissidents and extremists, with the cause of freedom of information and equality.",
    icon: <SkullIcon />,
    image: mainImage,
  },
  {
    name: "Patriots Division",
    description:
      "An American security company specializing in arms manufacturing.",
    icon: <BladeIcon />,
    image: mainImage,
  },
  {
    name: "Lebenskraft Armorers",
    description: "A global materials science firm that develops next-generation robots.",
    icon: <CrestIcon />,
    image: mainImage,
  },
  {
    name: "Sanzu Biomedical",
    description:
      "A triumvirate of leading organizations in technology, science and government.",
    icon: <StarBurstIcon />,
    image: mainImage,
  },
  {
    name: "Junpei Light & Power",
    description: "Asia's largest multinational and specialist in fusion technology.",
    icon: <FlameIcon />,
    image: mainImage,
  },
  {
    name: "Deadeye Enforcers",
    description: "A global network of NATO members.",
    icon: <ShieldIcon />,
    image: mainImage,
  },
];

const SLAT_COUNT = 6;

const App = () => {
  const stripRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFaction = factions[activeIndex];

  // Each slat expands from a narrow center sliver out to full width, while the
  // dimmed icon overlay fades away to reveal the bright image. Staggered
  // top-to-bottom so the slats open sequentially while overlapping. Runs on
  // hover over the hero.
  const playReveal = () => {
    const hero = heroRef.current;
    if (!hero) return;
    gsap.to(hero.querySelector("[data-overlay]"), {
      autoAlpha: 0,
      duration: 0.4,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.fromTo(
      hero.querySelectorAll<HTMLElement>("[data-slat]"),
      { clipPath: "inset(0% 46% 0% 46%)", autoAlpha: 0, filter: "blur(10px)" },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        overwrite: true,
      }
    );
  };

  // Inverse of playReveal — slats collapse back to the center sliver (stagger
  // reversed, bottom-to-top) and the dimmed icon overlay fades back in. Runs on
  // hover out.
  const playClose = () => {
    const hero = heroRef.current;
    if (!hero) return;
    gsap.to(hero.querySelectorAll<HTMLElement>("[data-slat]"), {
      clipPath: "inset(0% 46% 0% 46%)",
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.in",
      stagger: { each: 0.12, from: "end" },
      overwrite: true,
      // Once the outro finishes, snap the slats back to the resting full-width
      // dim image. The overlay is fully opaque by now, so this is hidden — it
      // just restores the faint backdrop the icon silhouette sits against.
      onComplete: () => {
        gsap.set(hero.querySelectorAll<HTMLElement>("[data-slat]"), {
          clipPath: "inset(0% 0% 0% 0%)",
          autoAlpha: 1,
          filter: "blur(10px)",
        });
      },
    });
    gsap.to(hero.querySelector("[data-overlay]"), {
      autoAlpha: 1,
      duration: 0.5,
      ease: "power2.in",
      overwrite: true,
    });
  };

  // Resting state (initial load + whenever the active faction changes while not
  // hovering): full-width slats sitting dim behind the visible icon overlay.
  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;
      gsap.set(hero.querySelectorAll<HTMLElement>("[data-slat]"), {
        clipPath: "inset(0% 0% 0% 0%)",
        autoAlpha: 1,
        filter: "blur(10px)",
      });
      gsap.set(hero.querySelector("[data-overlay]"), { autoAlpha: 1 });
    },
    { dependencies: [activeIndex], scope: heroRef }
  );

  useGSAP(
    () => {
      const el = stripRef.current;
      if (!el) return;

      Observer.create({
        target: el,
        type: "wheel,touch",
        // turn vertical wheel/trackpad movement into horizontal scroll
        onChangeY: (self) => {
          const max = el.scrollWidth - el.clientWidth;
          if (max <= 0) return;
          const next = gsap.utils.clamp(0, max, el.scrollLeft + self.deltaY * 1.5);
          gsap.to(el, {
            scrollLeft: next,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        },
        // only hijack the page scroll while there's room to scroll horizontally
        preventDefault: true,
        tolerance: 10,
      });
    },
    { scope: stripRef }
  );

  return (
    <div className="font-oxanium min-h-screen bg-[#0a0a0c] text-neutral-300 flex flex-col">
      {/* Top letterbox bar */}
      <div className="h-12 bg-black/80 shrink-0" />

      {/* Main content */}
      <main className="flex-1 px-8 md:px-16 lg:px-24 py-10 bg-gradient-to-b from-[#000000] to-[#0d0d12]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left column */}
          <section className="max-w-xl">
            <h2 className="text-3xl font-extralight uppercase tracking-[0.15em] text-transparent [-webkit-text-stroke:0.6px_rgb(160,160,165)]">
              Choose Your
            </h2>
            <h1 className="-mt-1 text-6xl md:text-7xl font-bold uppercase tracking-tight text-white">
              Faction
            </h1>

            <div className="mt-8 space-y-6 text-base leading-relaxed text-neutral-400">
              <p>
                Agents will be customizable, allowing you to select from among the
                various factions in the game - will you fight for a global police force
                seeking to enact a new brand of justice? Or will you battle alongside a
                secret network of deviants and outcasts?
              </p>
              <p>
                Once you acquire your agent, the choice is yours. Pledging your
                allegiance is no small decision - as your agent accrues Loyalty Points
                over time, your choices truly matter.
              </p>
            </div>

            <button
              type="button"
              className="mt-10 cursor-pointer bg-white px-8 py-3 text-sm font-bold uppercase tracking-[0.08em] text-black transition-colors hover:bg-neutral-200 [clip-path:polygon(0_0,100%_0,86%_100%,0_100%)]"
            >
              Utility
            </button>
          </section>

          {/* Right column: faction image revealed through horizontal slats */}
          <section
            ref={heroRef}
            onMouseEnter={playReveal}
            onMouseLeave={playClose}
            className="relative flex aspect-square w-full cursor-pointer flex-col gap-1.5 overflow-hidden bg-black"
          >
            {Array.from({ length: SLAT_COUNT }).map((_, i) => (
              <div
                key={i}
                data-slat
                className="flex-1 bg-cover bg-no-repeat"
                style={{
                  backgroundImage: `url(${activeFaction.image})`,
                  backgroundSize: `100% ${SLAT_COUNT * 100}%`,
                  // each slat shows its horizontal slice of the full image
                  backgroundPosition: `center ${(i / (SLAT_COUNT - 1)) * 100}%`,
                }}
              />
            ))}

            {/* Resting overlay: dims the image and shows the active faction
                icon as a large centered silhouette until the hero is hovered. */}
            <div
              data-overlay
              className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/90 via-black/80 to-black/95"
            >
              <div className="text-black drop-shadow-[0_2px_24px_rgba(0,0,0,0.85)] [&_svg]:h-56 [&_svg]:w-56">
                {activeFaction.icon}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Faction cards strip */}
      <footer className="border-t border-white/10 bg-[#050506]">
        <div
          ref={stripRef}
          className="flex overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {factions.map((faction, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={faction.name}
                type="button"
                onClick={() => setActiveIndex(i)}
                className={`flex min-h-44 w-64 shrink-0 cursor-pointer flex-col border-r border-white/10 p-5 text-left transition-colors ${
                  isActive ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <h3
                  className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                    isActive ? "text-white" : "text-neutral-200"
                  }`}
                >
                  {faction.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  {faction.description}
                </p>
                <div
                  className={`mt-auto flex justify-center pt-5 ${
                    isActive ? "text-white" : "text-neutral-300"
                  }`}
                >
                  {faction.icon}
                </div>
              </button>
            );
          })}
        </div>
      </footer>
    </div>
  );
};

/* --- Emblems & icons --- */

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Zm0 3.5L17 7v4c0 3.3-2.2 6-5 7.7C9.2 17 7 14.3 7 11V7l5-1.5Z" />
      <path d="M12 8 9 9.5V12c0 1.8 1.2 3.3 3 4.2 1.8-.9 3-2.4 3-4.2V9.5L12 8Z" />
    </svg>
  );
}

function SkullIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2C7 2 3 5.8 3 10.5c0 2.6 1.2 4.9 3 6.4V20a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-3.1c1.8-1.5 3-3.8 3-6.4C21 5.8 17 2 12 2ZM8.5 12a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6Zm7 0a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6ZM10 19v-2h1.2v2H10Zm2.8 0v-2H14v2h-1.2Z" />
    </svg>
  );
}

function BladeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 21 14 10l5 5L8 26" transform="translate(0 -4)" />
      <path d="M14 10 20 4l1 1-5 6" fill="currentColor" />
      <path d="M5 19 8 16" />
    </svg>
  );
}

function CrestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2 3 6v6c0 5 4 9 9 10 5-1 9-5 9-10V6l-9-4Zm0 4 4 2v3l-4 2-4-2V8l4-2Z" />
    </svg>
  );
}

function StarBurstIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 1 14 9 22 7 16 12 22 17 14 15 12 23 10 15 2 17 8 12 2 7 10 9 12 1Z" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
      <path d="M12 2c1 4-3 6-3 10a3 3 0 0 0 6 0c0-1.5-.8-2.5-1.5-3.5C15 11 17 13 17 16a5 5 0 0 1-10 0C7 10 11 7 12 2Z" />
    </svg>
  );
}

export default App;
