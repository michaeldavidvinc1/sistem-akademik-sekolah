<?php

namespace Database\Seeders;

use App\Models\Siswa;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SiswaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $siswa = User::factory()->create([
            'name' => 'Siswa !',
            'email' => 'siswa1@gmail.com',
            'password' => bcrypt(12345),
            'role' => 'siswa',
        ]);

        Siswa::create([
            'user_id' => $siswa->id,
            'nama_lengkap' => $siswa->name,
            'tanggal_lahir' => Carbon::now(),
            'tempat_lahir' => 'Medan',
            'alamat' => "Pekanbaru",
            'telepon' => '0987186281',
            'tanggal_daftar' => Carbon::now(),
            'status' => 1,
            'jenis_kelamin' => 'l',
            'jurusan_id' => 1,
            'kelas_id' => 1
        ]);

        $siswa2 = User::factory()->create([
            'name' => 'Siswa 2',
            'email' => 'siswa2@gmail.com',
            'password' => bcrypt(12345),
            'role' => 'siswa',
        ]);

        Siswa::create([
            'user_id' => $siswa2->id,
            'nama_lengkap' => $siswa2->name,
            'tanggal_lahir' => Carbon::now(),
            'tempat_lahir' => 'Medan',
            'alamat' => "Pekanbaru",
            'telepon' => '0987186281',
            'tanggal_daftar' => Carbon::now(),
            'status' => 1,
            'jenis_kelamin' => 'l',
            'jurusan_id' => 1,
            'kelas_id' => 1
        ]);

        $siswa3 = User::factory()->create([
            'name' => 'Siswa 3',
            'email' => 'siswa3@gmail.com',
            'password' => bcrypt(12345),
            'role' => 'siswa',
        ]);

        Siswa::create([
            'user_id' => $siswa3->id,
            'nama_lengkap' => $siswa3->name,
            'tanggal_lahir' => Carbon::now(),
            'tempat_lahir' => 'Medan',
            'alamat' => "Pekanbaru",
            'telepon' => '0987186281',
            'tanggal_daftar' => Carbon::now(),
            'status' => 1,
            'jenis_kelamin' => 'l',
            'jurusan_id' => 1,
            'kelas_id' => 1
        ]);

        $siswa4 = User::factory()->create([
            'name' => 'Siswa 4',
            'email' => 'siswa4@gmail.com',
            'password' => bcrypt(12345),
            'role' => 'siswa',
        ]);

        Siswa::create([
            'user_id' => $siswa4->id,
            'nama_lengkap' => $siswa4->name,
            'tanggal_lahir' => Carbon::now(),
            'tempat_lahir' => 'Medan',
            'alamat' => "Pekanbaru",
            'telepon' => '0987186281',
            'tanggal_daftar' => Carbon::now(),
            'status' => 1,
            'jenis_kelamin' => 'l',
            'jurusan_id' => 1,
            'kelas_id' => 1
        ]);
    }
}
