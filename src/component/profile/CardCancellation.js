import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header'; 
import Footer from '../Footer';
import { Button as MuiButton, Box, Typography, TextField } from '@mui/material';
import axios from 'axios';
import './CardCancellation.css'; 

const CardCancellation = () => {
    const { userno } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [isCancelled, setIsCancelled] = useState(false);

    const handlePasswordSubmit = async () => {
        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            setSuccess('');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8090/api/card-cancel/${userno}`, {
                userno: userno,
                cardno: 0,
                status: 3, // 상태 3은 카드 해지로 간주
                currentPassword: password
            });

            if (response.status === 200) {
                setIsCancelled(true);
                setSuccess('카드가 성공적으로 해지되었습니다.');
                setError('');
            } else {
                setError('카드 해지에 실패했습니다.');
                setSuccess('');
            }
        } catch (error) {
            console.error('Error cancelling card:', error);
            setError('카드 해지에 실패했습니다.');
            setSuccess('');
        }
    };

    return (
        <div className="CardCancellation">
            <Header /> {/* 헤더를 페이지 상단에 추가 */}
            <div className="content">
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>카드 해지 신청</h2>
                <div className="cancellation_container">
                    <Typography sx={{ textAlign: 'center', mb: 2 }}>
                        {isCancelled ? '카드가 해지된 상태입니다.' : '카드 해지 신청을 할 수 있습니다.'}
                    </Typography>

                    {!isCancelled && (
                        <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
                            <TextField
                                label="현재 비밀번호"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                sx={{ mb: 2, width: '100%' }}
                            />
                            <TextField
                                label="비밀번호 확인"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                sx={{ mb: 2, width: '100%' }}
                            />
                            <MuiButton
                                variant="contained"
                                sx={{
                                    backgroundColor: "rgb(148, 160, 227)",
                                    color: "white",
                                    "&:hover": {
                                        backgroundColor: "rgb(120, 140, 200)",
                                    },
                                    width: "150px"
                                }}
                                onClick={handlePasswordSubmit}
                            >
                                확인
                            </MuiButton>
                        </Box>
                    )}

                    {success && (
                        <Typography sx={{ mt: 2, color: 'green', textAlign: 'center' }}>
                            {success}
                        </Typography>
                    )}
                    {error && (
                        <Typography sx={{ mt: 2, color: 'red', textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}
                </div>
            </div>
            <Footer /> {/* 푸터를 페이지 하단에 추가 */}
        </div>
    );
};

export default CardCancellation;
