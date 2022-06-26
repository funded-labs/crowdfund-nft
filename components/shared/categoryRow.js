import projectCategories from "@/helpers/projectCategories"
import classNames from "classnames"

const CategoryRow = ({ onClick, selectedCategory }) => (
  <div className="flex flex-wrap space-x-5 justify-center w-full max-w-5xl mx-auto px-4 mt-4 mb-8 text-center">
    {projectCategories.map(({ label, value }, index) => (
      <a
        key={index}
        className={classNames('font-bold text-lg text-gray-700', { ['text-blue-700']: selectedCategory === value })}
        href="#" 
        onClick={() => onClick(value)}
      >
        {label}
      </a>
    ))}
  </div>
)

export default CategoryRow
