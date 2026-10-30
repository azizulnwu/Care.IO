import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaHeart,
  FaShieldHeart,
  FaUserNurse,
} from "react-icons/fa6";

const CareBanner = () => {
  return (
    <section className="pt-3 overflow-hidden bg-[#F7FBFF]">
      {/* Decorative Background Shapes */}
      <div className="absolute -left-24 -top-24  w-72 rounded-full bg-[#1479C9]/10 blur-3xl" />

      <div className="absolute -bottom-32 -right-24 h-80  rounded-full bg-[#5DA83C]/10 blur-3xl" />

      <div className="container relative mx-auto px-4 py-8 md:py-10 lg:py-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* ================= LEFT CONTENT ================= */}
          <div className="space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div className="flex justify-center lg:justify-start">
              
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold leading-tight text-[#17324D] md:text-5xl lg:text-6xl">
              Trusted Care for
              <span className="block text-[#1479C9]">Your Loved Ones</span>
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-xl text-base leading-7 text-gray-600 md:text-lg lg:mx-0">
              Compassionate and reliable care services for children, elderly
              people, and your entire family. Because every loved one deserves
              care, comfort, and respect.
            </p>

            {/* Buttons */}
            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Link
                href="/service-page"
                className="btn border-none bg-[#1479C9] px-6 text-white shadow-md hover:bg-[#1065A8]"
              >
                All Service
                <FaArrowRight />
              </Link>

              <Link
                href="/contact"
                className="btn border-[#1479C9] bg-transparent px-6 text-[#1479C9] hover:bg-[#1479C9] hover:text-white"
              >
                Contact Us
              </Link>
            </div>

            {/* Trust Features */}
            <div className="flex flex-wrap justify-center gap-5 pt-4 lg:justify-start">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaShieldHeart className="text-xl text-[#5DA83C]" />
                Trusted Care
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FaUserNurse className="text-xl text-[#7C58C8]" />
                Professional Support
              </div>
            </div>
          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div className="relative mx-auto w-full max-w-lg">
            {/* Decorative Circles */}
            <div className="absolute -left-6 top-10 h-24 w-24 rounded-full bg-[#5DA83C]/20 blur-2xl" />

            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[#7C58C8]/20 blur-2xl" />

            {/* Main Visual Card */}
            <div  className="relative rounded-[2rem] border border-white bg-white p-4 shadow-xl md:p-6" >
              {/* Colorful Top Border */}
              

              {/* Logo / Banner Image */}
              <div className=" flex items-center justify-center overflow-hidden rounded-3xl bg-[#F7FBFF]">
                <Image
                  src="/assets/careelder.jpg"
                  alt="Care.io family care illustration"
                  width={200}
                  height={200}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Floating Green Badge */}

            {/* Floating Purple Badge */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareBanner;
