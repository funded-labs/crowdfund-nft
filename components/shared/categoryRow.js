import projectCategories from "@/helpers/projectCategories"
import classNames from "classnames"
import Search from "./navbar/search"

const CategoryRow = ({ onClick, selectedCategory }) => (
  <>
  <div className="flex-row flex grid-cols-2 max-w-5xl mx-auto pt-4 sm:pt-16">
  <div className="flex">
  <Search/>
  </div>
  
  <div className="flex flex-wrap space-x-3 justify-center w-full max-w-5xl mx-auto px-4 mb-8 text-center">
    {projectCategories.map(({ label, value }, index) => (
      <a
        key={index}
        className={classNames('font-semibold text-sm text-neutral-800 border rounded-full border-gray-300 px-4 py-1 bg-white shadow', { ['text-blue-700']: selectedCategory === value })}
        href="#" 
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
