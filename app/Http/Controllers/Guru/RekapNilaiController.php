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
            // Dapatkan semua mata pelajaran untuk kelas tersebut
            $mataPelajarans = MataPelajaran::select('nama_mata_pelajaran')
                ->join('kelas_mata_pelajarans', 'mata_pelajarans.id', '=', 'kelas_mata_pelajarans.mata_pelajaran_id')
                ->where('kelas_mata_pelajarans.kelas_id', $kelasId)
                ->distinct()
                ->get();

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

            // Transform hasil ke format yang diinginkan
            $siswaDenganNilai = $nilaiSiswa->map(function ($item) {
                $nilaiArray = [];
                $pairs = explode(',', $item->nilai_mata_pelajaran);

                foreach ($pairs as $pair) {
                    if (preg_match('/\"(.+)\"\: (.+)/', $pair, $matches)) {
                        $mataPelajaran = $matches[1];
                        $nilai = $matches[2] === 'null' ? null : (float)$matches[2];
                        $nilaiArray[$mataPelajaran] = $nilai;
                    }
                }

                return [
                    'nama_siswa' => $item->nama_siswa,
                    'nilai' => $nilaiArray
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
