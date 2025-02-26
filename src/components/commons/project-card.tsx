export type ProjectCardProps = {
  name: string
  description: string
  img: string
}

export function ProjectCard({ name, img, description }: ProjectCardProps) {
  return (
    <div className="flex h-[132px] w-[430px] gap-5 rounded-[20px] border border-transparent bg-background-secondary p-3 hover:border-border-secondary">
      <div className="size-24 flex-shrink-0 overflow-hidden rounded-md">
        <img src={img} alt="Projeto" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase text-accent-green">
          10 cliques
        </span>
        <div className="flex flex-col">
          <span className="font-bold text-white">{name}</span>
          <span className="text-sm text-content-body">{description}</span>
        </div>
      </div>
    </div>
  )
}
