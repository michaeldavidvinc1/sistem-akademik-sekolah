<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Http\Resources\JenisPenilaianResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\MataPelajaranResource;
use App\Http\Resources\NilaiResource;
use App\Models\Guru;
use App\Models\JenisPenilaian;
use App\Models\Kelas;
use App\Models\KelasMataPelajaran;
use App\Models\MataPelajaran;
use App\Models\Nilai;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RekapNilaiController extends Controller
{
    public function index()
    {
        $kelasId = request('kelas_id');
        $kategoriNilaiId = request('jenis_penilaian_id');
        $userId = Guru::findOrFail(Auth::user()->id);

        // -- Get kelas id berdasarkan id guru --
        $kelasIds = KelasMataPelajaran::where('guru_id', $userId->id)->pluck('kelas_id');
        $kelas = Kelas::whereIn('id', $kelasIds)->get();

        // -- Get jenis penilaian --
        $jenisPenilaian = JenisPenilaian::all();

        // -- Query untuk mendapatkan data nilai berdasarkan filter --
        $siswaDenganNilai = null;

        if ($kelasId && $kategoriNilaiId) {

            // Query utama
            $nilaiSiswa = Siswa::select([
                'siswas.nama_lengkap as nama_siswa',
                DB::raw('GROUP_CONCAT(
            CONCAT(
                \'"\', mata_pelajarans.nama_mata_pelajaran, \'": \',
                COALESCE(nilais.nilai, \'null\')
            )
        ) as nilai_mata_pelajaran')
            ])
                ->leftJoin('penilaians', 'siswas.id', '=', 'penilaians.siswa_id')
                ->leftJoin('kelas_mata_pelajarans', 'penilaians.kelas_mata_pelajaran_id', '=', 'kelas_mata_pelajarans.id')
                ->leftJoin('mata_pelajarans', 'kelas_mata_pelajarans.mata_pelajaran_id', '=', 'mata_pelajarans.id')
                ->leftJoin('nilais', 'penilaians.id', '=', 'nilais.penilaian_id')
                ->where('siswas.kelas_id', $kelasId)
                ->where('penilaians.jenis_penilaian_id', $kategoriNilaiId)
                ->groupBy('siswas.nama_lengkap')
                ->get();

                $siswaDenganNilai = $nilaiSiswa->map(function ($item) {
                    $nilaiArray = [];
                    $totalNilai = 0;
                    $jumlahMataPelajaran = 0;
                    $pairs = explode(',', $item->nilai_mata_pelajaran);
                
                    foreach ($pairs as $pair) {
                        if (preg_match('/\"(.+)\"\: (.+)/', $pair, $matches)) {
                            $mataPelajaran = $matches[1];
                            $nilai = $matches[2] === 'null' ? null : (float)$matches[2];
                            
                            if ($nilai !== null) {
                                $totalNilai += $nilai;
                                $jumlahMataPelajaran++;
                            }
                            
                            $nilaiArray[$mataPelajaran] = $nilai;
                        }
                    }
                
                    // Hitung rata-rata nilai (cek jika ada mata pelajaran yang memiliki nilai)
                    $rataRataNilai = $jumlahMataPelajaran > 0 ? $totalNilai / $jumlahMataPelajaran : null;
                
                    return [
                        'nama_siswa' => $item->nama_siswa,
                        'nilai' => $nilaiArray,
                        'rata_rata' => $rataRataNilai // tambahkan rata-rata ke hasil
                    ];
                });
                
                // Sort berdasarkan nilai rata-rata tertinggi
                $siswaDenganNilai = $siswaDenganNilai->sortByDesc('rata_rata')->values();
                
                // Tambahkan ranking berdasarkan urutan rata-rata nilai
                $siswaDenganNilai = $siswaDenganNilai->map(function ($item, $index) {
                    return [
                        'ranking' => $index + 1, // Ranking dimulai dari 1
                        'nama_siswa' => $item['nama_siswa'],
                        'nilai' => $item['nilai'],
                        'rata_rata' => $item['rata_rata']
                    ];
                });
        }


        return Inertia::render('Admin/Guru/Raport/RekapNilai/Index', [
            'kelas' => KelasResource::collection($kelas),
            'jenisPenilaian' => JenisPenilaianResource::collection($jenisPenilaian),
            'nilaiSiswa' => $siswaDenganNilai,
            'queryParams' => request()->query() ?: null,
        ]);
    }
}
