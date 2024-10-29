<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Http\Resources\KelasResource;
use App\Models\Guru;
use App\Models\Kelas;
use App\Models\KelasMataPelajaran;
use App\Models\KepalaSekolah;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use PDF;

class CetakRaportController extends Controller
{
    public function index()
    {
        $kelasId = request('kelas_id');
        $namaLengkap = request('nama_lengkap');
        $userId = Guru::findOrFail(Auth::user()->id);

        // -- Get kelas id berdasarkan id guru --
        $kelasIds = KelasMataPelajaran::where('guru_id', $userId->id)->pluck('kelas_id');
        $kelas = Kelas::whereIn('id', $kelasIds)->get();

        // -- Query untuk mendapatkan data nilai berdasarkan filter --
        $siswaDenganNilai = null;

        if ($kelasId) {
            $query = Siswa::select([
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
                ->where('kelas_mata_pelajarans.kelas_id', $kelasId);

            // Add optional nama_lengkap filter
            if ($namaLengkap) {
                $query->where('siswas.nama_lengkap', 'LIKE', '%' . $namaLengkap . '%');
            }

            $data = $query->groupBy([
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

            $transformedData = collect($data)
                ->groupBy('siswa_id')
                ->map(function ($grades) {
                    $student = $grades->first();

                    // Initialize main student data
                    $studentData = [
                        'nama_lengkap' => $student->nama_lengkap,
                        'kelas' => $student->nama_kelas,
                        'siswa_id' => $student->siswa_id,
                    ];

                    // Initialize mata_pelajaran object
                    $mataPelajaran = [];

                    // Add individual subject grades to mata_pelajaran object
                    foreach ($grades as $grade) {
                        $subject = strtolower($grade->nama_mata_pelajaran);
                        $mataPelajaran[$subject] = $grade->nilai_akhir;
                    }

                    // Add mata_pelajaran object to student data
                    $studentData['mata_pelajaran'] = $mataPelajaran;

                    // Calculate and add average
                    $studentData['rata_rata'] = round($grades->avg('nilai_akhir'), 4);

                    return $studentData;
                })
                ->values();

            // Sort by average and add ranking
            $siswaDenganNilai = $transformedData
                ->sortByDesc('rata_rata')
                ->values()
                ->map(function ($student, $index) {
                    $student['ranking'] = $index + 1;
                    return $student;
                });
        }


        return Inertia::render('Admin/Guru/Raport/CetakRaport/Index', [
            'queryParams' => request()->query() ?: null,
            'kelas' => KelasResource::collection($kelas),
            'siswaDenganNilai' => $siswaDenganNilai
        ]);
    }

    public function cetak_raport($siswaId){
        $kepalaSekolah = KepalaSekolah::first();
        $pdf = PDF::loadView('print.raport', ['kepalaSekolah' => $kepalaSekolah]);
        return $pdf->download('raport.pdf');
    }
}
