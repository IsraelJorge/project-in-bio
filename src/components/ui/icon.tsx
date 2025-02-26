import { DynamicIcon, IconName as IconsName } from 'lucide-react/dynamic'

export type IconName = IconsName

export type IconProps = {
  name: IconName
} & React.ComponentProps<typeof DynamicIcon>

export const Icon = ({ name, ...props }: IconProps) => {
  return <DynamicIcon name={name} data-testid="icon" {...props} />
}
