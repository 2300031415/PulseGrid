export default function FloatingParticles() {
  return (
    <>
      <div className="absolute top-24 right-40 text-cyan-100 text-8xl animate-pulse">
        +
      </div>

      <div className="absolute top-[420px] right-[280px] text-teal-100 text-7xl animate-pulse">
        +
      </div>
      <div className="absolute top-24 left-40 text-cyan-100 text-8xl animate-pulse">
        +
      </div>

      <div className="absolute top-[420px] left-[280px] text-teal-100 text-7xl animate-pulse">
        +
      </div>

      <div className="absolute top-[180px] right-[80px] w-4 h-4 rounded-full bg-cyan-200 animate-bounce"></div>

      <div className="absolute top-[320px] right-[520px] w-3 h-3 rounded-full bg-teal-200 animate-bounce"></div>

      <div className="absolute bottom-[120px] right-[150px] w-5 h-5 rounded-full bg-cyan-100 animate-pulse"></div>

      <div className="absolute top-[250px] right-[350px] w-40 h-40 rounded-full bg-teal-200/20 blur-3xl"></div>

      <div className="absolute top-[80px] right-[150px] w-56 h-56 rounded-full bg-cyan-200/20 blur-3xl"></div>
      <div className="absolute top-[180px] left-[80px] w-4 h-4 rounded-full bg-cyan-200 animate-bounce"></div>

      <div className="absolute top-[320px] left-[520px] w-3 h-3 rounded-full bg-teal-200 animate-bounce"></div>

      <div className="absolute bottom-[120px] left-[150px] w-5 h-5 rounded-full bg-cyan-100 animate-pulse"></div>

      <div className="absolute top-[250px] left-[350px] w-40 h-40 rounded-full bg-teal-200/20 blur-3xl"></div>

      <div className="absolute top-[80px] left-[150px] w-56 h-56 rounded-full bg-cyan-200/20 blur-3xl"></div>
    </>
  );
}