<?php

namespace Database\Seeders;

use App\Models\Kelas;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Kelas::create([
            'nama_kelas' => 'X TKJ 1',
            'kapasitas' => 32,
            'tahun_ajaran_id' => 1,
            'jurusan_id' => 1,
        ]);

        Kelas::create([
            'nama_kelas' => 'X TKJ 2',
            'kapasitas' => 32,
            'tahun_ajaran_id' => 1,
            'jurusan_id' => 1,
        ]);
    }
}
