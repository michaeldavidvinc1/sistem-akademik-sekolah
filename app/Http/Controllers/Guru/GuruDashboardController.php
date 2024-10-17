<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GuruDashboardController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Guru/Dashboard');
    }
}
