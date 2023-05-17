// PatientsSearch.tsx
import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  ChangeEvent,
} from "react";
import SearchMdIcon from "@untitled-ui/icons-react/build/esm/SearchMd";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import SvgIcon from "@mui/material/SvgIcon";
import { Patients } from "@src/types/patients";
import { List, ListItem } from "@mui/material";

import styled from "@emotion/styled";
import customColors from "@src/theme/colors";

const CustomList = styled(List)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  padding: "16px",
  marginTop: "16px",
  borderRadius: "10px",
  boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
});
const CustomListItem = styled(ListItem)({
  cursor: "pointer",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: customColors.neutral[100],
  },
});

interface PatientsSearchProps {
  onFiltersChange: (query: string) => void;
  onSelectPatient: (name: string, id: number, mbo: string) => void;
  patients: Patients[];
}

const PatientsSearch: React.FC<PatientsSearchProps> = ({
  onFiltersChange,
  onSelectPatient,
  patients,
}) => {
  const [query, setQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState<Patients[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [hideList, setHideList] = useState(false);
  const [patientId, setPatientId] = useState<number | any>(null);

  useEffect(() => {
    onFiltersChange(query);
  }, [query, onFiltersChange]);

  useEffect(() => {
    setIsSearchVisible(query.length >= 3);

    const filtered = patients.filter(
      (patient: any) =>
        patient.first_name.toLowerCase().includes(query.toLowerCase()) ||
        patient.last_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPatients(filtered);
  }, [query, patients]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    setHideList(false);
  };

  const handlePatientClick = (name: string, id: any, mbo: any) => {
    setQuery(name);
    setPatientId(id);
    setHideList(true);
    onSelectPatient(name, id, mbo);
  };

  return (
    <>
      <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={3}>
        <Box component="form" sx={{ flexGrow: 1 }}>
          <OutlinedInput
            fullWidth
            placeholder="Search patients"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
            onChange={handleInputChange}
            value={query}
          />
        </Box>
      </Stack>

      {isSearchVisible && !hideList ? (
        <CustomList>
          {filteredPatients.map((patient) => (
            <CustomListItem
              key={patient.id}
              onClick={() =>
                handlePatientClick(
                  `${patient.first_name} ${patient.last_name}`,
                  patient.id,
                  patient.mbo
                )
              }
            >
              {`${patient.first_name} ${patient.last_name}`}
            </CustomListItem>
          ))}
        </CustomList>
      ) : (
        <></>
      )}
    </>
  );
};

export default PatientsSearch;
