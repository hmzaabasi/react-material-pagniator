import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import CustomTable from "./Components/Table";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    width: "80%",
    margin: "3rem auto",
  },
  heading: {
    margin: "3rem",
    color: "#24292e",
  },
});

const App = () => {
  const [tableData, setTableData] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [page, setPage] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const [tableHeaders] = useState([
    { value: "Name", align: "left" },
    { value: "Language", align: "right" },
    { value: "Default Branch", align: "right" },
    { value: "Open Issues", align: "right" },
  ]);

  useEffect(() => {
    async function getRepos() {
      let response = await Axios.get(
        "https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc&per_page=100"
      );
      setIsLoading(false);
      const { status, data } = response;
      if (status === 200 && data?.items?.length) {
        setApiResponse(
          data.items.map((item) => ({
            name: { value: item.full_name, align: "left" },
            language: { value: item.language, align: "right" },
            defaultBranch: { value: item.default_branch, align: "right" },
            openIssues: { value: item.open_issues, align: "right" },
          }))
        );
      }
    }
    setIsLoading(true);
    getRepos();
  }, []);

  useEffect(() => {
    setTableData(
      apiResponse.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    );
  }, [page, rowsPerPage, apiResponse]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        className={classes.heading}
      >
        Github Popular Repositories
      </Typography>
      <TableContainer className={classes.table} component={Paper}>
        <CustomTable
          th={tableHeaders}
          tr={tableData}
          currentPage={page}
          isLoading={isLoading}
          totalRows={apiResponse.length}
          rowsPerPage={rowsPerPage}
          handlePageChange={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
};
export default App;
