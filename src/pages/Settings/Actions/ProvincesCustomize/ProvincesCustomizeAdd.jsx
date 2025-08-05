import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, MenuItem, Paper,
    Stack,
    TextField
} from '@mui/material';
import { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { useDispatch } from "react-redux";
import { Province_Insert } from "~/redux/Catalogs/provinceSlice";
import { toast } from 'react-toastify';

//sử lý phần kéo dialog
const PaperComponent = (props) => {
    const nodeRef = useRef(null);
    return (
        <Draggable
            nodeRef={nodeRef}
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

function ProvincesCustomizeAdd({ open, onClose, onSuccess }) {
    const [name, setName] = useState("");
    const [unsignName, setUnsignName] = useState("");
    const [status, setStatus] = useState("active");
    const [nameError, setNameError] = useState(false);
    const [unsignError, setUnsignError] = useState(false);

    const dispatch = useDispatch();

    // const handleSubmit = async () => {
    //     try {
    //         const isNameValid = !!name.trim();
    //         const isUnsignValid = !!unsignName.trim();

    //         setNameError(!isNameValid);
    //         setUnsignError(!isUnsignValid);

    //         if (!isNameValid || !isUnsignValid) return;
    //         const payload = {
    //             I_PROV_NAME: name,
    //             I_PROV_UNSIGNNAME: unsignName,
    //             I_STAT_ID: status === "active" ? "ENABLE" : "DISABLE",
    //         };
    //         const response = await dispatch(Province_Insert(payload)).unwrap();

    //         if (response.O_RESULT === -1) {
    //             toast.error(`Lỗi: ${response.O_MESSAGE}`);
    //             return;
    //         }

    //         // xử lý nếu gửi data thành công thì cập nhập lại data
    //         if (onSuccess) onSuccess()

    //         // Reset form nếu thành công
    //         toast.success("Thêm tỉnh thành công!", { toastId: "validate" });
    //         setName("");
    //         setUnsignName("");
    //         setStatus("active");
    //         setNameError(false);
    //         setUnsignError(false);
    //         onClose();

    //     } catch {
    //         toast.error("Thêm tỉnh thất bại!", { toastId: "validate" });
    //     }
    // };

    // const handleSubmitMore = async () => {
    //     try {
    //         const isNameValid = !!name.trim();
    //         const isUnsignValid = !!unsignName.trim();

    //         setNameError(!isNameValid);
    //         setUnsignError(!isUnsignValid);

    //         if (!isNameValid || !isUnsignValid) return;
    //         const payload = {
    //             I_PROV_NAME: name,
    //             I_PROV_UNSIGNNAME: unsignName,
    //             I_STAT_ID: status === "active" ? "ENABLE" : "DISABLE",
    //         };
    //         const response = await dispatch(Province_Insert(payload)).unwrap();

    //         if (response.O_RESULT === -1) {
    //             toast.error(`Lỗi: ${response.O_MESSAGE}`);
    //             return;
    //         }

    //         // xử lý nếu gửi data thành công thì cập nhập lại data
    //         if (onSuccess) onSuccess()

    //         // Reset form nếu thành công
    //         toast.success("Thêm tỉnh thành công!", { toastId: "validate" });
    //         setName("");
    //         setUnsignName("");
    //         setStatus("active");
    //         setNameError(false);
    //         setUnsignError(false);

    //     } catch {
    //         toast.error("Thêm tỉnh thất bại!", { toastId: "validate" });
    //     }
    // }

    const handleSumitProvince = async (shouldClose = false) => {
        const isNameValid = !!name.trim();
        const isUnsignValid = !!unsignName.trim();

        setNameError(!isNameValid);
        setUnsignError(!isUnsignValid);

        if (!isNameValid || !isUnsignValid) return;

        const payload = {
            I_PROV_NAME: name,
            I_PROV_UNSIGNNAME: unsignName,
            I_STAT_ID: status === "active" ? "ENABLE" : "DISABLE",
        };

        try {
            const response = await dispatch(Province_Insert(payload)).unwrap();

            if (response.O_RESULT === -1) {
                toast.error(`Lỗi: ${response.O_MESSAGE}`, { toastId: "validate" });
                return;
            }

            // Gọi reload danh sách
            if (onSuccess) onSuccess();

            // Hiện thông báo
            toast.success("Thêm tỉnh thành công!", { toastId: "validate" });

            // Reset form
            setName("");
            setUnsignName("");
            setStatus("active");
            setNameError(false);
            setUnsignError(false);

            // Nếu cần đóng dialog sau khi submit
            if (shouldClose) {
                onClose();
            }

        } catch {
            toast.error("Thêm tỉnh thất bại!", { toastId: "validate" });
        }
    };

    const handleSubmit = () => handleSumitProvince(true);   // Lưu & Thoát
    const handleSubmitMore = () => handleSumitProvince(false); // Lưu & Thêm

    const handleClose = () => {
        onClose();
        setNameError(false);
        setUnsignError(false);
        setUnsignName("");
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperComponent={PaperComponent}
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            error={nameError}
                            sx={{ width: '400px' }}
                        />
                        <TextField
                            required
                            margin="dense"
                            label="Tên viết tắt"
                            name="abbreviatedName"
                            fullWidth
                            variant="outlined"
                            value={unsignName}
                            onChange={(e) => setUnsignName(e.target.value)}
                            error={unsignError}
                            sx={{ width: '400px' }}
                        />
                        <TextField
                            select
                            margin="dense"
                            label="Trạng thái"
                            name="status"
                            variant="outlined"
                            sx={{ width: '150px' }}
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="active">Đang sử dụng</MenuItem>
                            <MenuItem value="inactive">Ngưng sử dụng</MenuItem>
                        </TextField>
                    </Stack>

                </DialogContent>
                <DialogActions sx={{ padding: '0 25px 20px' }}>
                    <Button
                        size="medium"
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Lưu & thoát</Button>
                    <Button
                        size="medium"
                        variant="outlined"
                        color="success"
                        onClick={handleSubmitMore}
                    >Lưu & thêm
                    </Button>
                    <Button
                        size="medium"
                        variant="outlined"
                        color="error"
                        onClick={handleClose}
                    >Đóng
                    </Button>
                </DialogActions>
            </Dialog >
        </>

    );
}

export default ProvincesCustomizeAdd;