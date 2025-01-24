import { useNavigate, useSearchParams } from "react-router";
import { Category } from "../../types/Category";
import { MenuItem } from "@mui/material";
import CustomSelect from "./CustomSelect";
import createURL from "../../utils/createURL";

const FilterSystem = ({ categories }: { categories: Category[] }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const category = searchParams.get("category");
  
  return (
    <CustomSelect
      value={category ? category : "All"}
      onChange={(e) => {
        const param = e.target.value === "All" ? "" : e.target.value
        navigate(createURL("category", param, searchParams));
      }}
    >
      <MenuItem value="All">
        All
      </MenuItem>
      {categories ? categories.map((category, index) => (
        <MenuItem 
          value={category.name}
          key={index}>
          {category.name}
        </MenuItem>
      )): null}
    </CustomSelect>
  )
}

export default FilterSystem;