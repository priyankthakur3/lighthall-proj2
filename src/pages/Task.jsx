import React, { useState } from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import Board from "../components/Board";
import { getData } from "../utils/mockData";

export default function Task() {

    const sampleData = getData();

  return (
      <Box>
        <Typography>This is task page</Typography>
        <Board initial={sampleData} withScrollableColumns />
      </Box>
  );
}
