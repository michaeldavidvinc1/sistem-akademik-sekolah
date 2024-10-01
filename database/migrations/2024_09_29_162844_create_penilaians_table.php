<?php

use App\Models\Guru;
use App\Models\MataPelajaran;
use App\Models\Siswa;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('penilaians', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Siswa::class, 'siswa_id');
            $table->foreignIdFor(MataPelajaran::class, 'kelas_mata_pelajaran_id');
            $table->foreignIdFor(Guru::class, 'guru_id');
            $table->string('jenis_penilaian');
            $table->date('tanggal_penilaian');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penilaians');
    }
};
