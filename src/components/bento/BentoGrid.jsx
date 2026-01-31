// bento grid - responsive container for the card layout
// 1 col on mobile, 2 on tablet, 3 on desktop

const BentoGrid = ({ children, className = '', cols = 3 }) => {
  const colClasses = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`
      grid
      ${colClasses[cols] || colClasses[3]}
      gap-4 md:gap-6
      ${className}
    `}>
      {children}
    </div>
  );
};

export default BentoGrid;
