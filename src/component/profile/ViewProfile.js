import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { Button as MuiButton, Typography, Box, Avatar } from '@mui/material';
import axios from 'axios';
import '../../index.css'; // 전역 스타일을 먼저 import
import './ViewProfile.css'; // 컴포넌트별 스타일을 나중에 import

const ViewProfile = () => {
    const { userno } = useParams(); // URL 파라미터에서 userno 추출
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const url = `http://localhost:8090/api/profile?userno=${userno}`;
                console.log(`Requesting URL: ${url}`); // 요청 URL 로깅
                const response = await axios.get(url);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error); // 에러 로깅
                setError('사용자 데이터를 가져오는 데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchUserData();
    }, [userno]);

    const handleEdit = () => {
        navigate(`/edit-profile/${userno}`);
    };

    const handleChangePicture = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('profilePicture', selectedFile);

            try {
                await axios.post(`http://localhost:8090/api/profile/${userno}/upload`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                // Refresh user data after successful upload
                const url = `http://localhost:8090/api/profile?userno=${userno}`;
                const response = await axios.get(url);
                setUser(response.data);
                setSelectedFile(null);
            } catch (error) {
                console.error('Error uploading image:', error);
                setError('프로필 이미지를 변경하는 데 실패했습니다.');
            }
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleCardPasswordChange = () => {
        navigate(`/changecardpassword/${userno}`);
    };

    const handleCardLostReport = () => {
        navigate(`/card-lost-report/${userno}`);
    };

    const handleCardCancellation = () => {
        navigate(`/card-cancellation/${userno}`);
    };

    if (loading) return <p>로딩 중...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>사용자 정보를 찾을 수 없습니다.</p>;

    return (
        <div className="ViewProfile">
            <Header title="내 프로필" />
            <div className="view_profile_container">
                <Box sx={{ mt: 2, width: '100%', textAlign: 'center' }}>
                    <Avatar
                        alt={user.name}
                        src={user.profilePicture || '/default-avatar.png'}
                        sx={{ width: 100, height: 100, margin: '0 auto' }}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="file-input"
                        onChange={handleFileChange}
                    />
                    <label htmlFor="file-input">
                        <MuiButton
                            variant="outlined"
                            sx={{ mt: 1 }}
                            component="span"
                            onClick={handleChangePicture}
                        >
                            이미지 변경
                        </MuiButton>
                    </label>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Gamja Flower, cursive' }}>이름</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Gamja Flower, cursive' }}>{user.name}</Typography>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Gamja Flower, cursive' }}>유저번호</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Gamja Flower, cursive' }}>{user.userno}</Typography>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Gamja Flower, cursive' }}>주소</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Gamja Flower, cursive' }}>{user.addr1}</Typography>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Gamja Flower, cursive' }}>상세주소</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Gamja Flower, cursive' }}>{user.addr2}</Typography>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Gamja Flower, cursive' }}>성별</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Gamja Flower, cursive' }}>{user.sex}</Typography>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Gamja Flower, cursive' }}>나이</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Gamja Flower, cursive' }}>{user.age}</Typography>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Gamja Flower, cursive' }}>은행 이름</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Gamja Flower, cursive' }}>{user.bank}</Typography>
                </Box>
                <Box sx={{ mt: 2, width: '100%' }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Gamja Flower, cursive' }}>계좌번호</Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Gamja Flower, cursive' }}>{user.account}</Typography>
                </Box>
                <Box sx={{ mt: 3, width: '100%' }}>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                        <MuiButton
                            variant="contained"
                            sx={{
                                backgroundColor: "rgb(148, 160, 227)",
                                "&:hover": {
                                    backgroundColor: "rgb(120, 140, 200)",
                                },
                                width: "100%",
                            }}
                            onClick={handleCardPasswordChange}
                        >
                            카드 비밀번호 변경
                        </MuiButton>
                        <MuiButton
                            variant="contained"
                            sx={{
                                backgroundColor: "rgb(148, 160, 227)",
                                "&:hover": {
                                    backgroundColor: "rgb(120, 140, 200)",
                                },
                                width: "100%",
                            }}
                            onClick={handleCardLostReport}
                        >
                            카드 분실 신청/해지
                        </MuiButton>
                        <MuiButton
                            variant="contained"
                            sx={{
                                backgroundColor: "rgb(148, 160, 227)",
                                "&:hover": {
                                    backgroundColor: "rgb(120, 140, 200)",
                                },
                                width: "100%",
                            }}
                            onClick={handleCardCancellation}
                        >
                            카드 해지 신청
                        </MuiButton>
                        <MuiButton
                            variant="contained"
                            sx={{
                                backgroundColor: "rgb(148, 160, 227)",
                                "&:hover": {
                                    backgroundColor: "rgb(120, 140, 200)",
                                },
                                width: "100%",
                            }}
                            onClick={handleEdit}
                        >
                            내 정보수정
                        </MuiButton>
                    </Box>
                </Box>
            </div>
            <Footer />
        </div>
    );
};

export default ViewProfile;
