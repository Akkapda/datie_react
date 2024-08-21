import './DiaryList.css';
import Button from './Button';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DiaryItem from './DiaryItem';

const DiaryList = ({ data }) => {
    return (
        <div className="DiaryList">
            <div className="menu_wrapper">2020-08-16 (금)</div>
            <div className="list_wrapper">
                {data.map((item) => (
                    <DiaryItem
                        diaryNo={item.diaryNo}
                        companyName={item.companyName}
                        rate={item.rate}
                        review={item.review}
                        uploadOrg={item.uploadOrg}
                        uploadReal={item.uploadReal}
                    />
                ))}
            </div>
        </div>
    );
};
export default DiaryList;
