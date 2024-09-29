<?php

namespace Database\Seeders;

use App\Models\Guru;
use App\Models\Siswa;
use App\Models\Staff;
use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $guru = User::factory()->create([
            'name' => 'Guru',
            'email' => 'guru@gmail.com',
            'password' => bcrypt(12345),
            'role' => 'guru',
        ]);

        Guru::create([
            'user_id' => $guru->id,
            'jurusan_id' => 1,
            'nama_lengkap' => $guru->name,
            'bidang_studi' => 'MTK',
            'alamat' => 'Pekanbaru',
            'telepon' => '0826272922',
            'tanggal_join' => Carbon::now(),
            'status' => 1
        ]);

        $staff = User::factory()->create([
            'name' => 'Staff',
            'email' => 'staff@gmail.com',
            'password' => bcrypt(12345),
            'role' => 'staff',
        ]);

        Staff::create([
            'user_id' => $staff->id,
            'nama_lengkap' => $staff->name,
            'tanggal_join' => Carbon::now(),
            'status' => 1
        ]);

        $siswa = User::factory()->create([
            'name' => 'Siswa',
            'email' => 'siswa@gmail.com',
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
    }
}
