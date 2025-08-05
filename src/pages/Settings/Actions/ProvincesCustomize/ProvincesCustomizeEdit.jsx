import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";


function ProvincesCustomizeEdit({ open, onClose, provinceId }) {

    const provinces = useSelector((state) => state.province?.items || []);
    const provinceItem = provinces.find((item) => item.PROV_ID === provinceId);
    if (!provinceItem) return null;


    return (

        <>
            <Dialog
                open={open}
                onClose={onClose}
                // PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                style={{ margin: '10px 10px 10px 10px' }}
            >
                <DialogTitle sx={{ cursor: 'move' }} id="draggable-dialog-title">
                    Thêm Tỉnh Mới
                </DialogTitle>
                <DialogContent style={{ paddingTop: '10px' }}>
                    <Stack spacing={2}>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            label="Tên tỉnh"
                            name="name"
                            fullWidth
                            variant="outlined"
                            sx={{ width: '400px' }}
                        />
                        <TextField
                            required
                            margin="dense"
                            label="Tên viết tắt"
                            name="abbreviatedName"
                            fullWidth
                            variant="outlined"
                            sx={{ width: '400px' }}
                        />
                        <TextField
                            select
                            margin="dense"
                            label="Trạng thái"
                            name="status"
                            variant="outlined"
                            sx={{ width: '150px' }}
                        >
                            <MenuItem value="active">Đang sử dụng</MenuItem>
                            <MenuItem value="inactive">Ngưng sử dụng</MenuItem>
                        </TextField>
                    </Stack>

                </DialogContent>
                <DialogActions>
                    <div>Tên tỉnh: {provinceItem.PROV_NAME}</div>
                    <div>Tên không dấu: {provinceItem.PROV_UNSIGNNAME}</div>
                    <div>Trạng thái: {provinceItem.STAT_ID}</div>
                    <Button onClick={onClose}>Hủy</Button>
                    <Button color="error" onClick={() => {
                        // Gọi API xóa tại đây (nếu có)
                        onClose();
                    }}>
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    );
}

export default ProvincesCustomizeEdit;