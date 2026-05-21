import Image from 'next/image'

/** Official Bloc logo — https://bloclibrary.dev */
export function BlocIcon({ className }: { className?: string }) {
  const sizeClass = className ?? 'size-6'

  return (
    <Image
      src="/icons/skills/bloc.svg"
      alt=""
      width={24}
      height={24}
      className={`${sizeClass} object-contain`}
      aria-hidden
    />
  )
}
