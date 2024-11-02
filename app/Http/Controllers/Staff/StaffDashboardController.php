<?php

namespace App\Http\Controllers\Staff;

use App\Http\Controllers\Controller;
use App\Http\Resources\InformasiResource;
use App\Http\Resources\PembayaranSPPResource;
use App\Models\Guru;
use App\Models\Informasi;
use App\Models\Kelas;
use App\Models\PembayaranSPP;
use App\Models\Pendaftaran;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffDashboardController extends Controller
{
    public function index(){
        $siswaCount = Siswa::where('status', 1)->count();
        $guruCount = Guru::where('status', 1)->count();
        $kelasCount = Kelas::count();
        $pendaftaranCount = Pendaftaran::count();
        $informasi = Informasi::with('user')->latest()->take(3)->get();
        $pembayaran = PembayaranSPP::with('siswa.kelas')->where('status_pembayaran', '=', 'belum lunas')->latest()->take(3)->get();
        return Inertia::render('Admin/Staff/Dashboard', [
            'siswaCount' => $siswaCount,
            'guruCount' => $guruCount,
            'kelasCount' => $kelasCount,
            'pendaftaranCount' => $pendaftaranCount,
            'informasi' => InformasiResource::collection($informasi),
            'pembayaran' => PembayaranSPPResource::collection($pembayaran),
        ]);
    }
}
