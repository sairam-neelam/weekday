import React, { useState } from "react";
import {
  OutlinedInput,
  MenuItem,
  Select,
  Stack,
  Chip,
  InputLabel,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import "./MultiSelect.css";

interface Props {
  selectedNames: any;
  setSelectedNames: any;
  options: any[];
}

export default function MultiSelect({
  selectedNames,
  setSelectedNames,
  options,
}: Props) {
  //   const [selectedNames, setSelectedNames] = useState<any>([]);
  return (
    <>
      <InputLabel>Multiple Select</InputLabel>
      <Select
        className="multi-select"
        multiple
        value={selectedNames}
        onChange={(e) => setSelectedNames(e.target.value)}
        // input={<OutlinedInput label="Multiple Select" />}
        placeholder="Select Values"
        renderValue={(selected) => (
          <Stack gap={1} direction="row" flexWrap="wrap">
            {selected.map((value: string) => (
              <Chip
                key={value}
                label={value}
                onDelete={() =>
                  setSelectedNames(
                    selectedNames.filter((item: any) => item !== value)
                  )
                }
                deleteIcon={
                  <CancelIcon
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                }
              />
            ))}
          </Stack>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
