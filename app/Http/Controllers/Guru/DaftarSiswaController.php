<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Http\Resources\JurusanResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\SiswaResource;
use App\Models\Guru;
use App\Models\Jurusan;
use App\Models\Kelas;
use App\Models\KelasMataPelajaran;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DaftarSiswaController extends Controller
{
    public function index()
    {
        $jurusanId = request('jurusan_id');
        $kelasId = request('kelas_id');
        $userId = Auth::user()->id;

        $guruId = Guru::where('user_id', $userId)->value('id');

        $kelasIds = KelasMataPelajaran::where('guru_id', $guruId)->pluck('kelas_id');

        $siswaQuery = Siswa::whereIn('kelas_id', $kelasIds)
            ->with(['jurusan', 'user', 'kelas']);

        if ($jurusanId) {
            $siswaQuery->where('jurusan_id', $jurusanId);
        }

        if ($kelasId) {
            $siswaQuery->where('kelas_id', $kelasId);
        }

        $siswa = $siswaQuery->get();
        $kelas = Kelas::whereIn('id', $kelasIds)->get();
        $jurusan = Jurusan::all();
        return Inertia::render('Admin/Guru/DaftarSiswa/Index', [
            'siswa' => SiswaResource::collection($siswa),
            'kelas' => KelasResource::collection($kelas),
            'queryParams' => request()->query() ?: null,
            'jurusan' => JurusanResource::collection($jurusan),
        ]);
    }
}
