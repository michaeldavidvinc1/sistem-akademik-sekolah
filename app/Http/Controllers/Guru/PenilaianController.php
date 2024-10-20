<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Http\Resources\JenisPenilaianResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\MataPelajaranResource;
use App\Models\Guru;
use App\Models\JenisPenilaian;
use App\Models\Kelas;
use App\Models\KelasMataPelajaran;
use App\Models\MataPelajaran;
use App\Models\Nilai;
use App\Models\Penilaian;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PenilaianController extends Controller
{
    public function index()
    {
        $kelasId = request('kelas_id');
        $mataPelajaranId = request('mata_pelajaran_id');
        $kategoriNilaiId = request('jenis_penilaian_id');
        $userId = Guru::findOrFail(Auth::user()->id);

        // -- Get kelas id berdasarkan id guru --
        $kelasIds = KelasMataPelajaran::where('guru_id', $userId->id)->pluck('kelas_id');
        $kelas = Kelas::whereIn('id', $kelasIds)->get();

        // -- Get mata pelajaran id berdasarkan id guru --
        $mapelId = KelasMataPelajaran::where('guru_id', $userId->id)->pluck('mata_pelajaran_id');
        $mapel = MataPelajaran::whereIn('id', $mapelId)->get();

        // -- Get jenis penilaian --
        $jenisPenilaian = JenisPenilaian::all();

        // Data untuk ditampilkan (siswa atau penilaian)
        $dataPenilaian = null;

        if ($kelasId && $mataPelajaranId && $kategoriNilaiId) {
            // Ambil kelas_mata_pelajaran_id
            $kelasMapelId = KelasMataPelajaran::where('kelas_id', $kelasId)
                ->where('mata_pelajaran_id', $mataPelajaranId)
                ->where('guru_id', $userId->id)
                ->first()->id;
            // Cek apakah sudah ada penilaian
            $existingPenilaian = Penilaian::where('kelas_mata_pelajaran_id', $kelasMapelId)
                ->where('jenis_penilaian_id', $kategoriNilaiId)
                ->exists();


            if ($existingPenilaian) {
                // Jika sudah ada penilaian, ambil data penilaian
                $dataPenilaian = Penilaian::with(['nilai', 'siswa'])
                    ->where('kelas_mata_pelajaran_id', $kelasMapelId)
                    ->where('jenis_penilaian_id', $kategoriNilaiId)
                    ->get()
                    ->map(function ($penilaian) {
                        return [
                            'id' => $penilaian->id,
                            'siswa' => [
                                'id' => $penilaian->siswa->id,
                                'nama' => $penilaian->siswa->nama_lengkap
                            ],
                            'nilai' => $penilaian->nilai->nilai ?? null,
                            'tanggal_penilaian' => $penilaian->tanggal_penilaian
                        ];
                    });
            } else {
                // Jika belum ada penilaian, ambil data siswa
                $dataPenilaian = Siswa::where('kelas_id', $kelasId)
                    ->where('status', 1)
                    ->get()
                    ->map(function ($siswa) {
                        return [
                            'id' => null,
                            'siswa' => [
                                'id' => $siswa->id,
                                'nama' => $siswa->nama_lengkap
                            ],
                            'nilai' => null,
                            'tanggal_penilaian' => null
                        ];
                    });
            }
        }


        return Inertia::render('Admin/Guru/Penilaian/Index', [
            'kelas' => KelasResource::collection($kelas),
            'mapel' => MataPelajaranResource::collection($mapel),
            'jenisPenilaian' => JenisPenilaianResource::collection($jenisPenilaian),
            'dataPenilaian' => $dataPenilaian,
            'queryParams' => request()->query() ?: null,
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'kelas_id' => 'required|exists:kelas,id',
            'mata_pelajaran_id' => 'required|exists:mata_pelajarans,id',
            'jenis_penilaian_id' => 'required|exists:jenis_penilaians,id',
            'nilai_siswa' => 'required|array',
            'nilai_siswa.*.siswa_id' => 'required|exists:siswas,id',
            'nilai_siswa.*.nilai' => 'required|numeric|min:0|max:100',
            'tanggal_penilaian' => 'required|date',
        ]);

        // Get kelas_mata_pelajaran_id
        $kelasMapel = KelasMataPelajaran::where('kelas_id', $request->kelas_id)
        ->where('mata_pelajaran_id', $request->mata_pelajaran_id)
        ->where('guru_id', Auth::user()->id)
        ->firstOrFail();

        foreach ($request->nilai_siswa as $nilaiData) {
            // Create or update penilaian
            $penilaian = Penilaian::updateOrCreate(
                [
                    'siswa_id' => $nilaiData['siswa_id'],
                    'kelas_mata_pelajaran_id' => $kelasMapel->id,
                    'jenis_penilaian_id' => $request->jenis_penilaian_id,
                ],
                [
                    'tanggal_penilaian' => $request->tanggal_penilaian,
                ]
            );

            // Create or update nilai
            Nilai::updateOrCreate(
                ['penilaian_id' => $penilaian->id],
                ['nilai' => $nilaiData['nilai']]
            );
        }
    }
}
