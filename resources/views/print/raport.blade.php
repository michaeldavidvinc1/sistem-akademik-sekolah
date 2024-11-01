<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Hasil Belajar Siswa - MTs Rekayasa</title>
    <style>
        @page {
            size: A2;
            /* Mengubah ukuran ke A2 (420mm x 594mm) */
            margin: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #fff;
            color: #333;
        }

        .container {
            /* min-height: 594mm; */
            /* Tinggi A2 */
            margin: 0 auto;
            background: white;
            padding: 40mm;
            /* Padding lebih besar untuk A2 */
            box-sizing: border-box;
            /* position: relative; */
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #dee2e6;
        }

        .logo {
            width: 150px;
            height: 150px;
            margin-bottom: 20px;
            border-radius: 50%;
        }

        .school-title {
            font-size: 48px;
            /* Font lebih besar */
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 15px;
        }

        .school-info {
            font-size: 24px;
            /* Font lebih besar */
            color: #6c757d;
            margin-bottom: 5px;
            line-height: 1.4;
        }

        .report-title {
            font-size: 36px;
            /* Font lebih besar */
            font-weight: bold;
            color: #2c3e50;
            margin: 40px 0;
            text-align: center;
            padding: 15px;
            background: #f8f9fa;
        }

        .student-info {
            width: 100%;
            margin-bottom: 40px;
        }

        .student-info td {
            padding: 15px 25px;
            border: 2px solid #dee2e6;
            font-size: 24px;
            /* Font lebih besar */
        }

        .student-info td:first-child {
            width: 300px;
            /* Kolom lebih lebar */
            background-color: #f8f9fa;
            font-weight: 600;
        }

        .grades-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 40px;
        }

        .grades-table th,
        .grades-table td {
            border: 2px solid #dee2e6;
            padding: 20px 15px;
            text-align: center;
            font-size: 24px;
            /* Font lebih besar */
        }

        .grades-table th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: #333;
        }

        .grades-table td[style*="text-align: left"] {
            padding-left: 25px;
        }

        .attendance-section {
            margin: 40px 0;
        }

        .attendance-section h3 {
            color: #2c3e50;
            margin: 20px 0;
            font-size: 30px;
            /* Font lebih besar */
            border-bottom: 2px solid #dee2e6;
            padding-bottom: 10px;
        }

        .attendance-info td {
            padding: 15px 25px;
            font-size: 24px;
            /* Font lebih besar */
        }

        .page-break {
            page-break-after: always;
        }


        /* @media print {
            body {
                margin: 0;
                padding: 0;
            }
            
            .container {
                min-height: 594mm;
                padding: 40mm;
                margin: 0 auto;
            }
        } */
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="{{ $image }}" alt="Logo Sekolah" class="logo">
            <div class="school-title">{{ $identitasSekolah->nama_sekolah }}</div>
            <div class="school-info">NPSN: {{ $identitasSekolah->npsn }} | NIS: {{ $identitasSekolah->nis }}</div>
            <div class="school-info">{{ $identitasSekolah->alamat }}</div>
            <div class="school-info">Telepon: {{ $identitasSekolah->telepon }} | Kode Pos:
                {{ $identitasSekolah->kode_pos }}</div>
            <div class="school-info">Email: {{ $identitasSekolah->email }}</div>
        </div>

        <h1 class="report-title">LAPORAN HASIL BELAJAR SISWA</h1>

        <table class="student-info">
            <tr>
                <td>Nama Peserta Didik</td>
                <td>: {{ $siswa->nama_lengkap }}</td>
            </tr>
            <tr>
                <td>NISN/NIS</td>
                <td>: 3035423424 / 024342412</td>
            </tr>
            <tr>
                <td>Kelas/Jurusan</td>
                <td>: {{ $siswa->kelas->nama_kelas }} / {{ $siswa->jurusan->nama_jurusan }}</td>
            </tr>
            <tr>
                <td>Tahun Pelajaran</td>
                <td>: 2023/2024</td>
            </tr>
        </table>
        <table class="grades-table">
            <thead>
                <tr>
                    <th rowspan="2">No</th>
                    <th rowspan="2" style="width: 400px;">Mata Pelajaran</th>
                    <th colspan="2">Nilai</th>
                    <th rowspan="2">Predikat</th>
                    <th rowspan="2">LULUS</th>
                </tr>
                <tr>
                    <th>KKM</th>
                    <th>Nilai Akhir</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($nilai[0]['mata_pelajaran'] as $subject => $item)
                    <tr>
                        <td>{{ $loop->iteration }}</td>
                        <td style="text-align: left">{{ ucwords(str_replace('_', ' ', $subject)) }}</td>
                        <td>{{ $item['kkm'] }}</td>
                        <td>{{ $item['rata_rata'] }}</td>
                        <td>
                            @php
                                $average = $item['rata_rata'];
                                $grade = '';
                                if ($average >= 85) {
                                    $grade = 'A';
                                } elseif ($average >= 70) {
                                    $grade = 'B';
                                } elseif ($average >= 60) {
                                    $grade = 'C';
                                } else {
                                    $grade = 'D';
                                }
                            @endphp
                            {{ $grade }}
                        </td>
                        <td>
                            @if ($item['rata_rata'] >= $item['kkm'])
                                Lulus
                            @else
                                Tidak Lulus
                            @endif
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>

        <div class="attendance-section">
            <h3>Ketidakhadiran</h3>
            <table class="student-info attendance-info">
                <tr>
                    <td>Sakit</td>
                    <td>: {{ $sakit }} hari</td>
                </tr>
                <tr>
                    <td>Izin</td>
                    <td>: {{ $izin }} hari</td>
                </tr>
                <tr>
                    <td>Tanpa Keterangan</td>
                    <td>: {{ $alpha }} hari</td>
                </tr>
            </table>
        </div>
    </div>
    {{-- <div class="page-break"></div> --}}
</body>

</html>
