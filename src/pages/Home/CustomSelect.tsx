import { Select, SelectChangeEvent } from "@mui/material";

type CustomSelectProps = {
  children: React.ReactNode,
  value: string,
  onChange: (e: SelectChangeEvent<string>) => void
}

const CustomSelect = ({ children, value, onChange }: CustomSelectProps) => {
  return (
    <Select
      value={value}
      sx={{
        height: "36px",
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#d4d0d9",
        },
        "&:hover:not(.Mui-focused)": {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        },
        "& .MuiSelect-outlined": {
          color: "#d4d0d9",
        },
        "& .MuiSvgIcon-root": {
          color: "#d4d0d9",
        },
      }}
      onChange={onChange}
    >
      {children}
    </Select>
  )
}

export default CustomSelect;