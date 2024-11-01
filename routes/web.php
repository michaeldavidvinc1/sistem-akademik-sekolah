<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Guru\AbsensiController;
use App\Http\Controllers\Guru\CetakRaportController;
use App\Http\Controllers\Guru\DaftarSiswaController;
use App\Http\Controllers\Guru\GuruDashboardController;
use App\Http\Controllers\Guru\PenilaianController;
use App\Http\Controllers\Guru\RekapNilaiController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\Siswa\SiswaDashboardController;
use App\Http\Controllers\Siswa\SiswaKelasController;
use App\Http\Controllers\Siswa\SiswaPembayaranController;
use App\Http\Controllers\Staff\FeatureAdminController;
use App\Http\Controllers\Staff\GuruController;
use App\Http\Controllers\Staff\InformasiSekolahController;
use App\Http\Controllers\Staff\JenisPenilaianController;
use App\Http\Controllers\Staff\JurusanController;
use App\Http\Controllers\Staff\KelasController;
use App\Http\Controllers\Staff\KepalaSekolahController;
use App\Http\Controllers\Staff\MataPelajaranController;
use App\Http\Controllers\Staff\SiswaController;
use App\Http\Controllers\Staff\StaffController;
use App\Http\Controllers\Staff\StaffDashboardController;
use App\Http\Controllers\Staff\StaffPembayaranSppController;
use App\Http\Controllers\Staff\StaffPendaftaranSiswaController;
use App\Http\Controllers\Staff\StaffPenugasanGuruController;
use App\Http\Controllers\Staff\TahunAjaranController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index'])->name('home');
Route::get('/fasilitas', [LandingPageController::class, 'fasilitas'])->name('fasilitas');
Route::get('/pendaftaran-siswa-baru', [LandingPageController::class, 'pendaftaran'])->name('pendaftaran');
Route::post('/pendaftaran-siswa-baru', [LandingPageController::class, 'pendaftaran_store'])->name('pendaftaran.store');

Route::get('/login', [AuthController::class, 'login_page'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.store');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('IsRole:staff')->prefix('staff')->group(function () {
    Route::get('/dashboard', [StaffDashboardController::class, 'index'])->name('dashboard.staff');
    Route::resource('/guru-list', GuruController::class)->names([
        'index' => 'staff.guru.index',
        'create' => 'staff.guru.create',
        'store' => 'staff.guru.store',
        'show' => 'staff.guru.show',
        'edit' => 'staff.guru.edit',
        'update' => 'staff.guru.update',
        'destroy' => 'staff.guru.destroy',
    ]);
    Route::get('/change-status-guru/{id}', [GuruController::class, 'change_status'])->name('guru.change.status');
    Route::post("/guru/change-password/{id}", [GuruController::class, 'change_password'])->name('guru.change.password');

    Route::resource('/siswa-list', SiswaController::class)->names([
        'index' => 'staff.siswa.index',
        'create' => 'staff.siswa.create',
        'store' => 'staff.siswa.store',
        'show' => 'staff.siswa.show',
        'edit' => 'staff.siswa.edit',
        'update' => 'staff.siswa.update',
        'destroy' => 'staff.siswa.destroy',
    ]);
    Route::post("/siswa/change-password/{id}", [SiswaController::class, 'change_password'])->name('siswa.change.password');

    Route::resource('/staff-list', StaffController::class)->names([
        'index' => 'staff.staff.index',
        'create' => 'staff.staff.create',
        'store' => 'staff.staff.store',
        'show' => 'staff.staff.show',
        'edit' => 'staff.staff.edit',
        'update' => 'staff.staff.update',
        'destroy' => 'staff.staff.destroy',
    ]);
    Route::get('/change-status-staff/{id}', [StaffController::class, 'change_status'])->name('staff.change.status');
    Route::post("/staff/change-password/{id}", [StaffController::class, 'change_password'])->name('staff.change.password');

    Route::resource('/kelas-list', KelasController::class)->names([
        'index' => 'staff.kelas.index',
        'create' => 'staff.kelas.create',
        'store' => 'staff.kelas.store',
        'show' => 'staff.kelas.show',
        'edit' => 'staff.kelas.edit',
        'update' => 'staff.kelas.update',
        'destroy' => 'staff.kelas.destroy',
    ]);
    Route::resource('/mapel-list', MataPelajaranController::class)->names([
        'index' => 'staff.mapel.index',
        'create' => 'staff.mapel.create',
        'store' => 'staff.mapel.store',
        'show' => 'staff.mapel.show',
        'edit' => 'staff.mapel.edit',
        'update' => 'staff.mapel.update',
        'destroy' => 'staff.mapel.destroy',
    ]);
    Route::resource('/jurusan-list', JurusanController::class)->names([
        'index' => 'staff.jurusan.index',
        'create' => 'staff.jurusan.create',
        'store' => 'staff.jurusan.store',
        'show' => 'staff.jurusan.show',
        'edit' => 'staff.jurusan.edit',
        'update' => 'staff.jurusan.update',
        'destroy' => 'staff.jurusan.destroy',
    ]);
    Route::resource('/tahun-ajaran-list', TahunAjaranController::class)->names([
        'index' => 'staff.tahun-ajaran.index',
        'create' => 'staff.tahun-ajaran.create',
        'store' => 'staff.tahun-ajaran.store',
        'show' => 'staff.tahun-ajaran.show',
        'edit' => 'staff.tahun-ajaran.edit',
        'update' => 'staff.tahun-ajaran.update',
        'destroy' => 'staff.tahun-ajaran.destroy',
    ]);

    Route::resource('/penugasan-guru-list', StaffPenugasanGuruController::class)->names([
        'index' => 'staff.penugasan.index',
        'create' => 'staff.penugasan.create',
        'store' => 'staff.penugasan.store',
        'show' => 'staff.penugasan.show',
        'edit' => 'staff.penugasan.edit',
        'update' => 'staff.penugasan.update',
        'destroy' => 'staff.penugasan.destroy',
    ]);

    Route::resource('/jenis-penilaian', JenisPenilaianController::class)->names([
        'index' => 'staff.jenis-penilaian.index',
        'create' => 'staff.jenis-penilaian.create',
        'store' => 'staff.jenis-penilaian.store',
        'show' => 'staff.jenis-penilaian.show',
        'edit' => 'staff.jenis-penilaian.edit',
        'update' => 'staff.jenis-penilaian.update',
        'destroy' => 'staff.jenis-penilaian.destroy',
    ]);

    // Pendaftaran Siswa Baru Route
    Route::get('/pendaftaran-siswa-list', [StaffPendaftaranSiswaController::class, 'index'])->name('staff.pendaftaran.list');
    Route::get('/pendaftaran-siswa-list/{id}', [StaffPendaftaranSiswaController::class, 'edit'])->name('staff.pendaftaran.edit');
    Route::put('/pendaftaran-siswa-list/{id}', [StaffPendaftaranSiswaController::class, 'update'])->name('staff.pendaftaran.update');
    Route::delete('/pendaftaran-siswa-list/{id}', [StaffPendaftaranSiswaController::class, 'destroy'])->name('staff.pendaftaran.destroy');
    Route::get('/approve-pendaftaran-siswa/{id}', [StaffPendaftaranSiswaController::class, 'approved_pendaftaran'])->name('staff.pendaftaran.approved');
    Route::get('/decline-pendaftaran-siswa/{id}', [StaffPendaftaranSiswaController::class, 'decline_pendaftaran'])->name('staff.pendaftaran.decline');

    // Pembayaran SPP Siswa Route
    Route::get('/pembayaran-spp', [StaffPembayaranSppController::class, 'index'])->name('staff.pembayaran.list');
    
    // Informasi Sekolah Route
    Route::get('/informasi-sekolah', [InformasiSekolahController::class, 'index'])->name('staff.informasi.sekolah');
    Route::put('/informasi-sekolah', [InformasiSekolahController::class, 'update'])->name('staff.informasi.update');
    
    // Kepala Sekolah Route
    Route::get('/kepala-sekolah', [KepalaSekolahController::class, 'index'])->name('staff.kepala.sekolah');
    Route::put('/kepala-sekolah', [KepalaSekolahController::class, 'update'])->name('staff.kepala.update');

    
});

Route::middleware('IsRole:guru')->prefix('guru')->group(function() {
    Route::get('/dashboard', [GuruDashboardController::class, 'index'])->name('dashboard.guru');

    // Daftar Siswa Route
    Route::get('/daftar-siswa', [DaftarSiswaController::class, 'index'])->name('guru.daftar.siswa');

    // Absensi Route
    Route::get('/absensi', [AbsensiController::class, 'index'])->name('guru.absensi.form');
    Route::post('/absensi', [AbsensiController::class, 'store'])->name('guru.absensi.store');

    // Penilaian Route
    Route::get('/input-nilai', [PenilaianController::class, 'index'])->name('guru.penilaian.index');
    Route::post('/input-nilai', [PenilaianController::class, 'store'])->name('guru.penilaian.store');

    // Rekap Nilai Akhir Route
    Route::get("/rekap-nilai", [RekapNilaiController::class, 'index'])->name('guru.rekap.nilai');

    // Cetak Raport Siswa
    Route::get("/cetak-nilai", [CetakRaportController::class, 'index'])->name('guru.cetak.nilai');
    Route::get("/cetak-nilai/{siswaId}", [CetakRaportController::class, 'cetak_raport'])->name('guru.cetak.raport');

});

Route::middleware('IsRole:siswa')->prefix('siswa')->group(function(){
    Route::get('/dashboard', [SiswaDashboardController::class, 'index'])->name('dashboard.siswa');

    // Sekelas Route
    Route::get("/kelas", [SiswaKelasController::class, 'index'])->name('siswa.kelas.list');

    // Pembayaran Route
    Route::get('/pembayaran', [SiswaPembayaranController::class, 'index'])->name('siswa.pembayaran.list');
    Route::get('/pembayaran', [SiswaPembayaranController::class, 'index'])->name('siswa.pembayaran.list');
    Route::post('/pembayaran', [SiswaPembayaranController::class, 'store'])->name('siswa.pembayaran.store');
});
