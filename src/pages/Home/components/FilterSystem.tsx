import { useNavigate, useSearchParams } from "react-router";
import { Category } from "../../../types/Category";
import createURL from "../../../utils/createURL";

const FilterSystem = ({ categories }: { categories: Category[] }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  
  return (
    <select
      defaultValue={category ? category : ""}
      onChange={(e) => navigate(createURL("category", e.target.value, searchParams))}
    >
      <option value="">
        All
      </option>
      {categories ? categories.map((category, index) => (
        <option 
          value={category.name}
          key={index}>
          {category.name}
        </option>
      )): null}
    </select>
  )
}

export default FilterSystem;