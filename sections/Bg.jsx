import Image from "next/image";
import bg from "../public/bg.png";

const Bg = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <Image
        src={bg}
        alt="Background"
        fill
        priority
        className="
          object-cover
          object-center
          opacity-20
        "
      />
    </div>
  );
};

export default Bg;