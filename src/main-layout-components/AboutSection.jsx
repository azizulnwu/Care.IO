import {
  FaHeart,
  FaShieldHeart,
  FaUsers,
  FaHandHoldingHeart,
} from "react-icons/fa6";


const tones = {
  blue: "bg-[#eaf4fc] text-[#1479C9] ring-[#1479C9]/15 group-hover:bg-[#1479C9] group-hover:text-white",
  pink: "bg-[#fff0f2] text-[#F34E65] ring-[#F34E65]/15 group-hover:bg-[#F34E65] group-hover:text-white",
};

const values = [
  {
    icon: FaHandHoldingHeart,
    title: "Compassionate Care",
    text: "We put the comfort, dignity, and well-being of every individual first.",
    tone: "blue",
  },
  {
    icon: FaShieldHeart,
    title: "Safety & Trust",
    text: "We aim to create a safe and dependable care experience for every family.",
    tone: "pink",
  },
  {
    icon: FaUsers,
    title: "Family-Centered Service",
    text: "We work to make care more accessible and convenient for families.",
    tone: "blue",
  },
  {
    icon: FaHeart,
    title: "Family First",
    text: "Care designed around your loved ones.",
    tone: "pink",
  },
  {
    icon: FaShieldHeart,
    title: "Reliable Care",
    text: "Support you can count on.",
    tone: "blue",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Caring Community",
    text: "Building a better care experience.",
    tone: "pink",
  },
];

const AboutSection = () => {
  return (
    <section
      aria-labelledby="about-title"
      className="bg-[#f5f9ff] px-4 py-16 sm:px-6 md:py-20 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        {/* ================= ABOUT CONTENT ================= */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Section Label */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1479C9]/15 bg-white px-4 py-1.5 text-sm font-semibold text-[#1479C9] shadow-sm">
            <FaHeart className="text-xs text-[#F34E65]" aria-hidden="true" />
            About Care.io
          </div>

          {/* Heading */}
          <h2
            id="about-title"
            className="text-balance text-3xl font-extrabold leading-tight tracking-tight text-[#132e49] md:text-4xl lg:text-5xl"
          >
            Caring for Your Family,
            <span className="block text-[#1479C9]">Like Our Own</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg md:leading-8">
            At Care.io, we believe that everyone deserves reliable,
            compassionate, and respectful care. Our mission is to connect
            families with dependable care services that support children,
            elderly people, and loved ones. We aim to make finding quality care
            simple, transparent, and convenient—so families can focus on what
            matters most.
          </p>
        </div>

        {/* ================= CORE VALUES ================= */}
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {values.map(({ icon: Icon, title, text, tone }) => (
            <li
              key={title}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(19,46,73,0.06),0_8px_24px_-12px_rgba(19,46,73,0.12)] transition duration-300 hover:-translate-y-1 hover:border-[#1479C9]/40 hover:shadow-[0_2px_4px_rgba(19,46,73,0.06),0_24px_40px_-20px_rgba(20,121,201,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 ring-inset transition-colors duration-300 motion-reduce:transition-none ${tones[tone]}`}
              >
                <Icon className="text-xl" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-lg font-bold tracking-tight text-[#132e49]">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutSection;