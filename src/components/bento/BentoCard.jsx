import { cn } from "../../lib/utils";

const BentoCard = ({ children, className, onClick = null }) => (
  <div className={cn("border border-border p-6", onClick && "cursor-pointer", className)} onClick={onClick}>
    {children}
  </div>
);

export default BentoCard;
