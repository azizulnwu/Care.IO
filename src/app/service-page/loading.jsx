import ServicesPageCardSkeleton from "@/components/service/ServicePageCardSkeleton";

const Loading = () => {
  return (
    <div className="grid gap-6 px-4 py-10 grid-cols-3 md:grid-cols-2 lg:grid-cols-1">
      {Array.from({ length: 6 }).map((_, index) => (
        <ServicesPageCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default Loading;