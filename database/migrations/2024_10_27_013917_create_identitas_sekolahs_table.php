<?php

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
        Schema::create('identitas_sekolahs', function (Blueprint $table) {
            $table->id();
            $table->string('logo')->nullable();
            $table->string('nama_sekolah', 100)->unique();
            $table->string('npsn', 20)->unique();
            $table->string('nis', 20)->unique();
            $table->text('alamat');
            $table->string('kode_pos', 10);
            $table->string('website', 100)->nullable();
            $table->string('email', 100)->unique();
            $table->string('telepon', 20);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('identitas_sekolahs');
    }
};
