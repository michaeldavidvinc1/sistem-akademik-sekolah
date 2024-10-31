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
            min-height: 594mm;
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
            /* Logo lebih besar */
            height: 150px;
            margin-bottom: 20px;
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
            <img src="/api/placeholder/150/150" alt="Logo Sekolah" class="logo">
            <div class="school-title">MTs Rekayasa</div>
            <div class="school-info">NPSN: 69354090 | NSS: 12345678</div>
            <div class="school-info">Jl. Raya Indonesia, Banjar</div>
            <div class="school-info">Telepon: | Kode Pos: 46385</div>
            <div class="school-info">Email: mts-rekayasa@gmail.com</div>
        </div>

        <h1 class="report-title">LAPORAN HASIL BELAJAR SISWA</h1>

        <table class="student-info">
            <tr>
                <td>Nama Peserta Didik</td>
                <td>: ELFAN SAPUTRA</td>
            </tr>
            <tr>
                <td>NISN/NIS</td>
                <td>: 3035423424 / 024342412</td>
            </tr>
            <tr>
                <td>Kelas/Semester</td>
                <td>: VII / Ganjil</td>
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
                    <th rowspan="2">Rata-rata</th>
                    <th rowspan="2">Predikat</th>
                </tr>
                <tr>
                    <th>Pengetahuan</th>
                    <th>Keterampilan</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td style="text-align: left">Pendidikan Agama Islam</td>
                    <td>85</td>
                    <td>88</td>
                    <td>86.5</td>
                    <td>A</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td style="text-align: left">Bahasa Indonesia</td>
                    <td>82</td>
                    <td>85</td>
                    <td>83.5</td>
                    <td>B</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td style="text-align: left">Matematika</td>
                    <td>78</td>
                    <td>80</td>
                    <td>79</td>
                    <td>B</td>
                </tr>
            </tbody>
        </table>

        <div class="attendance-section">
            <h3>Ketidakhadiran</h3>
            <table class="student-info attendance-info">
                <tr>
                    <td>Sakit</td>
                    <td>: 2 hari</td>
                </tr>
                <tr>
                    <td>Izin</td>
                    <td>: 1 hari</td>
                </tr>
                <tr>
                    <td>Tanpa Keterangan</td>
                    <td>: 0 hari</td>
                </tr>
            </table>
        </div>
    </div>
</body>

</html>
