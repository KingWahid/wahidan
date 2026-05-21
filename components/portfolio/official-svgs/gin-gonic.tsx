import Image from 'next/image'

/** Official Gin Gonic logo — https://github.com/gin-gonic/logo */
export function GinGonicIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/icons/skills/gin-gonic.svg"
      alt=""
      width={24}
      height={24}
      className={className}
      aria-hidden
    />
  )
}
