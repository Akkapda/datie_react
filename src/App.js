import { Routes, Route } from "react-router-dom";
import Paypassword from "./component/pay/Paypassword";
import Payresult from "./component/pay/Payresult";
import IndexMain from "./component/mainIndex/IndexMain";
function App() {
  return (
<<<<<<< HEAD
    <Routes>
      <Route path="/pay/paypassword" element={<Paypassword />} />
    </Routes>
=======
    <div className="App">
      <Routes>
        <Route path="/pay/Paypassword" element={<Paypassword />} />
        <Route path="/pay/Payresult" element={<Payresult />} />
        <Route path="/indexMain" element={<IndexMain />} />
      </Routes>
    </div>
>>>>>>> 5d55ddc (글씨체 추가, 결제창)
  );
}

export default App;
