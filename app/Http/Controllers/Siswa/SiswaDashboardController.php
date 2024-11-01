<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SiswaDashboardController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Siswa/Dashboard');
    }
}
