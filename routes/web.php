<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\Staff\GuruController;
use App\Http\Controllers\Staff\SiswaController;
use App\Http\Controllers\Staff\StaffController;
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
});