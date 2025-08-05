import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { Province_Delete } from "~/redux/Catalogs/provinceSlice";
import { toast } from "react-toastify";

function ProvincesCustomizeDelete({ open, onClose, provinceId, provincename, onSuccess }) {
    // console.log("🚀 ~ ProvincesCustomizeDelete ~ provinceId:", provinceId)
    // console.log("🚀 ~ ProvincesCustomizeDelete ~ provincename:", provincename)
    const dispatch = useDispatch();

    const handleDelete = async () => {
        try {
            const response = await dispatch(Province_Delete({ I_PROV_ID: provinceId })).unwrap();

            if (response.O_RESULT === -1) {
                toast.error(`Xóa thất bại: ${response.O_MESSAGE}`);
                onClose();
                return;
            }

            toast.success("Xóa tỉnh thành công!");
            if (onSuccess) onSuccess(); // cập nhật lại danh sách nếu cần
            onClose();
        } catch (error) {
            console.error("Lỗi xóa:", error);
            toast.error("Xóa tỉnh thất bại!");
        }
    };


    return (
        <>
            <Dialog open={open} onClose={onClose}>
                <DialogTitle sx={{
                    textAlign: 'center'
                }}>Xác nhận xóa</DialogTitle>
                <DialogContent>Đây là tỉnh <b>{provincename}</b> có bản lĩnh thì xóa đi?</DialogContent>
                <DialogActions>
                    <Button color="error" variant="contained" onClick={handleDelete}>
                        Xóa
                    </Button>
                    <Button onClick={onClose}>Hủy</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default ProvincesCustomizeDelete;
