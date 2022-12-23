import {
  TableRow as MuiTableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  Button,
  styled,
  Paper,
  TableContainer,
} from "@mui/material";

import { useState } from "react";
import { Customer } from "../interfaces";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AssetsModal from "./AssetsModal";

const TableRow = styled(MuiTableRow)(({ theme }) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomerItem = (props: Customer) => {
  const {
    name,
    riskProfile,
    aggregatedNetWorth,
    aggregatedCapitalGain,
    aggregatedRestrictionStatus,
    portfolios,
  } = props;
  const [expand, setExpand] = useState(false);
  const [modalOpen, setModalOpen] = useState("");

  return (
    <>
      <TableRow hover>
        <TableCell component="th" scope="row" padding="normal" align="center">
          {name}
        </TableCell>
        <TableCell align="center">{riskProfile}</TableCell>
        <TableCell align="center">
          {aggregatedNetWorth.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          EUR
        </TableCell>
        <TableCell align="center">{aggregatedRestrictionStatus}</TableCell>
        <TableCell align="center">
          {aggregatedCapitalGain.toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}{" "}
          EUR
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setExpand(!expand)}
          >
            {expand ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expand} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  m: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Portfolios
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography sx={{ fontWeight: "500" }}>Id</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: "500" }}>Name</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: "500" }}>
                          Restriction Status
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: "500" }}>
                          Assets
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {portfolios.map((el) => (
                      <MuiTableRow
                        key={el.portfolioId}
                        selected={el.portfolioId === modalOpen}
                      >
                        <TableCell>{el.portfolioId}</TableCell>
                        <TableCell>{el.portfolioName}</TableCell>
                        <TableCell>{el.restrictionStatus}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => setModalOpen(el.portfolioId)}
                            variant="text"
                            sx={{ paddingLeft: 0 }}
                          >
                            Details
                          </Button>
                          <AssetsModal
                            modalOpen={!!modalOpen}
                            setModalOpen={setModalOpen}
                            data={el.assets}
                          />
                        </TableCell>
                      </MuiTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CustomerItem;
