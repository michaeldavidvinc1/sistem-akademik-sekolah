<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\LandingPageController;
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