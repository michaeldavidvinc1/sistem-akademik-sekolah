<?php

namespace Database\Seeders;

use App\Models\MataPelajaran;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MataPelajaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        MataPelajaran::create([
            'kode_mata_pelajaran' => 'MTK',
            'nama_mata_pelajaran' => 'Matematika',
            'jurusan_id' => 1
        ]);
        MataPelajaran::create([
            'kode_mata_pelajaran' => 'B.INDONESIA',
            'nama_mata_pelajaran' => 'Bahasa Indonesia',
            'jurusan_id' => 1
        ]);
        MataPelajaran::create([
            'kode_mata_pelajaran' => 'B.INGGRIS',
            'nama_mata_pelajaran' => 'Bahasa Inggris',
            'jurusan_id' => 1
        ]);
        MataPelajaran::create([
            'kode_mata_pelajaran' => 'SEJARAH',
            'nama_mata_pelajaran' => 'Sejarah',
            'jurusan_id' => 1
        ]);
    }
}
