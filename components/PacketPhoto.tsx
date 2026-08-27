import Image from "next/image"

export function PacketPhoto({
  image,
  plate,
  title,
  className = "aspect-[4/5] w-full",
  sizes = "(min-width: 1024px) 360px, 50vw",
  priority = false,
}: {
  image?: string
  plate?: string
  title: string
  className?: string
  sizes?: string
  priority?: boolean
}) {
  return (
    <div className={`relative overflow-hidden bg-rule ${className}`}>
      {image ? (
        <Image
          src={image}
          alt={title}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className="absolute inset-0" style={{ background: plate || "#3a4a38" }} />
      )}
    </div>
  )
}
