<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Http\Resources\AbsensiResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\SiswaResource;
use App\Models\Absensi;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasMataPelajaran;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AbsensiController extends Controller
{
    public function index()
    {
        $kelasId = request('kelas_id');
        $tanggal = request('tanggal');
        $absensi = Absensi::with(['siswa', 'kelas', 'mataPelajaran'])
            ->where('kelas_id', $kelasId)
            ->where('tanggal', $tanggal)
            ->get();
        $sudahAbsen = $absensi->isNotEmpty();
        $guruId = Guru::where('user_id', Auth::user()->id)->value('id');
        $kelasIds = KelasMataPelajaran::where('guru_id', $guruId)->pluck('kelas_id');
        $kelas = Kelas::whereIn('id', $kelasIds)->get();

        $siswa = Siswa::with(['user', 'kelas', 'jurusan'])->whereIn('kelas_id', $kelasIds)->get();

        return Inertia::render('Admin/Guru/Absensi/Index', [
            'queryParams' => request()->query() ?: null,
            'absensi' => AbsensiResource::collection($absensi),
            'sudahAbsen' => $sudahAbsen,
            'kelas' => KelasResource::collection($kelas),
            'siswa' => SiswaResource::collection($siswa)
        ]);
    }

    public function store(Request $request){
        $attendance = $request->attendance;

        foreach ($attendance as $item) {
            Absensi::create([
                'siswa_id' => $item['siswa_id'],
                'tanggal' => $item['tanggal'],
                'status_kehadiran' => $item['status_kehadiran'],
                'keterangan' => $item['keterangan'],
                'kelas_id' => $item['kelas_id'],
                'guru_id' => $item['guru_id'],
            ]);
        }
    }
}
