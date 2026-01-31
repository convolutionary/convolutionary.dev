// bento grid - responsive container for the card layout
// uses dense packing so tall/wide cards flow properly

import { cn } from "../../lib/utils";

const BentoGrid = ({ children, className = '', cols = 3 }) => {
  const colClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn(
      "grid grid-cols-1",
      colClasses[cols] || colClasses[3],
      "gap-4 md:gap-5",
      "md:grid-flow-dense",
      className
    )}>
      {children}
    </div>
  );
};

export default BentoGrid;
