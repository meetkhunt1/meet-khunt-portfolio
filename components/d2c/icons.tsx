/**
 * Icons used on /d2c. The five list glyphs are the same Font Awesome solid
 * paths the reference build inlines, so shape and optical weight match; the
 * chevron and play glyph are drawn to the same visual weight.
 *
 * Fill comes from CSS (`fill: …` on the parent rule), not from the markup.
 */

type P = { className?: string };

export function CheckCircleIcon({ className }: P) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
    </svg>
  );
}

export function BanIcon({ className }: P) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z" />
    </svg>
  );
}

export function CheckIcon({ className }: P) {
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
    </svg>
  );
}

export function CheckSquareIcon({ className }: P) {
  return (
    <svg viewBox="0 0 448 512" className={className} aria-hidden="true">
      <path d="M400 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zm-204.686-98.059l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.248-16.379-6.249-22.628 0L184 302.745l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.25 16.379 6.25 22.628.001z" />
    </svg>
  );
}

export function CaretRightIcon({ className }: P) {
  return (
    <svg viewBox="0 0 192 512" className={className} aria-hidden="true">
      <path d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z" />
    </svg>
  );
}

/** The reference uses an ElementsKit "cross" glyph in the problem list. */
export function CrossIcon({ className }: P) {
  return (
    <svg viewBox="0 0 352 512" className={className} aria-hidden="true">
      <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      width="12"
      height="12"
      aria-hidden="true"
    >
      <path d="M4 8l8 8 8-8" />
    </svg>
  );
}

export function PlayIcon({ className }: P) {
  return (
    <svg
      viewBox="0 0 20 20"
      width="22"
      height="22"
      className={className}
      aria-hidden="true"
    >
      <path d="M6.5 4l10 6-10 6V4z" fill="currentColor" />
    </svg>
  );
}
