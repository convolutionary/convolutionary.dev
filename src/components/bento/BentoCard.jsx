// bento card - the core building block for the grid layout
// cards can span different sizes for visual interest

const BentoCard = ({
  children,
  className = '',
  span = 'default',
  hover = true,
  accent = false,
  onClick = null,
}) => {
  // grid span variants for the bento layout
  const spanClasses = {
    default: '',
    wide: 'md:col-span-2',
    tall: 'md:row-span-2',
    feature: 'md:col-span-2 md:row-span-2',
    full: 'md:col-span-3',
  };

  const baseClasses = `
    bg-bento-surface
    rounded-bento-lg
    border border-line
    p-6
    ${hover ? 'hover:shadow-bento-md hover:border-line-hover hover:-translate-y-0.5 transition-all duration-200' : ''}
    ${accent ? 'border-l-4 border-l-clay' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${spanClasses[span]}
    ${className}
  `;

  return (
    <div className={baseClasses} onClick={onClick}>
      {children}
    </div>
  );
};

export default BentoCard;
