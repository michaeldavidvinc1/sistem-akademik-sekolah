<?php

namespace Database\Seeders;

use App\Models\KepalaSekolah;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class KepalaSekolahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KepalaSekolah::create([
            'nama_lengkap' => 'Michael David',
            'nip' => Str::random(10),
            'jenis_kelamin' => 'Laki-laki',
            'tanggal_lahir' => '1990-05-15',
            'tempat_lahir' => 'Jakarta',
            'alamat' => 'Jl. Mawar No. 12, Jakarta',
            'telepon' => '081234567890',
            'email' => 'michael.david@example.com',
        ]);
    }
}
