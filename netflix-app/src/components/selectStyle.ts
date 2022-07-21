export const selectStyle = {
    control: () => ({
      backgroundColor: "rgba(50, 50, 50, 0.8)",
      width: "520px",
      display: "flex",
      border: "1px solid #f65261",
      height: "57px",
      fontSize: "25px",
    }),
    multiValueLabel: (provided: any) => ({
      ...provided,
      color: "white",
      backgroundColor: "#F65261",
      paddingRight: "10px"
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      color: "#F65261",
      backgroundColor: "white",
    }),
    menuList: (provided: any) => ({
      ...provided,
      backgroundColor: "#232323",
      color: "#F65261",
    }),
  };