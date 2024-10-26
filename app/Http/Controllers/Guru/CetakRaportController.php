<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Http\Resources\KelasResource;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasMataPelajaran;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CetakRaportController extends Controller
{
    public function index()
    {
        $kelasId = request('kelas_id');
        $userId = Guru::findOrFail(Auth::user()->id);

        // -- Get kelas id berdasarkan id guru --
        $kelasIds = KelasMataPelajaran::where('guru_id', $userId->id)->pluck('kelas_id');
        $kelas = Kelas::whereIn('id', $kelasIds)->get();

        // -- Query untuk mendapatkan data nilai berdasarkan filter --
        $siswaDenganNilai = null;

        if ($kelasId) {
            $data = Siswa::select([
                'siswas.id as siswa_id',
                'siswas.nama_lengkap',
                'kelas.nama_kelas',
                'jurusans.nama_jurusan',
                'mata_pelajarans.nama_mata_pelajaran',
                'mata_pelajarans.kkm',
                DB::raw('COUNT(DISTINCT penilaians.jenis_penilaian_id) as jumlah_penilaian'),
                DB::raw('GROUP_CONCAT(CONCAT(jenis_penilaians.kode_jenis_penilaian, ": ", nilais.nilai) ORDER BY penilaians.tanggal_penilaian) as detail_nilai'),
                DB::raw('ROUND(AVG(nilais.nilai), 2) as nilai_akhir')
            ])
            ->join('kelas', 'siswas.kelas_id', '=', 'kelas.id')
            ->join('jurusans', 'siswas.jurusan_id', '=', 'jurusans.id')
            ->join('penilaians', 'siswas.id', '=', 'penilaians.siswa_id')
            ->join('nilais', 'penilaians.id', '=', 'nilais.penilaian_id')
            ->join('kelas_mata_pelajarans', 'penilaians.kelas_mata_pelajaran_id', '=', 'kelas_mata_pelajarans.id')
            ->join('mata_pelajarans', 'kelas_mata_pelajarans.mata_pelajaran_id', '=', 'mata_pelajarans.id')
            ->join('jenis_penilaians', 'penilaians.jenis_penilaian_id', '=', 'jenis_penilaians.id')
            ->where('kelas_mata_pelajarans.kelas_id', $kelasId)
            ->groupBy([
                'siswas.id',
                'siswas.nama_lengkap',
                'kelas.nama_kelas',
                'jurusans.nama_jurusan',
                'mata_pelajarans.id',
                'mata_pelajarans.nama_mata_pelajaran',
                'mata_pelajarans.kkm'
            ])
            ->orderBy('siswas.nama_lengkap')
            ->orderBy('mata_pelajarans.nama_mata_pelajaran')
            ->get();
            
            $siswaDenganNilai = collect($data)->groupBy('siswa_id')->map(function($nilai) {
                $siswa = $nilai->first();
                return [
                    'nama_lengkap' => $siswa->nama_lengkap,
                    'kelas' => $siswa->nama_kelas,
                    'jurusan' => $siswa->nama_jurusan,
                    'mata_pelajaran' => $nilai->map(function($n) {
                        return [
                            'nama_mata_pelajaran' => $n->nama_mata_pelajaran,
                            'kkm' => $n->kkm,
                            'jumlah_penilaian' => $n->jumlah_penilaian,
                            'nilai_akhir' => $n->nilai_akhir,
                            'detail_nilai' => $n->detail_nilai,
                            'status_ketuntasan' => ($n->nilai_akhir >= $n->kkm ? 'Tuntas' : 'Belum Tuntas')
                        ];
                    })
                ];
            });
            
            return $siswaDenganNilai;

        }


        return Inertia::render('Admin/Guru/Raport/CetakRaport/Index', [
            'queryParams' => request()->query() ?: null,
            'kelas' => KelasResource::collection($kelas),
        ]);
    }
}
