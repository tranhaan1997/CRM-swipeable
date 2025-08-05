import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import MainLayout from "~/components/Layout/MainLayout";
import ProvincesCustomizeAdd from "./Actions/ProvincesCustomize/ProvincesCustomizeAdd";
import ProvincesCustomizeDelete from "./Actions/ProvincesCustomize/ProvincesCustomizeDelete";
import ProvincesCustomizeEdit from "./Actions/ProvincesCustomize/ProvincesCustomizeEdit";
import { Province_Getlist } from "~/redux/Catalogs/provinceSlice";
import ToastProvider from "./Actions/ProvincesCustomize/ToastProvider";


// Tách styles
const dataGridStyles = {
  "& .MuiBox-root": { marginBottom: 5 },
  "& .MuiDataGrid-root *:focus": { outline: "none !important" },
  "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": { outline: "none !important" },
  "& .MuiDataGrid-columnHeader:focus": { outline: "none !important" },
  "& .MuiDataGrid-row:focus-within": {
    outline: "none !important",
    backgroundColor: "inherit !important",
  },
  "& .MuiDataGrid-cell": {
    px: 1,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "flex",
    alignItems: "center",
    lineHeight: "50px",
  },
  "& .MuiDataGrid-columnHeader": {
    px: 1,
    display: "flex",
    alignItems: "center",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  "& .MuiDataGrid-cellCheckbox": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  "& .MuiDataGrid-footerContainer": { minHeight: 40 },
  "& .MuiTablePagination-toolbar": { minHeight: 39, px: 0 },
  "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": { m: 0 },
  "& .MuiSelect-select": { p: 0, minHeight: 0 },
  "& .MuiTablePaginationActions-root": { p: 0 },
};

function Provinces() {
  const [selectionModel, setSelectionModel] = useState([]);
  const [pageSize, setPageSize] = useState(50);
  const [currentPage, setCurrentPage] = useState(0);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedProvinceName, setSelectedProvinceName] = useState(null);

  const dispatch = useDispatch();
  const provincesItems = useSelector((state) => state.province?.items || []); //province lấy từ store

  // Load danh sách từ api tỉnh
  useEffect(() => {
    dispatch(Province_Getlist());
  }, [dispatch]);

  //lấy danh sách
  const rows = provincesItems.map((item) => ({
    id: item.ROW_INDEX,
    PROV_ID: item.PROV_ID,
    PROV_NAME: item.PROV_NAME,
    PROV_UNSIGNNAME: item.PROV_UNSIGNNAME,
    status: item.STAT_ID === "ENABLE" ? "Đang sử dụng" : "Ngưng sử dụng",
  }));

  // Tách columns ra provincesItems
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "PROV_NAME", headerName: "Tên Tỉnh", width: 200 },
    { field: "PROV_UNSIGNNAME", headerName: "Tên viết tắt", width: 200 },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 200,
      renderCell: ({ value }) => (
        <Chip
          label={value}
          color={value === "Đang sử dụng" ? "success" : "error"}
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: "action",
      headerName: "Chức năng",
      width: 200,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} onClick={(e) => e.stopPropagation()}>
          <Button
            variant="outlined"
            onClick={() => {
              setSelectedProvinceId(params.row.PROV_ID)
              setSelectedProvinceName(params.row.PROV_NAME)
              setOpenDelete(true)
            }}
          >Xóa</Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setSelectedProvinceId(params.row.PROV_ID)
              setOpenEdit(true)
            }}>
            Sửa
          </Button>
        </Stack >

      ),
    },
  ];

  // Chọn chỉ các dòng đang hiển thị
  const handleSelectionChange = (newSelection) => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    const visibleRowIds = rows.slice(start, end).map((r) => r.id);
    const filtered = newSelection.filter((id) => visibleRowIds.includes(id));
    setSelectionModel(filtered);
  };

  return (
    <MainLayout>
      <Box sx={{ p: 1, height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" gutterBottom sx={{ m: 0 }}>
            DANH MỤC TỈNH
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenAdd(true)}
          >
            Thêm
          </Button>
        </Box>

        <Box sx={{ flex: 1, minHeight: 0, width: "100%", overflow: "auto", scrollbarWidth: "thin" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            paginationModel={{ page: currentPage, pageSize }}
            onPaginationModelChange={({ page }) => setCurrentPage(page)}
            pageSizeOptions={[5, 10, 15, 50]}
            onPageSizeChange={(size) => setPageSize(size)}
            // checkboxSelection
            onSelectionModelChange={handleSelectionChange}
            selectionModel={selectionModel}
            keepNonExistentRowsSelected={false}
            checkboxSelectionVisibleOnly
            disableRowSelectionOnClick
            rowHeight={60}
            density="compact"
            sx={dataGridStyles}
            autoHeight
            onRowClick={(params) => {
              // setSelectedProvinceId(params.row.id); // id được set ở rows
              setSelectedProvinceName(params.row.Name); // name được set ở rows
              setOpenDelete(true);
            }}
          />
        </Box>
        {/* Thực hiện hiện model xử lý các hàm định nghĩa */}
        <ProvincesCustomizeAdd
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          onSuccess={() => dispatch(Province_Getlist())}

        />
        <ProvincesCustomizeDelete
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onSuccess={() => dispatch(Province_Getlist())}
          provinceId={selectedProvinceId}
          provincename={selectedProvinceName}
        />
        <ProvincesCustomizeEdit
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          onSuccess={() => dispatch(Province_Getlist())}
          provinceId={selectedProvinceId}
        />
      </Box>
      <ToastProvider />
    </MainLayout>
  );
}

export default Provinces;
