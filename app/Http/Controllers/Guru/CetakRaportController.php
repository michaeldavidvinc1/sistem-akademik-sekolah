<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Http\Resources\IdentitasSekolahResource;
use App\Http\Resources\KelasResource;
use App\Http\Resources\SiswaResource;
use App\Models\Absensi;
use App\Models\Guru;
use App\Models\IdentitasSekolah;
use App\Models\Kelas;
use App\Models\KelasMataPelajaran;
use App\Models\KepalaSekolah;
use App\Models\Siswa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

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

    public function cetak_raport($siswaId)
    {
        try {
            // Get required data
            $identitasSekolah = IdentitasSekolah::first();
            $siswa = Siswa::with(['kelas', 'jurusan'])->findOrFail($siswaId);

            // Handle logo image
            $imagePath = storage_path('app/public/' . $identitasSekolah->logo);
            if (!file_exists($imagePath)) {
                throw new \Exception('Logo file not found');
            }
            $imageBase64 = 'data:image/png;base64,' . base64_encode(file_get_contents($imagePath));

            // Get nilai data
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
                ->where('siswas.id', $siswaId);

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

            // Transform nilai data
            $transformedData = collect($data)
                ->groupBy('siswa_id')
                ->map(function ($grades) {
                    $student = $grades->first();
                    return [
                        'nama_lengkap' => $student->nama_lengkap,
                        'kelas' => $student->nama_kelas,
                        'siswa_id' => $student->siswa_id,
                        'mata_pelajaran' => $grades->mapWithKeys(function ($grade) {
                            return [
                                strtolower($grade->nama_mata_pelajaran) => [
                                    'nilai' => $grade->detail_nilai,
                                    'kkm' => $grade->kkm,
                                    'rata_rata' => $grade->nilai_akhir
                                ]
                            ];
                        })->toArray(),
                        'rata_rata' => round($grades->avg('nilai_akhir'), 4)
                    ];
                })
                ->values();

            // Calculate rankings
            $siswaDenganNilai = $transformedData
                ->sortByDesc('rata_rata')
                ->values()
                ->map(function ($student, $index) {
                    $student['ranking'] = $index + 1;
                    return $student;
                });

            // Get attendance data
            $absensi = [
                'sakit' => Absensi::where('siswa_id', $siswaId)->where('status_kehadiran', 'sakit')->count(),
                'izin' => Absensi::where('siswa_id', $siswaId)->where('status_kehadiran', 'izin')->count(),
                'alpha' => Absensi::where('siswa_id', $siswaId)->where('status_kehadiran', 'alpha')->count()
            ];

            // Prepare view data
            $viewData = [
                'identitasSekolah' => new IdentitasSekolahResource($identitasSekolah),
                'siswa' => new SiswaResource($siswa),
                'image' => $imageBase64,
                'nilai' => $siswaDenganNilai,
                'sakit' => $absensi['sakit'],
                'izin' => $absensi['izin'],
                'alpha' => $absensi['alpha']
            ];

            // Generate PDF
            $pdf = PDF::loadView('print.raport', $viewData);
            $pdf->setPaper('A4', 'portrait');
            $pdf->setOption(['isRemoteEnabled' => true, 'isHtml5ParserEnabled' => true])->output();
        //     return response()->streamDownload(
        //         fn () => print($pdf),
        //        'raport-' . $siswa->nama_lengkap . '.pdf'
        //    );

            // Return PDF for download
            return $pdf->download('raport-' . $siswa->nama_lengkap . '.pdf')->header('Content-Type','application/pdf');
        } catch (\Exception $e) {
            // Log error for debugging

            // Return error response
            return response()->json([
                'message' => 'Gagal membuat PDF: ' . $e->getMessage()
            ], 500);
        }
    }
}
