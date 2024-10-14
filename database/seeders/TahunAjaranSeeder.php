<?php

namespace Database\Seeders;

use App\Models\TahunAjaran;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TahunAjaranSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TahunAjaran::create([
            'tahun_ajaran' => 'Semester 1 2024/2025',
            'tanggal_mulai' => Carbon::create(2024, 6, 1),
            'tanggal_selesai' => Carbon::create(2024, 12, 31),
        ]);

        TahunAjaran::create([
            'tahun_ajaran' => 'Semester 2 2024/2025',
            'tanggal_mulai' => Carbon::create(2025, 1, 1),
            'tanggal_selesai' => Carbon::create(2025, 5, 31),
        ]);
    }
}
