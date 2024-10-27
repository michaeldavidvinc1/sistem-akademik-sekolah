<?php

namespace Database\Seeders;

use App\Models\IdentitasSekolah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IdentitasSekolahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        IdentitasSekolah::create([
            'nama_sekolah' => 'MTs Rekayasa',
            'npsn' => '69354090',
            'nis' => '12345678',
            'alamat' => 'Jl. Raya Indonesia, Banjar',
            'kode_pos' => '46385',
            'website' => 'http://www.mts-rekayasa.sch.id',
            'email' => 'mts-rekayasa@gmail.com',
            'telepon' => '0265270128',
        ]);
    }
}
