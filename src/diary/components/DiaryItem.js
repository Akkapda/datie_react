import './DiaryItem.css';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Rating } from '@mui/material';
import EditButton from './EditButton';
import Editor from './Editor';

const DiaryItem = ({ id, placeName, rate, review, images }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="DiaryItem">
            <div className="img_section">
                {images.length > 0 && <img src={images[0]} alt="Diary Item" />}
            </div>
            <div className="info_section">
                <div>
                    <Rating
                        name={rate ? 'conditional-read-only' : 'no-value'}
                        value={rate || null} // rate가 없으면 null로 설정
                        size="small"
                        readOnly={true}
                    />
                </div>
                <div className="date_wrapper">{placeName}</div>

                <div
                    className="content_wrapper"
                    style={{ color: review ? 'black' : 'gray' }}
                >
                    {review || '이 장소에 대한 평가를 남겨주세요!'}
                </div>
            </div>
            <div className="button_section">
                <EditButton onClick={handleOpen} />
            </div>

            {/* Modal 컴포넌트 */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Editor
                        id={id}
                        placeName={placeName}
                        rate={rate}
                        review={review}
                        images={images}
                        onSubmit={handleClose} // 예시로 handleClose를 사용
                    />
                </Box>
            </Modal>
        </div>
    );
};

export default React.memo(DiaryItem);
