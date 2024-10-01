<?php

use App\Models\Guru;
use App\Models\Kelas;
use App\Models\MataPelajaran;
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
        Schema::create('kelas_mata_pelajarans', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Kelas::class, 'kelas_id');
            $table->foreignIdFor(MataPelajaran::class, 'mata_pelajaran_id');
            $table->foreignIdFor(Guru::class, 'guru_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kelas_mata_pelajarans');
    }
};
