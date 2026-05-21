import Image from 'next/image'

/** Official Echo mark (hex grid) — cropped from https://echo.labstack.com/img/logo-light.svg */
export function EchoIcon({ className }: { className?: string }) {
  const sizeClass = className ?? 'size-8'

  return (
    <Image
      src="/icons/skills/echo-mark.svg"
      alt=""
      width={32}
      height={30}
      className={`${sizeClass} object-contain`}
      aria-hidden
    />
  )
}
