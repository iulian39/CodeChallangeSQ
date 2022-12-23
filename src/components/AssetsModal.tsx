import {
  Modal,
  Box,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
} from "@mui/material";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { assetTableHeaders } from "../constants";
import { Asset, SortDirection, AssetKeys } from "../interfaces";
import { sortAssetData } from "../utils";
import TableHead from "./EnhancedTableHead";
import SearchBar from "./SearchBar";

const AssetsModal = ({
  data,
  modalOpen,
  setModalOpen,
}: {
  data: Asset[];
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<string>>;
}) => {
  const [input, setInput] = useState("");
  const [order, setOrder] = useState(SortDirection.ASC);
  const [orderBy, setOrderBy] = useState<AssetKeys>("assetName");

  const handleRequestSort = (_: any, property: AssetKeys) => {
    const isAsc = orderBy === property && order === SortDirection.ASC;
    setOrder(isAsc ? SortDirection.DESC : SortDirection.ASC);
    setOrderBy(property);
  };

  const sortedData = useCallback(
    () =>
      sortAssetData({
        input,
        data,
        orderBy,
        reverse: order === SortDirection.DESC,
      }),
    [input, data, orderBy, order]
  );

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen("")}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TableContainer>
          <Box
            sx={{
              display: "flex",
              width: "auto",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
              color: "text.primary",
              p: 3,
            }}
          >
            <SearchBar
              input={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </Box>

          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"medium"}
          >
            <TableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              headers={assetTableHeaders}
            />
            <TableBody>
              {sortedData().map((el) => (
                <TableRow hover key={el.isin}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="normal"
                    align="center"
                  >
                    {el.assetName}
                  </TableCell>
                  <TableCell align="center">{el.assetType}</TableCell>
                  <TableCell align="center">{el.location}</TableCell>
                  <TableCell align="center">{el.quantity}</TableCell>
                  <TableCell align="center">
                    {el.total_value.toLocaleString() + " " + el.currency}
                  </TableCell>
                  <TableCell align="center">
                    {el.total_capital_gain.toLocaleString() + " " + el.currency}
                  </TableCell>
                  <TableCell align="center">{el.associatedAssetRisk.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Modal>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "90%",
  minWidth: 1000,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

export default AssetsModal;
