import projectCategories from '@/helpers/projectCategories'
import classNames from 'classnames'
import Search from './navbar/search'

const CategoryRow = ({ onClick, selectedCategory }) => (
  <>
    <div className='mx-auto flex max-w-5xl grid-cols-2 flex-row pt-4 sm:pt-16'>
      <div className='flex'>
        <Search />
      </div>

      <div className='mx-auto mb-8 flex w-full max-w-5xl flex-wrap justify-center space-x-3 px-4 text-center'>
        {projectCategories.map(({ label, value }, index) => (
          <a
            key={index}
            className={classNames(
              'rounded-full border border-gray-300 bg-white px-4 py-1 text-sm font-semibold text-neutral-800 shadow',
              { ['text-blue-700']: selectedCategory === value },
            )}
            href='#'
            onClick={() => onClick(value)}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  </>
)

export default CategoryRow
