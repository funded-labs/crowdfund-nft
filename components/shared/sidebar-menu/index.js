import classNames from 'classnames'

export default function SidebarMenu({
  selected,
  onSelect = () => {},
  isLoading,
  menuItems = [],
}) {
  if (isLoading) {
    return <div className='h-64 w-full animate-pulse rounded-2xl bg-gray-200' />
  }

  return (
    <div className='w-full rounded-2xl bg-white p-4 pl-0 shadow'>
      <div className='flex w-full flex-col space-y-1'>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={classNames(
              'appearance-none border-l-4 border-transparent py-2 text-left',
              'cursor-pointer px-8 text-gray-400',
              selected === item.id
                ? 'border-blue-500 text-blue-500'
                : 'hover:border-gray-100',
            )}
            onClick={() => onSelect(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  )
}
