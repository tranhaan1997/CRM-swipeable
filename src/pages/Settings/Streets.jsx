import {
  Box,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  Fab,
} from "@mui/material";
import LayoutWrapper from "../../components/Layout/LayoutWrapper";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { Street_Getlist } from "~/redux/Catalogs/streetSlice";
import StreetIUpdateModal from "./Actions/StreetIUpdateModal";
import { DataGrid } from "@mui/x-data-grid";
import { useSwipeable } from "react-swipeable";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "~/AppContext";
import { useIsPWA } from "~/hooks/useIsPWA";
import StreetDeleteModal from "./Actions/StreetDeleteModal";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-cell[data-field='index'], & .MuiDataGrid-columnHeader[data-field='index']":
    {
      position: "sticky",
      left: 0,
      backgroundColor: theme.palette.background.fixColumnBg,
      zIndex: 2,
    },
  "& .MuiDataGrid-cell[data-field='STRT_NAME'], & .MuiDataGrid-columnHeader[data-field='STRT_NAME']":
    {
      position: "sticky",
      left: 50, // width cột ID
      backgroundColor: theme.palette.background.fixColumnBg,
      zIndex: 2,
    },
  // Hover chỉ cho cột sticky và luôn nổi trên các cell khác
  "& .MuiDataGrid-row:hover .MuiDataGrid-cell[data-field='ROW_INDEX'], \
   & .MuiDataGrid-row:hover .MuiDataGrid-cell[data-field='STRT_NAME']": {
    backgroundColor: theme.palette.background.fixColumnHover,
  },
}));

function Streets() {
  const { header } = useAppContext();
  const { isPWA } = useIsPWA();
  const dispatch = useDispatch();
  const items = useSelector((state) => state.street?.items);

  const columns = [
    {
      field: "index",
      headerName: "#",
      width: 50,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const index = params.api.getRowIndexRelativeToVisibleRows(params.id);
        const page = params.api.state.pagination.paginationModel.page; // page hiện tại (0-based)
        const pageSize = params.api.state.pagination.paginationModel.pageSize;
        return index != null ? index + 1 + page * pageSize : "";
      },
    },
    {
      field: "STRT_NAME",
      headerName: "Name",
      minWidth: 300,
      flex: 1,
    },
    {
      field: "STRT_UNSIGNNAME",
      flex: 1,
      headerName: "Tên viết tắt",
      minWidth: 300,
    },
    { field: "LAGNT_NAME", headerName: "Đơn vị", width: 150 },
    {
      field: "STAT_NAME",
      headerName: "Trạng thái",
      width: 150,
      renderCell: (params) => {
        const value = params.row.STAT_ID;
        const name = params.row.STAT_NAME;
        let color = "default";
        if (value === "ENABLE") color = "success";
        else if (value === "DISABLE") color = "warning";

        return (
          <Chip label={name} color={color} size="small" variant="outlined" />
        );
      },
    },
    {
      field: "actions",
      headerName: "Chức năng",
      width: 200,
      sortable: false, // Tắt sort
      disableColumnMenu: true, // Ẩn nút menu cột
      resizable: false, // Không cho kéo resize
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => {
              setSelectedItem(params.row);
              handleIUpdate(false);
            }}
          >
            Sửa
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => {
              setSelectedItem(params.row);
              setOpenDel(true);
            }}
          >
            Xóa
          </Button>
        </>
      ),
    },
  ];

  // State cho dialog xác nhận
  const [openDel, setOpenDel] = useState(false);
  // state cho form thêm - cập nhật
  const [openAdd, setOpenAdd] = useState(false);
  // state thêm - cập nhật
  const [addNew, setAddNew] = useState(true);
  // Item đang đc chọn
  const [selectedItem, setSelectedItem] = useState({});
  // gọi mở form gán loại cần thêm hoặc cập nhật
  const handleIUpdate = (add) => {
    setOpenAdd(true);
    setAddNew(add);
  };

  // Mobile Card Component
  const MobileStreetCard = ({ item, index }) => {
    const [cardTransform, setCardTransform] = useState("translateX(0px)");
    const [isSwipeRevealed, setIsSwipeRevealed] = useState(false);
    const [swipeDirection, setSwipeDirection] = useState(null); // 'left' or 'right'
    const [swipeTimer, setSwipeTimer] = useState(null);
    const [isSwipeActive, setIsSwipeActive] = useState(false);
    const [swipeStartTime, setSwipeStartTime] = useState(null);

    const handlers = useSwipeable({
      onSwipeStart: () => {
        setSwipeStartTime(Date.now());
        // Start timer - chỉ kích hoạt swipe sau 300ms để tránh xung đột với scroll
        const timer = setTimeout(() => {
          setIsSwipeActive(true);
        }, 50);
        setSwipeTimer(timer);
      },
      onSwiping: (eventData) => {
        const { deltaX, deltaY } = eventData;

        // Kiểm tra nếu đây là vertical scroll thì không xử lý swipe
        if (Math.abs(deltaY) > Math.abs(deltaX) * 1.5) {
          // Đây là vertical scroll, hủy swipe
          if (swipeTimer) {
            clearTimeout(swipeTimer);
            setSwipeTimer(null);
          }
          setIsSwipeActive(false);
          resetCard();
          return;
        }

        // Chỉ xử lý swipe nếu đã được activate
        if (!isSwipeActive) return;

        const maxDistance = 120;
        const clampedDelta = Math.max(
          -maxDistance,
          Math.min(maxDistance, deltaX)
        );

        setCardTransform(`translateX(${clampedDelta}px)`);

        // Show visual feedback when reaching threshold
        if (Math.abs(clampedDelta) > 60) {
          setIsSwipeRevealed(true);
          setSwipeDirection(clampedDelta > 0 ? "right" : "left");
        } else {
          setIsSwipeRevealed(false);
          setSwipeDirection(null);
        }
      },
      onSwiped: (eventData) => {
        const { deltaX, deltaY } = eventData;
        const swipeDuration = Date.now() - (swipeStartTime || 0);
        const actionThreshold = 150;
        const minSwipeDuration = 200; // Tối thiểu 200ms để tránh thao tác tình cờ

        // Clear timer
        if (swipeTimer) {
          clearTimeout(swipeTimer);
          setSwipeTimer(null);
        }

        // Kiểm tra các điều kiện để trigger action:
        // 1. Swipe phải đủ xa (>= actionThreshold)
        // 2. Swipe phải đủ lâu (>= minSwipeDuration)
        // 3. Swipe phải chủ yếu theo chiều ngang (deltaX > deltaY)
        // 4. Swipe phải được activate (không phải scroll)
        if (
          isSwipeActive &&
          Math.abs(deltaX) >= actionThreshold &&
          swipeDuration >= minSwipeDuration &&
          Math.abs(deltaX) > Math.abs(deltaY)
        ) {
          if (deltaX > 0) {
            // Swiped right - Delete action
            setSelectedItem(item);
            setOpenDel(true);
          } else {
            // Swiped left - Edit action
            setSelectedItem(item);
            handleIUpdate(false);
          }
        }

        // Reset states
        setIsSwipeActive(false);
        setSwipeStartTime(null);
        resetCard();
      },
      trackMouse: false,
      trackTouch: true,
      preventScrollOnSwipe: false, // Cho phép scroll khi cần
      delta: 15, // Tăng delta để giảm độ nhạy
    });

    // Reset card position
    const resetCard = () => {
      setCardTransform("translateX(0px)");
      setIsSwipeRevealed(false);
      setSwipeDirection(null);
    };

    return (
      <Box
        sx={{
          position: "relative",
          mb: 1,
          overflow: "hidden", // Ngăn card tràn ra ngoài container
          width: "100%", // Đảm bảo width không vượt quá container
        }}
      >
        {/* Background Action Indicators */}
        {isSwipeRevealed && (
          <>
            {/* Left side - Delete indicator (shown when swiping right) */}
            {swipeDirection === "right" && (
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#f44336",
                  borderRadius: 2,
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <DeleteIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" color="inherit" fontWeight="bold">
                    Xóa
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Right side - Edit indicator (shown when swiping left) */}
            {swipeDirection === "left" && (
              <Box
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#2196f3",
                  borderRadius: 2,
                  zIndex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  <EditIcon sx={{ mr: 1 }} />
                  <Typography variant="body2" color="inherit" fontWeight="bold">
                    Sửa
                  </Typography>
                </Box>
              </Box>
            )}
          </>
        )}

        {/* Main Card */}
        <div {...handlers}>
          <Card
            sx={{
              borderRadius: 2,
              transform: cardTransform,
              transition:
                cardTransform === "translateX(0px)"
                  ? "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                  : "none",
              willChange: "transform",
              backfaceVisibility: "hidden",
              position: "relative",
              zIndex: 2,
            }}
          >
            <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mr: 1 }}
                  >
                    #{index}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 600, fontSize: "1rem" }}
                    noWrap
                  >
                    {item.STRT_NAME}
                  </Typography>
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                  noWrap
                >
                  Tên viết tắt: {item.STRT_UNSIGNNAME}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Đơn vị: {item.LAGNT_NAME}
                  </Typography>
                  <Chip
                    label={item.STAT_NAME}
                    color={
                      item.STAT_ID === "ENABLE"
                        ? "success"
                        : item.STAT_ID === "DISABLE"
                        ? "warning"
                        : "default"
                    }
                    size="small"
                    variant="outlined"
                  />
                </Box>

                {/* Optional: Add a subtle hint about swipe functionality */}
                {!isSwipeRevealed && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: 8,
                      top: "50%",
                      transform: "translateY(-50%)",
                      opacity: 0.3,
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      ←→
                    </Typography>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </div>
      </Box>
    );
  };

  // Load ds đường ban đầu
  useEffect(() => {
    dispatch(Street_Getlist());
  }, [dispatch]);

  return (
    <LayoutWrapper>
      <Box
        sx={{
          p: isPWA ? 0.5 : 1,
          overflowX: "hidden", // Ngăn trang bị scroll ngang
          width: "100%",
          maxWidth: "100vw", // Không cho vượt quá viewport width
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: isPWA ? 2 : 1,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{ fontSize: isPWA ? "1.5rem" : "1.25rem", fontWeight: "bold" }}
          >
            Danh mục đường
          </Typography>

          {!isPWA && (
            <Button
              variant="contained"
              onClick={() => handleIUpdate(true)}
              startIcon={<AddIcon />}
              size="small"
            >
              Thêm
            </Button>
          )}
        </Box>

        {/* Mobile View */}
        {isPWA ? (
          <Box
            sx={{
              pb: 2,
              overflowX: "hidden", // Ẩn horizontal scrollbar
              overflowY: "visible", // Cho phép vertical scroll
            }}
          >
            {(items || []).map((item, index) => (
              <MobileStreetCard
                key={item.STRT_ID}
                item={item}
                index={index + 1}
              />
            ))}

            {/* Floating Action Button for Mobile */}
            <Fab
              color="primary"
              onClick={() => handleIUpdate(true)}
              sx={{
                position: "fixed",
                bottom: 80, // Above bottom navigation (60px) + margin
                right: 16,
                zIndex: 1000,
              }}
            >
              <AddIcon />
            </Fab>
          </Box>
        ) : (
          /* Desktop View */
          <Box
            sx={{
              height: header
                ? `calc(100vh - 130px + 55px) `
                : `calc(100vh - 130px) `,
              border: "1px solid #c4c4c4",
            }}
          >
            <DataGrid
              rows={items || []}
              columns={columns}
              getRowId={(row) => row.STRT_ID}
              pageSize={10}
              rowsPerPageOptions={[5, 10, 20]}
              rowHeight={36}
              disableVirtualization
              sx={{
                "& .MuiDataGrid-columnHeaders": {
                  minHeight: "40px !important",
                  maxHeight: "40px !important",
                },
                "& .MuiDataGrid-columnHeader": {
                  lineHeight: "40px",
                  paddingTop: 0,
                  paddingBottom: 0,
                  bgcolor: (theme) => theme.palette.background.headerGrid,
                },
                "& .MuiDataGrid-cell:focus": {
                  outline: "none",
                },
                "& .MuiDataGrid-cell:focus-within": {
                  outline: "none",
                },
                "& .MuiDataGrid-row.Mui-selected": {
                  backgroundColor: "inherit !important",
                },
                "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within":
                  {
                    outline: "none",
                  },
                "& .MuiDataGrid-columnHeaderTitle": {
                  fontWeight: "bold",
                  fontSize: "1rem",
                },
                "& .MuiDataGrid-scrollbarFiller--header": {
                  background: (theme) => theme.palette.background.headerGrid,
                },
                "& .MuiToolbar-root": {
                  bgcolor: (theme) => theme.palette.background.headerGrid,
                },
                "& .MuiDataGrid-filler": {
                  background: (theme) => theme.palette.background.headerGrid,
                },
                "& .MuiDataGrid-columnSeparator": {
                  opacity: 0,
                  transition: "opacity 0.2s",
                },
                "& .MuiDataGrid-columnHeader:hover .MuiDataGrid-columnSeparator":
                  {
                    opacity: 1,
                  },
              }}
            />
          </Box>
        )}
      </Box>

      {/* Dialog Thêm và cập nhật */}
      <StreetIUpdateModal
        addNew={addNew}
        selectedItem={selectedItem}
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />

      {/* Dialog xác nhận xóa */}
      <StreetDeleteModal
        open={openDel}
        selectedItem={selectedItem}
        onClose={() => setOpenDel(false)}
      />
    </LayoutWrapper>
  );
}

export default Streets;
