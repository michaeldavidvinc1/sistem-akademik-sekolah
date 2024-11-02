<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Http\Resources\InformasiResource;
use App\Http\Resources\PembayaranSPPResource;
use App\Http\Resources\SiswaResource;
use App\Models\Informasi;
use App\Models\KelasMataPelajaran;
use App\Models\PembayaranSPP;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SiswaDashboardController extends Controller
{
    public function index(){
        $siswaId = Siswa::with(['kelas', 'jurusan'])->where('user_id', Auth::user()->id)->first();
        $totalMapel = KelasMataPelajaran::where('kelas_id', '=', $siswaId->kelas_id)->count();
        $pembayaranPending = PembayaranSPP::where('status_pembayaran', '=', 'belum lunas')->count();
        $informasi = Informasi::with('user')->where('tujuan', '=', 'siswa')->latest()->take(3)->get();
        $pembayaran = PembayaranSPP::with('siswa.kelas')->where('status_pembayaran', '=', 'belum lunas')->where('siswa_id', '=', $siswaId->id)->latest()->take(3)->get();
        return Inertia::render('Admin/Siswa/Dashboard', [
            'informasi' => InformasiResource::collection($informasi),
            'pembayaran' => PembayaranSPPResource::collection($pembayaran),
            'pembayaranPending' => $pembayaranPending,
            'totalMapel' => $totalMapel,
            'siswa' => new SiswaResource($siswaId)
        ]);
    }
}
