import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { TextField, Button as MuiButton, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import './EditProfile.css';
import '../../index.css';

const EditProfile = () => {
    const { userno } = useParams(); 
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [detailedAddress, setDetailedAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');
    const [gender, setGender] = useState('');
    const [age, setAge] = useState('');
    const [bankName, setBankName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isVerificationRequested, setIsVerificationRequested] = useState(false);
    const [timer, setTimer] = useState(180);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8090/api/profile?userno=${userno}`);
                const data = response.data;

                setName(data.name);
                setEmail(data.email);
                setAddress(data.addr1);
                setDetailedAddress(data.addr2);
                setExtraAddress(data.extraAddress);
                setGender(data.sex);
                setAge(data.age);
                setBankName(data.bank);
                setAccountNumber(data.account);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserProfile();
    }, [userno]);

    useEffect(() => {
        // 카카오 주소 검색 API 스크립트 로드
        const script = document.createElement("script");
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            console.log("Daum Postcode script loaded");
        };

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const handleVerificationRequest = () => {
        setIsVerificationRequested(true);
        setVerificationCode('');
        setTimer(180);

        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);
    };

    const handleAddressSearch = () => {
        if (window.daum && window.daum.Postcode) {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    let addr = ''; // 주소 변수
                    let extraAddr = ''; // 참고항목 변수

                    if (data.userSelectedType === 'R') {
                        addr = data.roadAddress;
                    } else {
                        addr = data.jibunAddress;
                    }

                    if (data.userSelectedType === 'R') {
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            extraAddr += data.bname;
                        }
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        if (extraAddr !== '') {
                            extraAddr = ' (' + extraAddr + ')';
                        }
                    }

                    setAddress(addr);
                    setExtraAddress(extraAddr);
                    setDetailedAddress(''); // 상세주소를 빈칸으로 리셋
                    document.getElementById("detailedAddress").focus(); // 상세주소 입력 필드에 포커스
                }
            }).open();
        } else {
            console.error('Daum Postcode script is not loaded.');
        }
    };

    const handleSave = async () => {
        try {
            await axios.post(`http://localhost:8090/api/profile/${userno}`, {
                name,
                email,
                addr1: address,
                addr2: detailedAddress,
                sex: gender,
                age,
                bank: bankName,
                account: accountNumber,
                verificationCode
            });

            alert('수정완료 되었습니다.');
            navigate(`/view-profile/${userno}`);
        } catch (error) {
            console.error('Error saving profile data:', error);
            alert('정보 수정 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="EditProfile">
            <Header title="Edit Profile" />
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>내 정보 수정</h2>
            <div className="edit_profile_container">
                <TextField
                    id="name"
                    label="이름"
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />
                <TextField
                    id="email"
                    label="이메일"
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                        id="address"
                        label="주소"
                        variant="standard"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{ width: '80%' }}
                    />
                    <MuiButton
                        variant="contained"
                        sx={{
                            ml: 2,
                            backgroundColor: "rgb(148, 160, 227)",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgb(120, 140, 200)",
                            },
                            width: "125px"
                        }}
                        onClick={handleAddressSearch}
                    >
                        주소찾기
                    </MuiButton>
                </Box>
                <TextField
                    id="detailedAddress"
                    label="상세주소"
                    variant="standard"
                    value={detailedAddress}
                    onChange={(e) => setDetailedAddress(e.target.value)}
                    sx={{ mt: 2, width: '100%' }}
                />
                <TextField
                    id="gender"
                    label="성별"
                    variant="standard"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    select
                    sx={{ mt: 2, width: '100%' }}
                >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </TextField>
                <TextField
                    id="age"
                    label="나이"
                    variant="standard"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    type="number"
                    sx={{ mt: 2, width: '100%' }}
                />
                <TextField
                    id="bankName"
                    label="은행 이름"
                    variant="standard"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    select
                    sx={{ mt: 2, width: '100%' }}
                >
                    <MenuItem value="KB국민은행">KB국민은행</MenuItem>
                    <MenuItem value="신한은행">신한은행</MenuItem>
                    <MenuItem value="우리은행">우리은행</MenuItem>
                    <MenuItem value="하나은행">하나은행</MenuItem>
                    <MenuItem value="IBK기업은행">IBK기업은행</MenuItem>
                    <MenuItem value="NH농협은행">NH농협은행</MenuItem>
                    <MenuItem value="카카오뱅크">카카오뱅크</MenuItem>
                    <MenuItem value="케이뱅크">케이뱅크</MenuItem>
                </TextField>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <TextField
                        id="accountNumber"
                        label="계좌 번호"
                        variant="standard"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        sx={{ width: '70%' }}
                    />
                    <MuiButton
                        variant="contained"
                        sx={{
                            ml: 2,
                            backgroundColor: "rgb(148, 160, 227)",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgb(120, 140, 200)",
                            },
                            width: "125px"
                        }}
                        onClick={handleVerificationRequest}
                    >
                        인증하기
                    </MuiButton>
                </Box>
                {isVerificationRequested && (
                    <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                        <TextField
                            id="verificationCode"
                            label="인증 코드"
                            variant="standard"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            sx={{ width: '70%' }}
                        />
                        <Box sx={{ ml: 2 }}>
                            <span>타이머: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</span>
                        </Box>
                    </Box>
                )}
                {/* 저장 버튼을 중앙에 위치시키기 위한 Box */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                    <MuiButton
                        variant="contained"
                        sx={{
                            backgroundColor: "rgb(148, 160, 227)",
                            color: "white",
                            "&:hover": {
                                backgroundColor: "rgb(120, 140, 200)",
                            }
                        }}
                        onClick={handleSave}
                    >
                        저장
                    </MuiButton>
                </Box>
            </div>
            <Footer />
        </div>
    );
};

export default EditProfile;