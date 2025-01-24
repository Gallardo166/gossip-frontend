import { useNavigate, useSearchParams } from "react-router";
import { MenuItem } from "@mui/material";
import CustomSelect from "./CustomSelect";
import createURL from "../../utils/createURL";

const SortingSystem = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sort = searchParams.get("sort");
  
  return (
    <CustomSelect
      value={sort ? sort : "favourite"}
      onChange={(e) => navigate(createURL("sort", e.target.value, searchParams))}
    >
      <MenuItem value="favourite">
        By favourite
      </MenuItem>
      <MenuItem value="time">
        By time
      </MenuItem>
    </CustomSelect>
  )
}

export default SortingSystem;