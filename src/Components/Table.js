import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  withStyles,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import Pagination from "./Pagination";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#24292e",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const CustomTable = ({
  th,
  tr,
  totalRows,
  isLoading,
  rowsPerPage,
  currentPage,
  handlePageChange,
  handleChangeRowsPerPage,
}) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            {th.map((item, index) => (
              <StyledTableCell key={index} align={item.align}>
                {item.value}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {!isLoading ? (
            tr.length ? (
              tr.map((tds, trKey) => (
                <TableRow key={trKey}>
                  {Object.keys(tds).map((td, tdKey) => {
                    const data = tds[td];
                    return (
                      <TableCell key={tdKey} align={data.align}>
                        {data.value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Skeleton height={50} />
                <Skeleton height={50} animation={false} />
                <Skeleton height={50} animation="wave" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colSpan={3}
              rowsPerPageOptions={[20, 50, 100, { label: "All", value: -1 }]}
              count={totalRows}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={Pagination}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default CustomTable;
