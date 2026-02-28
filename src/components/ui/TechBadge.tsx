import { getTechIcon } from '../../lib/techIcons';

interface TechBadgeProps {
  name: string;
  className?: string;
}

export default function TechBadge({ name, className = '' }: TechBadgeProps) {
  const icon = getTechIcon(name);

  return (
    <span className={`neu-badge text-xs ${className}`}>
      {icon && (
        <img
          src={icon}
          alt=""
          className="w-3.5 h-3.5 mr-1.5 inline-block"
          loading="lazy"
        />
      )}
      {name}
    </span>
  );
}
