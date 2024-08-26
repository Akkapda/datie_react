import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ProfileType from './ProfileType';
import ResponsiveAppBar from '../RealHeader';
import Footer from '../Footer';
import Header from '../Header';
import { Button as MuiButton } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ProfileComparison = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userno1 = queryParams.get('userno1');
    const userno2 = queryParams.get('userno2');

    const [param, setParam] = useState({
        userno1: userno1,
        userno2: userno2,
    });
    useEffect(() => {
        getApi();
    }, []);

    let [userObject1, setUserObject1] = useState({});
    let [userObject2, setUserObject2] = useState({});
    const getApi = () => {
        axios
            .get('http://localhost:8090/api/userInfoByNo', { params: param })
            .then((res) => {
                console.log(res);
                setUserObject1(res.data[0]);
                setUserObject2(res.data[1]);
                // setData(res.data.result.content);
                // setTotalElements(res.data.result.totalElements);
                // setTotalPages(res.data.result.totalPages);
                // setCurrentPage(res.data.result.number + 1);
                // setPageList(res.data.pageList);
                // setPrevPage(res.data.prevPage);
                // setNextPage(res.data.nextPage);
            });
    };

    const [selectedType1, setSelectedType1] = useState('2');
    const [selectedType2, setSelectedType2] = useState('2');

    // 여러 프로필 이미지 배열
    const profileImages = [
        [
            'https://cdn.builder.io/api/v1/image/assets/TEMP/cefa2657ac78df46c9f16ba1a2e1e7387a5adf6257f902137ce595524fdf319e?placeholderIfAbsent=true&apiKey=d9ab0808f42f485d9f1f9f59597e6744',
            'TYPE 1. Must Have 가져야만해(Red)',
        ],
        [
            'https://financialshopping-cdn.banksalad.com/_821321201f.png',
            'TYPE 2. 어쩌구 저쩌구 카드염',
        ],
        [
            'https://financialshopping-cdn.banksalad.com/IBK_f25a996347.png',
            'TYPE 3. 맹구와 영구 카드',
        ],
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentImageText, setCurrentImageText] = useState(
        profileImages[currentImageIndex][1],
    );
    const handleTypeChange1 = (event) => {
        setSelectedType1(event.target.value);
    };

    const handleTypeChange2 = (event) => {
        setSelectedType2(event.target.value);
    };

    const handleNextImage = () => {
        let index = (currentImageIndex + 1) % profileImages.length;
        setCurrentImageIndex(index);
        setCurrentImageText(profileImages[index][1]);
    };

    const handlePreviousImage = () => {
        let index =
            (currentImageIndex - 1 + profileImages.length) %
            profileImages.length;
        setCurrentImageIndex(index);
        setCurrentImageText(profileImages[index][1]);
    };

    return (
        <div>
            <ResponsiveAppBar />
            <Header title={'카드선택'} />
            <ComparisonContainer>
                <ProfileImage
                    src={profileImages[currentImageIndex][0]}
                    alt="Profile"
                />
                <ButtonContainer>
                    <NavigationButton onClick={handlePreviousImage}>
                        ◀
                    </NavigationButton>
                    <NavigationButton onClick={handleNextImage}>
                        ▶
                    </NavigationButton>
                </ButtonContainer>
                <MustHaveLabel>{currentImageText}</MustHaveLabel>
                <ProfileSection>
                    <ProfileTitle>{userObject1.name}</ProfileTitle>
                    <TypesContainer>
                        {['1', '2', '3'].map((type) => (
                            <label key={type}>
                                <input
                                    type="radio"
                                    value={type}
                                    checked={selectedType1 === type}
                                    onChange={handleTypeChange1}
                                />
                                {'Type ' + type}
                            </label>
                        ))}
                    </TypesContainer>
                </ProfileSection>
                <ProfileSection>
                    <ProfileTitle>{userObject2.name}</ProfileTitle>
                    <TypesContainer>
                        {['1', '2', '3'].map((type) => (
                            <label key={type}>
                                <input
                                    type="radio"
                                    value={type}
                                    checked={selectedType2 === type}
                                    onChange={handleTypeChange2}
                                />
                                {'Type ' + type}
                            </label>
                        ))}
                    </TypesContainer>
                </ProfileSection>

                <MuiButton
                    variant="contained"
                    sx={{
                        mt: 10,
                        backgroundColor: 'rgb(148, 160, 227)',
                        '&:hover': {
                            backgroundColor: 'rgb(120, 140, 200)',
                        },
                        width: '50%',
                        height: '50px',
                    }}
                    onClick={function () {
                        console.log('선택된 타입 1:', selectedType1);
                        console.log('선택된 타입 2:', selectedType2);
                        navigate(
                            '/card_info?userno1=' +
                                userno1 +
                                '&userno2=' +
                                userno2 +
                                '&userno1Type=' +
                                selectedType1 +
                                '&userno2Type=' +
                                selectedType2,
                        );
                    }}
                >
                    선택하기
                </MuiButton>
            </ComparisonContainer>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
};

const ComparisonContainer = styled.main`
    margin-top: 50px;
    align-items: center;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
`;

const ProfileImage = styled.img`
    aspect-ratio: 0.63;
    object-fit: contain;
    object-position: center;
    width: 111px;
    max-width: 100%;
`;

const MustHaveLabel = styled.span`
    display: flex;
`;

const ProfileSection = styled.section`
    margin-top: 39px;
`;

const ProfileTitle = styled.h2`
    color: #000;
    text-align: center;
`;

const TypesContainer = styled.div`
    align-self: flex-end;
    display: flex;
    margin-top: 18px;
    gap: 27px;
    flex-wrap: wrap;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    width: 100%; /* 버튼을 전체 너비에 맞춤 */
`;

const NavigationButton = styled.button`
    background-color: #f0f0f0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    padding: 10px 20px;
    font-size: 16px;

    &:hover {
        background-color: #e0e0e0; /* 호버 시 색상 조정 */
    }
`;

export default ProfileComparison;
