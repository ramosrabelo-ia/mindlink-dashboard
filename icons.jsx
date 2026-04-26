const iconPaths = {
  activity: <><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></>,
  arrowUpRight: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
  brain: <><path d="M8 6a3 3 0 0 1 6 0v12a3 3 0 0 1-6 0" /><path d="M14 6a3 3 0 0 1 6 0 3 3 0 0 1-1 2 4 4 0 0 1 0 8 3 3 0 0 1 1 2 3 3 0 0 1-6 0" /><path d="M8 10H5a3 3 0 0 0 0 6h3" /><path d="M14 10h3" /><path d="M14 14h4" /></>,
  chevronDown: <><path d="m6 9 6 6 6-6" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>,
  heartPulse: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1" /><path d="M3 13h4l2-4 4 9 2-5h6" /><path d="M18 16.5 12 22l-3-2.7" /></>,
  hospital: <><path d="M3 21h18" /><path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" /><path d="M9 21v-5h6v5" /><path d="M12 7v6" /><path d="M9 10h6" /></>,
  mapPin: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>,
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>,
  sparkles: <><path d="m12 3 1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3Z" /><path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" /><path d="M5 4l.8 1.8L8 6.5l-2.2.7L5 9l-.8-1.8L2 6.5l2.2-.7L5 4Z" /></>,
  trending: <><path d="m3 17 6-6 4 4 8-8" /><path d="M14 7h7v7" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.9" /><path d="M16 3.1a4 4 0 0 1 0 7.8" /></>,
  wallet: <><path d="M20 7H5a3 3 0 0 0 0 6h15v7H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h15Z" /><path d="M16 13v-2" /></>,
};

export default function Icon({ name, size = 20, color = "currentColor", className = "", strokeWidth = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconPaths[name] || iconPaths.activity}
    </svg>
  );
}
