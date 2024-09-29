<?php

use App\Http\Controllers\LandingPageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingPageController::class, 'index'])->name('home');
Route::get('/fasilitas', [LandingPageController::class, 'fasilitas'])->name('fasilitas');

require __DIR__.'/auth.php';
