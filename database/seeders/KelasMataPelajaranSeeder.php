<?php

namespace Database\Seeders;

use App\Models\KelasMataPelajaran;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KelasMataPelajaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KelasMataPelajaran::create([
            'kelas_id' => 1,
            'mata_pelajaran_id' => 1,
            'guru_id' => 1,
        ]);
        KelasMataPelajaran::create([
            'kelas_id' => 1,
            'mata_pelajaran_id' => 2,
            'guru_id' => 1,
        ]);
        KelasMataPelajaran::create([
            'kelas_id' => 1,
            'mata_pelajaran_id' => 3,
            'guru_id' => 1,
        ]);
        KelasMataPelajaran::create([
            'kelas_id' => 1,
            'mata_pelajaran_id' => 4,
            'guru_id' => 1,
        ]);
    }
}
