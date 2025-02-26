import Image from 'next/image'

import { Button } from '../ui/button'
import { Icon, IconName } from '../ui/icon'

export function UserCard() {
  const icons: IconName[] = [
    'github',
    'instagram',
    'linkedin',
    'twitter',
    'plus'
  ]

  return (
    <div className="flex w-[328px] flex-col items-center gap-5 rounded-3xl border border-white border-opacity-10 bg-[#121212] p-5 text-white">
      <div className="size-32">
        <Image
          src="/me.jpg"
          alt="André Dev"
          width={96}
          height={104}
          className="h-full w-full rounded-full object-cover"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 overflow-hidden text-2xl font-bold">
            Israel Dev
          </h3>
        </div>
        <p className="opacity-40">
          &quot;Eu faço produtos para a Internet&quot;
        </p>

        <hr className="border-divider-primary mx-auto mt-3 w-[95%] border" />
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="text-xs font-medium uppercase">Links</span>

        <div className="flex gap-3">
          {icons.map((iconName, index) => (
            <button
              key={index}
              className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]"
            >
              <Icon name={iconName} />
            </button>
          ))}
        </div>

        <hr className="border-divider-primary mx-auto my-3 w-[95%] border" />

        <div className="flex h-[110px] w-full flex-col gap-3">
          <div className="flex w-full flex-col items-center gap-3">
            <Button className="w-full">Template SaaS - Compre Agora</Button>
            <button className="rounded-xl bg-[#1E1E1E] p-3 hover:bg-[#2E2E2E]">
              <Icon name="plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
