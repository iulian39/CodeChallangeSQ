import { useState, useCallback } from "react";
import { Customer, SortDirection, CustomerKeys } from "../interfaces";
import CustomerItem from "./CustomerItem";
import {
  Box,
  Paper,
  TableContainer,
  Table,
  TableBody,
  useTheme,
} from "@mui/material";
import TableHead from "./EnhancedTableHead";
import Header from "./Header";
import { customerTableHeaders } from "../constants";
import { sortCustomerData } from "../utils";

export const CustomerSelection = ({ data }: { data: Customer[] }) => {
  const [input, setInput] = useState("");
  const [order, setOrder] = useState(SortDirection.ASC);
  const [orderBy, setOrderBy] = useState<CustomerKeys>("name");
  const theme = useTheme();

  const handleRequestSort = (_: any, property: CustomerKeys) => {
    const isAsc = orderBy === property && order === SortDirection.ASC;
    setOrder(isAsc ? SortDirection.DESC : SortDirection.ASC);
    setOrderBy(property);
  };

  const sortedData = useCallback(
    () =>
      sortCustomerData({
        input,
        data,
        orderBy,
        reverse: order === SortDirection.DESC,
      }),
    [input, data, orderBy, order]
  );

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* <Header
        input={input}
        onChange={(event) => setInput(event.target.value)}
      /> */}
      <Paper sx={{ width: "100%", borderRadius: 0 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 700 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headers={customerTableHeaders}
            />
            <TableBody>
              {sortedData().map((el) => (
                <CustomerItem {...el} key={el.clientId} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default CustomerSelection;
