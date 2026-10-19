const ServicesPageCardSkeleton = () => {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] shadow-sm">

      {/* ================= CARD HEADER ================= */}
      <div className="relative bg-[#e5e9ec] px-6 pb-6 pt-7">

        <div className="flex items-start justify-between gap-4">

          {/* Service Icon */}
          <div className="h-16 w-16 rounded-2xl bg-gray-300" />

          {/* Active Status */}
          <div className="h-7 w-24 rounded-full bg-gray-300" />
        </div>

        {/* Category */}
        <div className="mt-5 flex items-center gap-2">
          <div className="h-4 w-4 rounded-full bg-gray-300" />
          <div className="h-4 w-28 rounded bg-gray-300" />
        </div>

        {/* Title */}
        <div className="mt-3 h-7 w-48 rounded bg-gray-300" />
      </div>

      {/* ================= CARD BODY ================= */}
      <div className="flex flex-1 flex-col px-6 py-6">

        {/* Description */}
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-300" />
          <div className="h-4 w-full rounded bg-gray-300" />
          <div className="h-4 w-4/5 rounded bg-gray-300" />
        </div>

        {/* Features */}
        <div className="mt-5">

          {/* What We Offer */}
          <div className="mb-4 flex items-center gap-2">
            <div className="h-5 w-5 rounded-full bg-gray-300" />
            <div className="h-5 w-32 rounded bg-gray-300" />
          </div>

          {/* Feature List */}
          <ul className="space-y-3">

            {[1, 2, 3, 4].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2"
              >
                {/* Check Icon */}
                <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-gray-300" />

                {/* Feature Text */}
                <div
                  className={`h-4 rounded bg-gray-300 ${
                    item === 1
                      ? "w-40"
                      : item === 2
                        ? "w-32"
                        : item === 3
                          ? "w-44"
                          : "w-36"
                  }`}
                />
              </li>
            ))}

          </ul>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* ================= CARD FOOTER ================= */}
        <div className="mt-6 border-t border-gray-200 pt-5">

          {/* Service Details Button */}
          <div className="h-12 w-full rounded-lg bg-gray-300" />

        </div>
      </div>
    </div>
  );
};

export default ServicesPageCardSkeleton;