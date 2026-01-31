// bento card - shadcn/magicui inspired with glow effects
import { cn } from "../../lib/utils";

const BentoCard = ({
  children,
  className,
  span = 'default',
  hover = true,
  accent = false,
  glow = false,
  onClick = null,
}) => {
  const spanClasses = {
    default: '',
    wide: 'md:col-span-2 lg:col-span-2',
    tall: 'md:row-span-2 flex flex-col',
    feature: 'md:col-span-2 md:row-span-2',
    full: 'md:col-span-2 lg:col-span-3',
  };

  return (
    <div
      className={cn(
        // base styles
        "relative bg-bento-surface rounded-bento-lg border border-line p-6",
        "backdrop-blur-sm",
        // hover effects
        hover && [
          "transition-all duration-300 ease-out",
          "hover:border-line-hover",
          "hover:-translate-y-1",
          "hover:shadow-bento-lg",
        ],
        // glow effect on hover
        glow && "hover:shadow-glow",
        // accent left border
        accent && "border-l-2 border-l-clay",
        // clickable
        onClick && "cursor-pointer",
        // grid span
        spanClasses[span],
        className
      )}
      onClick={onClick}
    >
      {/* subtle gradient overlay on hover */}
      {hover && (
        <div className="absolute inset-0 rounded-bento-lg bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      {/* content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default BentoCard;
