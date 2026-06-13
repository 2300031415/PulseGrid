export default function ECGAnimation() {
  return (
    <div className="absolute left-[48%] top-[40%] -translate-x-1/2 z-20 opacity-70">

      <svg
        width="180"
        height="80"
        viewBox="0 0 180 80"
        className="overflow-visible"
      >
        <polyline
          fill="none"
          stroke="#20C5B5"
          strokeWidth="4"
          points="
            0,40
            25,40
            40,40
            55,10
            70,70
            90,40
            110,40
            125,40
            140,15
            155,65
            180,40
          "
        >
          <animate
            attributeName="stroke-dashoffset"
            from="400"
            to="0"
            dur="3s"
            repeatCount="indefinite"
          />
        </polyline>
      </svg>

    </div>
  );
}