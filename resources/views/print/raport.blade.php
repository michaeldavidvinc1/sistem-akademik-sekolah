<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laporan Hasil Belajar Siswa - MTs Rekayasa</title>
    <style>
        @page {
            size: A3;
            margin: 0;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.4;
            margin: 0;
            padding: 0;
            background-color: #fff;
            color: #333;
        }

        .container {
            width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            background: white;
            padding: 20mm;
            box-sizing: border-box;
            position: relative;
        }

        .header {
            text-align: center;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #dee2e6;
        }

        .logo {
            width: 60px;
            height: 60px;
            margin-bottom: 8px;
        }

        .school-title {
            font-size: 20px;
            font-weight: bold;
            color: #2c3e50;
            margin-bottom: 5px;
        }

        .school-info {
            font-size: 11px;
            color: #6c757d;
            margin-bottom: 2px;
            line-height: 1.3;
        }

        .report-title {
            font-size: 16px;
            font-weight: bold;
            color: #2c3e50;
            margin: 15px 0;
            text-align: center;
            padding: 6px;
            background: #f8f9fa;
        }

        .student-info {
            width: 100%;
            margin-bottom: 15px;
        }

        .student-info td {
            padding: 6px 10px;
            border: 1px solid #dee2e6;
            font-size: 12px;
        }

        .student-info td:first-child {
            width: 150px;
            background-color: #f8f9fa;
            font-weight: 600;
        }

        .grades-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 15px;
        }

        .grades-table th, .grades-table td {
            border: 1px solid #dee2e6;
            padding: 8px 6px;
            text-align: center;
            font-size: 12px;
        }

        .grades-table th {
            background-color: #f8f9fa;
            font-weight: 600;
            color: #333;
        }

        .attendance-section {
            margin: 15px 0;
        }

        .attendance-section h3 {
            color: #2c3e50;
            margin: 10px 0;
            font-size: 14px;
            border-bottom: 1px solid #dee2e6;
            padding-bottom: 5px;
        }

        .attendance-info td {
            padding: 4px 10px;
            font-size: 12px;
        }

        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            position: absolute;
            bottom: 40px;
            left: 20mm;
            right: 20mm;
        }

        .signature-box {
            text-align: center;
            width: 180px;
        }

        .signature-box p {
            font-size: 12px;
            margin: 5px 0;
        }

        .signature-line {
            border-bottom: 1px solid #000;
            margin-top: 40px;
            margin-bottom: 5px;
        }

        @media print {
            body {
                margin: 0;
                padding: 0;
            }
            
            .container {
                width: 210mm;
                min-height: 297mm;
                padding: 20mm;
                margin: 0 auto;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="/api/placeholder/60/60" alt="Logo Sekolah" class="logo">
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
                    <th rowspan="2" style="width: 200px;">Mata Pelajaran</th>
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

        <div class="signature-section">
            <div class="signature-box">
                <p>Orang Tua/Wali</p>
                <div class="signature-line"></div>
                <p>(_________________)</p>
            </div>
            <div class="signature-box">
                <p>Banjar, 15 Desember 2023</p>
                <p>Wali Kelas</p>
                <div class="signature-line"></div>
                <p>(_________________)</p>
                <p>NIP.</p>
            </div>
        </div>
    </div>
</body>
</html>