<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\Staff\FeatureAdminController;
use App\Http\Controllers\Staff\GuruController;
use App\Http\Controllers\Staff\JurusanController;
use App\Http\Controllers\Staff\KelasController;
use App\Http\Controllers\Staff\SiswaController;
use App\Http\Controllers\Staff\StaffController;
use App\Http\Controllers\Staff\TahunAjaranController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index'])->name('home');
Route::get('/fasilitas', [LandingPageController::class, 'fasilitas'])->name('fasilitas');

Route::get('/login', [AuthController::class, 'login_page'])->name('login');
Route::post('/login', [AuthController::class, 'login'])->name('login.store');


Route::get('/dashboard', function(){
    return Inertia::render('Admin/Dashboard');
})->name('dashboard.page')->middleware('auth');

Route::middleware('IsRole:staff')->prefix('staff')->group(function() {
    Route::resource('/guru-list', GuruController::class)->names([
        'index' => 'staff.guru.index',
        'create' => 'staff.guru.create',
        'store' => 'staff.guru.store',
        'show' => 'staff.guru.show',
        'edit' => 'staff.guru.edit',
        'update' => 'staff.guru.update',
        'destroy' => 'staff.guru.destroy',
    ]);
    Route::get("/guru/change-password/{id}", [GuruController::class, 'change_password'])->name('guru.change.password.page');
    Route::resource('/siswa-list', SiswaController::class)->names([
        'index' => 'staff.siswa.index',
        'create' => 'staff.siswa.create',
        'store' => 'staff.siswa.store',
        'show' => 'staff.siswa.show',
        'edit' => 'staff.siswa.edit',
        'update' => 'staff.siswa.update',
        'destroy' => 'staff.siswa.destroy',
    ]);
    Route::resource('/staff-list', StaffController::class)->names([
        'index' => 'staff.staff.index',
        'create' => 'staff.staff.create',
        'store' => 'staff.staff.store',
        'show' => 'staff.staff.show',
        'edit' => 'staff.staff.edit',
        'update' => 'staff.staff.update',
        'destroy' => 'staff.staff.destroy',
    ]);
    Route::resource('/kelas-list', KelasController::class)->names([
        'index' => 'staff.kelas.index',
        'create' => 'staff.kelas.create',
        'store' => 'staff.kelas.store',
        'show' => 'staff.kelas.show',
        'edit' => 'staff.kelas.edit',
        'update' => 'staff.kelas.update',
        'destroy' => 'staff.kelas.destroy',
    ]);
    Route::resource('/mapel-list', StaffController::class)->names([
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
    
});