import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../pages/LoginPage";
import TransaksiPage from '../pages/TransaksiPage';
import LaporanPage from '../pages/LaporanPage';
import BarangPage from '../pages/BarangPage';
import AnalyticsPage from '../pages/AnalyticsPage';
import KasirPage from '../pages/KasirPage';

export default function MyRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>} />
                <Route path="/login" element={<SignIn/>} />
                <Route path="/transaksi" element={<TransaksiPage/>} />
                <Route path="/laporan" element={<LaporanPage/>} />
                <Route path="/barang" element={<BarangPage/>} />
                <Route path="/analytics" element={<AnalyticsPage/>} />
                <Route path="/kasir" element={<KasirPage/>} />
            </Routes>
        </BrowserRouter>
    )
}