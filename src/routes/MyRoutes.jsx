import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../pages/LoginPage";
import TransaksiPage from '../pages/TransaksiPage';
import LaporanPage from '../pages/LaporanPage';
import BarangPage from '../pages/BarangPage';
import BarangInsertPage from '../pages/BarangInsertPage';
import BarangUpdatePage from '../pages/BarangUpdatePage';
import AnalyticsMBAPage from '../pages/AnalyticsMBAPage';
import AnalyticsClusteringPage from '../pages/AnalyticsClusteringPage';
import KasirPage from '../pages/KasirPage';

export default function MyRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn/>} />
                <Route path="/login" element={<SignIn/>} />
                <Route path="/logout" element={<SignIn/>} />
                <Route path="/transaksi" element={<TransaksiPage/>} />
                <Route path="/laporan" element={<LaporanPage/>} />
                <Route path="/barang" element={<BarangPage/>} />
                <Route path="add-barang" element={<BarangInsertPage/>} />
                <Route path="/barang/update-barang" element={<BarangUpdatePage/>} />
                <Route path="/mba" element={<AnalyticsMBAPage/>} />
                <Route path="/clustering" element={<AnalyticsClusteringPage/>} />
                <Route path="/kasir" element={<KasirPage/>} />
            </Routes>
        </BrowserRouter>
    )
}