import Image from 'next/image'

/** Official Jotai mascot — https://github.com/pmndrs/jotai/blob/main/img/jotai-mascot.png */
export function JotaiIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/icons/skills/jotai-mascot.png"
      alt=""
      width={24}
      height={24}
      className={className}
      aria-hidden
    />
  )
}
