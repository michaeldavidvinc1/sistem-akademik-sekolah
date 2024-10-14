<?php

namespace Database\Seeders;

use App\Models\Jurusan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JurusanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Jurusan::create([
            'kode_jurusan' => 'TKJ',
            'nama_jurusan' => 'Teknik Komputer Jaringan',
            'deskripsi' => 'Teknik Komputer Jaringan',
        ]);

        Jurusan::create([
            'kode_jurusan' => 'AK',
            'nama_jurusan' => 'Akuntansi',
            'deskripsi' => 'Akuntansi',
        ]);
        Jurusan::create([
            'kode_jurusan' => 'ADM',
            'nama_jurusan' => 'Administrasi Perkantoran',
            'deskripsi' => 'Administrasi Perkantoran',
        ]);
        Jurusan::create([
            'kode_jurusan' => 'TKR',
            'nama_jurusan' => 'Teknik Kendaraan Ringan',
            'deskripsi' => 'Teknik Kendaraan Ringan',
        ]);
    }
}
