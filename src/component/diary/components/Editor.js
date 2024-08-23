import * as React from 'react';
import './Editor.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const Editor = ({ diaryNo, companyName, rate, review, onSubmit }) => {
    const [value, setValue] = useState(rate || 0);
    const [reviewText, setReviewText] = useState(review || '');
    const [selectedImages, setSelectedImages] = useState([]);
    const fileInputRef = React.useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages((prevImages) => [...prevImages, ...files]);
    };

    const handleImageUpload = async () => {
        const imageFormData = new FormData();
        imageFormData.append('diaryNo', diaryNo);

        selectedImages.forEach((image) => {
            imageFormData.append('images', image);
        });

        try {
            const response = await axios.post(
                'http://localhost:8090/api/diary/imageUpload',
                imageFormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.status !== 200) {
                throw new Error('Failed to upload images');
            }
        } catch (error) {
            console.error('Error uploading images:', error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        try {
            // 이미지 업로드 요청
            await handleImageUpload();

            // 나머지 폼 데이터 전송
            const formData = new FormData();
            formData.append('diaryNo', diaryNo);
            formData.append('rate', value);
            formData.append('review', reviewText);

            const response = await axios.post(
                'http://localhost:8090/api/diary/upload',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                },
            );

            if (response.status === 200) {
                onSubmit({
                    diaryNo,
                    companyName,
                    rate: value,
                    review: reviewText,
                });
                // 성공 시에 navigate 또는 다른 로직 추가 가능
            }
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const handleImageRemove = (index) => {
        setSelectedImages((prevImages) =>
            prevImages.filter((_, i) => i !== index),
        );
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    return (
        <>
            <div className="Editor">
                <div className="editor_section_head">
                    <h1>{companyName}</h1>
                </div>
                <div className="editor_section">
                    <Rating
                        name="simple-controlled"
                        size="large"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
                <div className="editor_section">
                    <div className="input_wrapper">
                        <textarea
                            placeholder="한줄평을 남겨주세요"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                    </div>
                </div>
                <div className="editor_section">
                    <button
                        type="button"
                        className="upload_button"
                        onClick={handleFileInputClick}
                    >
                        사진 추가+
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                    />
                    <div className="image_preview">
                        {selectedImages.length > 0 &&
                            selectedImages.map((image, index) => (
                                <div key={index} className="image_container">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`selected ${index}`}
                                        className="preview_image"
                                    />
                                    <IconButton
                                        className="delete_button"
                                        onClick={() => handleImageRemove(index)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="editor_section bottom_section">
                    <Button
                        variant="outlined"
                        sx={{ fontFamily: '"Gamja Flower", sans-serif' }}
                        onClick={handleSubmit}
                    >
                        작성 완료
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Editor;
