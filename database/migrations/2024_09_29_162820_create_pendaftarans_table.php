<?php

use App\Models\Jurusan;
use App\Models\Siswa;
use App\Models\TahunAjaran;
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
        Schema::create('pendaftarans', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->foreignIdFor(Siswa::class, 'siswa_id');
            $table->foreignIdFor(Jurusan::class, 'jurusan_id');
            $table->date('tanggal_pendaftaran');
            $table->enum('status', array('approved', 'decline', 'waiting'))->default('waiting');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pendaftarans');
    }
};
