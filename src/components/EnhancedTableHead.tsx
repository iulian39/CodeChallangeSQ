import { AssetKeys, CustomerKeys, SortDirection } from "../interfaces";
import {
  TableHead,
  TableCell,
  TableSortLabel,
  Box,
  Typography,
  styled,
  TableRow as MuiTableRow,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

const TableRow = styled(MuiTableRow)((_) => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const EnhancedTableHead = ({
  order,
  orderBy,
  onRequestSort,
  headers,
}: {
  order: SortDirection;
  orderBy: string;
  onRequestSort: (event: any, property: AssetKeys | CustomerKeys) => any;
  headers: { key: AssetKeys | CustomerKeys; label: string }[];
}) => {
  const createSortHandler =
    (property: AssetKeys | CustomerKeys) => (event: any) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headers.map((el) => (
          <TableCell
            key={el.key}
            align={"center"}
            padding={"normal"}
            sortDirection={orderBy === el.key ? order : false}
          >
            <TableSortLabel
              active={orderBy === el.key}
              direction={orderBy === el.key ? order : SortDirection.ASC}
              onClick={createSortHandler(el.key)}
            >
              <Typography sx={{ fontWeight: "600" }}>{el.label}</Typography>
              {orderBy === el.key ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === SortDirection.DESC
                    ? "sorted descending"
                    : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
