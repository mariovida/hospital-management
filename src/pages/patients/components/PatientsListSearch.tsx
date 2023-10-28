import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";

import { useUpdateEffect } from "@src/hooks/use-update-effect";
import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

interface PatientsListSearchProps {
  onFiltersChange?: (filters: Record<string, any>) => void;
  onSortChange?: (sort: { sortBy: string; sortDir: string }) => void;
}

const SearchButton = styled(Button)({
  height: "fill",
  padding: "15px 20px",
  fontSize: "14px",
  fontWeight: "500",
  lineHeight: "24px",
  textAlign: "center",
  borderRadius: "10px",
  color: customColors.info.contrastText,
  backgroundColor: customColors.green.main,

  "&:hover": {
    backgroundColor: customColors.green.dark,
  },
});

export const PatientsListSearch: React.FC<PatientsListSearchProps> = (
  props
) => {
  const { onFiltersChange } = props;
  const role = localStorage.getItem("userRole");
  const queryRef = useRef<HTMLInputElement>(null);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const navigate = useNavigate();

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setFilters((prevState) => ({
        ...prevState,
        query,
      }));

      onFiltersChange?.({ query });
    },
    [onFiltersChange]
  );

  const addNewPatient = () => {
    navigate("/patients/add-new");
  };

  return (
    <>
      <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={3}>
        <Box component="form" onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            placeholder="Search patients by OIB"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
            onChange={handleQueryChange}
          />
        </Box>
        {role === "admin" ? (
          <SearchButton onClick={addNewPatient}>Add new</SearchButton>
        ) : (
          <></>
        )}
      </Stack>
    </>
  );
};

PatientsListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
};
