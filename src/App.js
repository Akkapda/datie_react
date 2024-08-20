<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
=======
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CardApplicationComplete from "./component/cardcompletion/CardApplicationComplete";
import SignUpComponent from "./component/register_first/SignUpForm_first";
import SignUpForm from "./component/register_second/SignUpForm";
import CardCreationForm from "./component/cardselection_first/CardCreationForm";
import ProfileComparison from "./component/cardselection_second/ProfileComparison";
import CardInfoInput from "./component/cardselection_3/CardInfoInput";
import LoginPage from "./component/Login/LoginPage";
>>>>>>> f61c78e (충돌 해결 서현오)
import Paypassword from "./component/pay/Paypassword";
import IndexMain from "./component/mainIndex/IndexMain";
import Payresult from "./component/pay/Payresult";
import AdminMember from "./component/admin/AdminMember";
import AdminStatistics from "./component/admin/AdminStatistics";
function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexMain />} />
      <Route path="/pay/Paypassword" element={<Paypassword />} />
      <Route path="/pay/Payresult" element={<Payresult />} />
      <Route path="/admin/member" element={<AdminMember />} />
      <Route path="/admin" element={<AdminStatistics />} />
=======
import "./App.css";
import { Routes, Route } from "react-router-dom";
import CardApplicationComplete from "./component/cardcompletion/CardApplicationComplete";
import SignUpComponent from "./component/register_first/SignUpForm_first";
import SignUpForm from "./component/register_second/SignUpForm";
import CardCreationForm from "./component/cardselection_first/CardCreationForm";
import ProfileComparison from "./component/cardselection_second/ProfileComparison";
import CardInfoInput from "./component/cardselection_3/CardInfoInput";
import LoginPage from "./component/Login/LoginPage";
function App() {
  return (
    <Routes>
<<<<<<< HEAD
      {/* <Route path="/" element={<SignUpComponent />} /> */}
      {/* <Route path="/" element={<SignUpForm />} /> */}
      {/* <Route path="/" element={<CardCreationForm />} /> */}
      {/* <Route path="/" element={<ProfileComparison />} /> */}
      {/* <Route path="/" element={<CardInfoInput />} /> */}
      {/* <Route path="/" element={<CardApplicationComplete />} /> */}
      <Route path="/" element={<LoginPage />} />
>>>>>>> c50851e (0819first_push)
=======
      <Route path="/verify" element={<SignUpComponent />} />
      <Route path="/signup" element={<SignUpForm />} />
      <Route path="/search_lover" element={<CardCreationForm />} />
      <Route path="/card_selection" element={<ProfileComparison />} />
      <Route path="/card_info" element={<CardInfoInput />} />
      <Route path="/card_complete" element={<CardApplicationComplete />} />
      <Route path="/login" element={<LoginPage />} />
>>>>>>> ec01dc8 (second_push_240819)
    </Routes>
=======
import RealHeader from "./component/RealHeader"
import Header from "./component/Header"
import Footer from "./component/Footer"

function App() {
  return (
    <div>
    <div className="App">
      <RealHeader/>
      <Header title={"서브 헤더"}/>
    </div>
    <div className="footer">
      <Footer/> 
    </div>
    </div>
>>>>>>> 21e6403 (test)
  );
=======
import DiaryDetail from './diary/pages/DiaryDetail';
import DiaryHome from './diary/pages/DiaryHome';
import { Routes, Route } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/diary" element={<DiaryHome />} />
                <Route path="/diary/detail" element={<DiaryDetail />} />
            </Routes>
        </div>
    );
>>>>>>> ad31c67 (20240818)
=======
import './App.css';
import { Routes, Route } from 'react-router-dom';
import CardApplicationComplete from './component/cardcompletion/CardApplicationComplete';
import SignUpComponent from './component/register_first/SignUpForm_first';
import SignUpForm from './component/register_second/SignUpForm';
import CardCreationForm from './component/cardselection_first/CardCreationForm';
import ProfileComparison from './component/cardselection_second/ProfileComparison';
import CardInfoInput from './component/cardselection_3/CardInfoInput';
import LoginPage from './component/Login/LoginPage';
import Paypassword from './component/pay/Paypassword';
import PayInfo from './component/pay/PayInfo';
import IndexMain from './component/mainIndex/IndexMain';
import Payresult from './component/pay/Payresult';
import AdminMember from './component/admin/AdminMember';
import AdminStatistics from './component/admin/AdminStatistics';
import CardPasswordChange from './component/profile/CardPasswordChange'; // 경로 확인 후 수정
import CardLostReport from './component/profile/CardLostReport'; // 새로 추가된 컴포넌트 경로
import CardLostReportCancellation from './component/profile/CardLostReportCancellation'; // 새로 추가된 컴포넌트 경로
import CardCancellation from './component/profile/CardCancellation'; // 새로 추가된 컴포넌트 경로
import EditProfile from './component/profile/EditProfile'; // 경로 확인 후 수정
import ViewProfile from './component/profile/ViewProfile'; // 경로 확인 후 수정
import DiaryDetail from './component/diary/pages/DiaryDetail';
import DiaryHome from './component/diary/pages/DiaryHome';

function App() {
    return (
        <Routes>
            <Route path="/verify" element={<SignUpComponent />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/search_lover" element={<CardCreationForm />} />
            <Route path="/card_selection" element={<ProfileComparison />} />
            <Route path="/card_info" element={<CardInfoInput />} />
            <Route
                path="/card_complete"
                element={<CardApplicationComplete />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<IndexMain />} />
            <Route path="/pay/Paypassword" element={<Paypassword />} />
            <Route path="/pay/Payresult" element={<Payresult />} />
            <Route path="/pay/PayInfo" element={<PayInfo />} />
            <Route path="/admin/member" element={<AdminMember />} />
            <Route path="/admin" element={<AdminStatistics />} />
            <Route path="/card-lost-report" element={<CardLostReport />} />
            <Route path="/card-lost-report-cancellation" element={<CardLostReportCancellation />} />
            <Route path="/card-cancellation" element={<CardCancellation />} />
            <Route path="/change-cardpassword" element={<CardPasswordChange />} />
            <Route path="/edit-profile/:email" element={<EditProfile />} />
            <Route path="/view-profile/:email" element={<ViewProfile />} />
            <Route path="/diary" element={<DiaryHome />} />
            <Route path="/diary/detail" element={<DiaryDetail />} />
            <Route path="/" element={<LoginPage />} />
        </Routes>
    );
>>>>>>> 9a861bd (pay수정 hanju)
}

export default App;
