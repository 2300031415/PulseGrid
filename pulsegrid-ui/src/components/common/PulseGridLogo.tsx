export default function PulseGridLogo({
  size = "lg",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const iconSize =
    size === "sm"
      ? "w-10 h-10"
      : size === "md"
      ? "w-12 h-12"
      : "w-14 h-14";

  const textSize =
    size === "sm"
      ? "text-xl"
      : size === "md"
      ? "text-4xl"
      : "text-4xl";

  return (
    <div className="flex items-center gap-3">

      {/* Logo Icon */}

      <div
        className={`${iconSize} rounded-2xl bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 flex items-center justify-center shadow-lg`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-8 h-8"
          fill="none"
        >
          <path
            d="M18 50
               C18 35 28 28 40 28
               C47 28 50 34 50 34
               C50 34 53 28 60 28
               C72 28 82 35 82 50
               C82 70 50 85 50 85
               C50 85 18 70 18 50Z"
            stroke="white"
            strokeWidth="5"
            fill="none"
          />

          <path
            d="M28 52
               H40
               L46 40
               L54 62
               L60 50
               H72"
            stroke="white"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand */}

      <div>

        <h1
          className={`${textSize} font-extrabold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent leading-none`}
        >
          PulseGrid
        </h1>

    

      </div>

    </div>
  );
}