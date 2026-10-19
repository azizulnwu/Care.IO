

const ServiceDetailsPageSkeleton = () => {
  return (
    <main className="min-h-screen bg-[#f7f9fb] px-4 py-10 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">

        {/* ================= BACK BUTTON SKELETON ================= */}
        <div className="mb-6 h-5 w-32 animate-pulse rounded bg-gray-300" />

        {/* ================= MAIN CARD ================= */}
        <div className="overflow-hidden rounded-2xl border border-[#1479C9]/10 bg-[#cfd6dd] shadow-lg">

          {/* ================= HEADER ================= */}
          <div className="relative bg-[#e5e9ec] px-6 py-8 md:px-10 md:py-10">

            {/* Decorative top pattern */}
            <div className="absolute left-0 top-0 flex h-1.5 w-full">
              <div className="w-1/2 bg-[#1479C9]/30" />
              <div className="w-1/4 bg-[#5DA83C]/30" />
              <div className="w-1/4 bg-[#7C58C8]/30" />
            </div>

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              {/* Service Icon + Title */}
              <div className="flex items-center gap-5">

                {/* Icon */}
                <div className="h-20 w-20 shrink-0 animate-pulse rounded-2xl bg-gray-300" />

                <div>
                  {/* Category */}
                  <div className="mb-3 h-4 w-28 animate-pulse rounded bg-gray-300" />

                  {/* Title */}
                  <div className="h-9 w-56 animate-pulse rounded bg-gray-300 md:w-72" />
                </div>
              </div>

              {/* Status */}
              <div className="h-8 w-28 animate-pulse rounded-full bg-gray-300" />
            </div>
          </div>

          {/* ================= BODY ================= */}
          <div className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-3">

            {/* ================= LEFT CONTENT ================= */}
            <div className="lg:col-span-2">

              {/* About Service */}
              <section>
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-5 w-5 animate-pulse rounded-full bg-gray-300" />

                  <div className="h-6 w-44 animate-pulse rounded bg-gray-300" />
                </div>

                <div className="space-y-3">
                  <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
                  <div className="h-4 w-full animate-pulse rounded bg-gray-300" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-gray-300" />
                  <div className="h-4 w-8/12 animate-pulse rounded bg-gray-300" />
                </div>
              </section>

              {/* What We Offer */}
              <section className="mt-8">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-5 w-5 animate-pulse rounded-full bg-gray-300" />

                  <div className="h-6 w-40 animate-pulse rounded bg-gray-300" />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-[#e5e9ec] px-4 py-4"
                    >
                      <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-gray-300" />

                      <div className="h-4 w-36 animate-pulse rounded bg-gray-300" />
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Choose Care.io */}
              <section className="mt-8">
                <div className="mb-5 flex items-center gap-2">
                  <div className="h-5 w-5 animate-pulse rounded-full bg-gray-300" />

                  <div className="h-6 w-48 animate-pulse rounded bg-gray-300" />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl bg-[#e5e9ec] p-4"
                    >
                      <div className="mb-3 h-7 w-7 animate-pulse rounded-full bg-gray-300" />

                      <div className="mb-2 h-4 w-24 animate-pulse rounded bg-gray-300" />

                      <div className="space-y-2">
                        <div className="h-3 w-full animate-pulse rounded bg-gray-300" />
                        <div className="h-3 w-5/6 animate-pulse rounded bg-gray-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* ================= BOOKING CARD ================= */}
            <aside className="lg:col-span-1">
              <div className="rounded-2xl bg-[#e5e9ec] p-6 shadow-md">

                {/* Heading */}
                <div className="h-6 w-44 animate-pulse rounded bg-gray-300" />

                {/* Description */}
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-gray-300" />
                  <div className="h-3 w-11/12 animate-pulse rounded bg-gray-300" />
                  <div className="h-3 w-8/12 animate-pulse rounded bg-gray-300" />
                </div>

                {/* Availability */}
                <div className="mt-5 flex items-center gap-3 rounded-xl bg-white px-4 py-3">
                  <div className="h-3 w-3 animate-pulse rounded-full bg-gray-300" />

                  <div className="space-y-2">
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-300" />
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-300" />
                  </div>
                </div>

                {/* Book Button */}
                <div className="mt-5 h-12 w-full animate-pulse rounded-lg bg-gray-300" />

                {/* Bottom text */}
                <div className="mt-4 space-y-2">
                  <div className="h-3 w-full animate-pulse rounded bg-gray-300" />
                  <div className="mx-auto h-3 w-4/5 animate-pulse rounded bg-gray-300" />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ServiceDetailsPageSkeleton;