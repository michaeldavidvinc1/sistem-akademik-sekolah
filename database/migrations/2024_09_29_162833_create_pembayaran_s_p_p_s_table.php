<?php

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
        Schema::create('pembayaran_s_p_p_s', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Siswa::class, 'siswa_id');
            $table->date('tanggal_pembayaran');
            $table->integer('jumlah');
            $table->string('bukti_bayar');
            $table->string('deskripsi');
            $table->enum('status_pembayaran', array('lunas', 'belum lunas'));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pembayaran_s_p_p_s');
    }
};
