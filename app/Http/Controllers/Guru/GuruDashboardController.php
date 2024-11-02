<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Http\Resources\InformasiResource;
use App\Models\Guru;
use App\Models\Informasi;
use App\Models\Kelas;
use App\Models\KelasMataPelajaran;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GuruDashboardController extends Controller
{
    public function index(){
        $informasi = Informasi::with('user')->where('tujuan', '=', 'guru')->latest()->take(3)->get();

        // total kelas
        $guruId = Guru::where('user_id', Auth::user()->id)->value('id');
        $kelasIds = KelasMataPelajaran::where('guru_id', $guruId)->pluck('kelas_id');
        $kelas = Kelas::whereIn('id', $kelasIds)->count();

        // total siswa 
        $siswa = Siswa::whereIn('kelas_id', $kelasIds)->count();

        return Inertia::render('Admin/Guru/Dashboard', [
            'informasi' => InformasiResource::collection($informasi),
            'totalKelas' => $kelas,
            'totalSiswa' => $siswa
        ]);
    }
}
