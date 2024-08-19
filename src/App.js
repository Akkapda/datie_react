import DiaryDetail from './component/diary/pages/DiaryDetail';
import DiaryHome from './component/diary/pages/DiaryHome';
import { Routes, Route } from 'react-router-dom';
import './App.css';
// 올바른 경로로 수정
import CardApplicationComplete from './component/cardcompletion/CardApplicationComplete';
import SignUpComponent from './component/register_first/SignUpForm_first';
import SignUpForm from './component/register_second/SignUpForm';
import CardCreationForm from './component/cardselection_first/CardCreationForm';
import ProfileComparison from './component/cardselection_second/ProfileComparison';
import CardInfoInput from './component/cardselection_3/CardInfoInput';
import LoginPage from './component/Login/LoginPage';
import IndexMain from './component/mainIndex/IndexMain';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<IndexMain />} />
                <Route path="/diary" element={<DiaryHome />} />
                <Route path="/diary/detail" element={<DiaryDetail />} />
                {/* <Route path="/" element={<SignUpComponent />} /> */}
                {/* <Route path="/" element={<SignUpForm />} /> */}
                {/* <Route path="/" element={<CardCreationForm />} /> */}
                {/* <Route path="/" element={<ProfileComparison />} /> */}
                {/* <Route path="/" element={<CardInfoInput />} /> */}
                {/* <Route path="/" element={<CardApplicationComplete />} /> */}
                <Route path="/" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
