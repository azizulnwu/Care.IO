import Navbar from "../../main-layout-components/Navbar";
import {
  FaHandHoldingHeart,
  FaEye,
  FaShieldHeart,
  FaPersonCane,
  FaCalendarDays,
  FaPeopleRoof,
  FaCircleCheck,
} from "react-icons/fa6";
// src/app/mission-vision/page.js (match your actual route)
export const metadata = {
  title: "Our Mission & Vision",
  description:
    "Learn why families choose Care.io. Our mission is to make safe, compassionate and dependable care accessible to every family, with trained caregivers and clear communication.",

  keywords: [
    "Care.io mission",
    "Care.io vision",
    "about Care.io",
    "trusted caregivers",
    "compassionate home care",
    "family care values",
  ],

  alternates: {
    canonical: "/mission-vision", // match your actual route path
  },

  openGraph: {
    type: "website",
    url: "/mission-vision",
    siteName: "Care.io",
    title: "Our Mission & Vision | Care.io",
    description:
      "Care that gives families peace of mind and gives loved ones comfort. Discover the values behind Care.io.",
    images: ["/opengraph-image.jpg"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Our Mission & Vision | Care.io",
    description:
      "Safe, compassionate and dependable care for every family. Learn what drives Care.io.",
     images: ["/opengraph-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

const missionPoints = [
  "Trained, responsible caregivers for children, elders and individuals with special needs",
  "Care delivered at home, where people are most comfortable",
  "Clear communication, so families always know how their loved one is doing",
];

const principles = [
  {
    icon: FaShieldHeart,
    title: "Safety first",
    text: "Every service is built around supervision, responsibility and trust, from childcare to personal assistance.",
  },
  {
    icon: FaPersonCane,
    title: "Dignity and independence",
    text: "We support daily routines without taking away comfort, privacy or a person's sense of independence.",
  },
  {
    icon: FaCalendarDays,
    title: "Care that fits your schedule",
    text: "Hourly, daily, weekly or long-term. You choose the plan that matches your family's needs.",
  },
  {
    icon: FaPeopleRoof,
    title: "Families stay involved",
    text: "Regular updates and open coordination keep you part of every step of care.",
  },
];

const MissionAndVision = () => {
  return (
    <div>
      <header className="sticky top-0 z-40">
        <Navbar></Navbar>
      </header>
      <main>
        <section
          aria-labelledby="mission-vision-title"
          className="bg-[#f5f9ff] py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* ================= HEADING ================= */}
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id="mission-vision-title"
                className="text-balance text-3xl font-extrabold tracking-tight text-[#132e49] sm:text-4xl"
              >
                Why families choose <span className="text-[#1479C9]">Care</span>
                <span className="text-[#F34E65]">.io</span>
              </h2>
              <p className="mt-4 text-base leading-7 text-base-content/70 sm:text-lg">
                Everyone deserves care that is attentive, respectful and easy to
                arrange. This is what we work toward every day.
              </p>
            </div>

            {/* ================= MISSION + VISION ================= */}
            <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-5 lg:gap-8">
              {/* Mission */}
              <article
                aria-labelledby="mission-title"
                className="card relative overflow-hidden rounded-3xl bg-[#1479C9] text-white shadow-xl lg:col-span-3"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-white/10"
                />

                <div className="card-body relative gap-0 p-7 sm:p-9">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 ring-1 ring-inset ring-white/25">
                    <FaHandHoldingHeart
                      className="text-xl"
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    id="mission-title"
                    className="card-title mt-6 text-2xl font-bold tracking-tight sm:text-3xl"
                  >
                    Our mission
                  </h3>

                  <p className="mt-3 max-w-xl text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
                    To make safe, compassionate and dependable care accessible
                    to every family, so children, elders and people who need
                    extra support are looked after with respect, wherever they
                    call home.
                  </p>

                  <div className="divider my-6 before:bg-white/20 after:bg-white/20" />

                  <ul className="space-y-3.5">
                    {missionPoints.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-6 text-white/95 sm:text-base"
                      >
                        <FaCircleCheck
                          className="mt-1 h-4 w-4 shrink-0 text-white"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              {/* Vision */}
              <article
                aria-labelledby="vision-title"
                className="card rounded-3xl border border-base-300 bg-base-100 shadow-md lg:col-span-2"
              >
                <div className="card-body gap-0 p-7 sm:p-9">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff0f2] text-[#F34E65] ring-1 ring-inset ring-[#F34E65]/15">
                    <FaEye className="text-xl" aria-hidden="true" />
                  </div>

                  <h3
                    id="vision-title"
                    className="card-title mt-6 text-2xl font-bold tracking-tight text-[#132e49] sm:text-3xl"
                  >
                    Our vision
                  </h3>

                  <p className="mt-3 text-base leading-7 text-base-content/70 sm:text-lg sm:leading-8">
                    A community where finding trusted care is never stressful,
                    and where every family can count on a caregiver who treats
                    their loved ones as their own.
                  </p>

                  <div className="flex-1" />

                  <p className="mt-8 border-l-4 border-[#F34E65] pl-4 text-sm font-semibold leading-6 text-[#132e49] sm:text-base">
                    Care that gives families peace of mind and gives loved ones
                    comfort.
                  </p>
                </div>
              </article>
            </div>

            {/* ================= PRINCIPLES ================= */}
            <div className="mt-14 lg:mt-16">
              <h3 className="text-center text-xl font-bold tracking-tight text-[#132e49] sm:text-2xl">
                How we put it into practice
              </h3>

              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {principles.map(({ icon: Icon, title, text }) => (
                  <li
                    key={title}
                    className="card border border-base-300 bg-base-100 shadow-sm"
                  >
                    <div className="card-body gap-0 p-6">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1479C9]/10 text-[#1479C9]">
                        <Icon className="text-lg" aria-hidden="true" />
                      </div>

                      <h4 className="card-title mt-4 text-base font-bold text-[#132e49]">
                        {title}
                      </h4>
                      <p className="mt-1.5 text-sm leading-6 text-base-content/70">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MissionAndVision;
